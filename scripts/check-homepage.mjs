import { chromium, firefox, webkit } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

const url = process.env.AUDIT_URL || "http://127.0.0.1:4321";
const out = "docs/homepage-remediation";
const axePath =
  process.env.AUDIT_AXE_PATH || "/tmp/jonang-homepage-audit-tools/node_modules/axe-core/axe.min.js";
await fs.mkdir(`${out}/screenshots`, { recursive: true });
const results = { date: new Date().toISOString(), url, cases: [], interactions: [] };
for (const [name, engine] of Object.entries({ chromium, firefox, webkit }).filter(
  ([name]) => !process.env.AUDIT_BROWSER || name === process.env.AUDIT_BROWSER
)) {
  const browser = await engine.launch({ headless: true });
  try {
    for (const width of process.env.AUDIT_INTERACTIONS_ONLY
      ? []
      : [320, 375, 768, 1024, 1280, 1440]) {
      for (const theme of ["light", "dark"]) {
        const context = await browser.newContext({
          viewport: { width, height: 1000 },
          colorScheme: theme,
        });
        await context.route("**/.netlify/functions/telemetry", (route) =>
          route.fulfill({ status: 204 })
        );
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        const response = await page.goto(url);
        assert.equal(response.status(), 200);
        await page.locator("#welcome-heading").waitFor();
        await page.evaluate(() => document.fonts.ready);
        for (let y = 0; y < (await page.evaluate(() => document.body.scrollHeight)); y += 700) {
          await page.evaluate((y) => window.scrollTo(0, y), y);
          await page.waitForTimeout(60);
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.addScriptTag({ path: axePath });
        const axe = await page.evaluate(async () =>
          window.axe.run(document, {
            runOnly: {
              type: "tag",
              values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"],
            },
          })
        );
        const geometry = await page.evaluate(() => ({
          width: innerWidth,
          height: document.body.scrollHeight,
          overflow: document.documentElement.scrollWidth > innerWidth,
          mainContainsH1: !!document.querySelector("main h1"),
          headerClipped: [
            ...document.querySelectorAll(
              "#site-header a, #site-header button, #site-header summary"
            ),
          ]
            .filter((el) => el.getClientRects().length && !el.closest("dialog"))
            .some((el) => {
              const r = el.getBoundingClientRect();
              return r.left < 0 || r.right > innerWidth;
            }),
        }));
        const violations = axe.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
        }));
        const result = {
          browser: name,
          version: browser.version(),
          width,
          theme,
          ...geometry,
          errors,
          violations,
        };
        results.cases.push(result);
        await fs.writeFile(
          `${out}/${name}-${width}-${theme}.json`,
          JSON.stringify(result, null, 2)
        );
        if ([375, 1440].includes(width))
          await page.screenshot({
            path: `${out}/screenshots/${name}-${width}-${theme}.png`,
            fullPage: true,
          });
        assert.equal(geometry.overflow, false, `${name} ${width} overflow`);
        assert.equal(geometry.headerClipped, false, `${name} ${width} clipped header`);
        assert.equal(geometry.mainContainsH1, true);
        assert.deepEqual(errors, []);
        assert.deepEqual(violations, [], `${name} ${width} ${theme}: axe violations`);
        await context.close();
      }
    }
    const context = await browser.newContext({ viewport: { width: 375, height: 900 } });
    await context.route("**/.netlify/functions/telemetry", (route) =>
      route.fulfill({ status: 204 })
    );
    const page = await context.newPage();
    await page.goto(url);
    await page.evaluate(() => document.fonts.ready);
    const font = await page.evaluate(() => {
      const probe = document.createElement("span");
      probe.textContent = "Jonang Takten Phuntsok Choeling";
      probe.style.cssText =
        'position:absolute;white-space:nowrap;font:500 32px "Cormorant Garamond"';
      document.body.append(probe);
      const cormorant = probe.getBoundingClientRect().width;
      probe.style.fontFamily = "Georgia";
      const georgia = probe.getBoundingClientRect().width;
      probe.remove();
      return { loaded: document.fonts.check('500 32px "Cormorant Garamond"'), cormorant, georgia };
    });
    assert.equal(font.loaded, true);
    assert.notEqual(font.cormorant, font.georgia);
    if (name === "chromium") {
      const links = [
        ...new Set(
          await page
            .locator('a[href^="/"]')
            .evaluateAll((els) => els.map((el) => el.getAttribute("href")))
        ),
      ];
      const statuses = [];
      for (const href of links) {
        const response = await context.request.get(`${url}${href}`);
        assert.equal(response.status(), 200, href);
        statuses.push({ href, status: response.status() });
      }
      await fs.writeFile(`${out}/local-links.json`, JSON.stringify(statuses, null, 2));
    }
    const opener = page.locator("#menuToggle");
    const panel = page.locator("#mobileMenuPanel");
    await opener.focus();
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(() => !!document.activeElement.closest("dialog")), false);
    await opener.focus();
    await page.keyboard.press("Enter");
    assert.equal(await panel.evaluate((el) => el.open), true);
    assert.equal(await page.evaluate(() => document.activeElement.id), "menuClose");
    await page.addScriptTag({ path: axePath });
    assert.deepEqual(
      await page.evaluate(async () => (await window.axe.run(document)).violations.map((v) => v.id)),
      [],
      `${name}: open menu axe`
    );
    await page.keyboard.press("Shift+Tab");
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute("href")), "/donate");
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(() => document.activeElement.id), "menuClose");
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press("Tab");
      assert.equal(await page.evaluate(() => !!document.activeElement.closest("dialog")), true);
    }
    await page.keyboard.press("Escape");
    assert.equal(await panel.evaluate((el) => el.open), false);
    assert.equal(await page.evaluate(() => document.activeElement.id), "menuToggle");
    await opener.click();
    await page.mouse.click(2, 2);
    await page.waitForTimeout(100);
    assert.equal(await panel.evaluate((el) => el.open), false);
    await page.locator("#themeToggleMobile").click();
    await page.reload();
    assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), "dark");
    await page.locator('.home-hero-actions a[href="/introduction"]').click();
    await page.waitForURL("**/introduction");
    await page.locator("#menuToggle").click();
    await page.locator('dialog a[href="/#contact"]').click();
    await page.waitForURL("**/#contact");
    assert.equal(
      await page.evaluate(() => document.body.classList.contains("stop-scrolling")),
      false
    );
    await page.locator(".home-support a").click();
    await page.waitForURL("**/donate");
    await page.goto(`${url}/introduction`);
    const trigger = page.locator("[data-glossary-term]").first();
    assert.ok(await trigger.count(), "introduction has glossary trigger");
    await trigger.focus();
    assert.equal(await page.locator("#glossary-popover-card").count(), 0);
    await page.keyboard.press("Enter");
    assert.equal(
      await page.evaluate(() => document.activeElement.hasAttribute("data-popover-close")),
      true
    );
    await page.addScriptTag({ path: axePath });
    assert.deepEqual(
      await page.evaluate(async () =>
        (await window.axe.run(document.querySelector("#glossary-popover-card"))).violations.map(
          (v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) })
        )
      ),
      [],
      `${name}: glossary axe`
    );
    await page.keyboard.press("Tab");
    assert.equal(
      await page.evaluate(() => document.activeElement.hasAttribute("data-popover-link")),
      true
    );
    await page.keyboard.press("Escape");
    assert.equal(await trigger.evaluate((el) => document.activeElement === el), true);
    assert.equal(await page.locator("#glossary-popover-card").evaluate((el) => el.hidden), true);
    await context.close();
    const nojs = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 375, height: 900 },
    });
    const nojsPage = await nojs.newPage();
    await nojsPage.goto(url);
    await nojsPage.locator(".fallback-navigation summary").click();
    await nojsPage.locator('.fallback-navigation a[href="/introduction"]').first().click();
    await nojsPage.waitForURL("**/introduction");
    await nojs.close();
    results.interactions.push({
      browser: name,
      font,
      closedMenu: "pass",
      focusCycle: "pass",
      escape: "pass",
      backdrop: "pass",
      themePersistence: "pass",
      clientNavigation: "pass",
      supportJourney: "pass",
      glossaryKeyboard: "pass",
      noJsNavigation: "pass",
    });
  } finally {
    await browser.close();
    await fs.writeFile(
      `${out}/${process.env.AUDIT_INTERACTIONS_ONLY ? "interactions-final" : "summary"}.json`,
      JSON.stringify(results, null, 2)
    );
  }
}
console.log(
  `Passed ${results.cases.length} responsive/theme cases and keyboard/journey checks in all three browsers.`
);
