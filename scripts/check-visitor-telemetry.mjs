import { chromium, firefox, webkit } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const url = "http://127.0.0.1:4321";
const results = [];
for (const [name, engine] of Object.entries({ chromium, firefox, webkit })) {
  const browser = await engine.launch();
  try {
    const context = await browser.newContext({ viewport: { width: 375, height: 900 } });
    const batches = [];
    let attempts = 0;
    await context.route("**/api/telemetry", async (route) => {
      const data = route.request().postDataJSON();
      batches.push(data.records);
      await route.fulfill({ status: ++attempts === 1 ? 502 : 204 });
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(url + "/?utm_source=test&utm_medium=referral&private=do-not-send", {
      referer: "https://example.org/search?q=do-not-send",
    });
    await page.waitForTimeout(11000);
    assert.ok(batches.length >= 2, "scheduled delivery and retry");
    assert.equal(batches[0][0].id, batches[1][0].id, "retry retains ID");
    const gap = await page.evaluate(() => ({
      learning:
        document.querySelector(".home-routes").getBoundingClientRect().top -
        document.querySelector("#learning-heading").getBoundingClientRect().bottom,
      history:
        document.querySelector(".home-history").getBoundingClientRect().top -
        document.querySelector("#history-heading").getBoundingClientRect().bottom,
      edge: getComputedStyle(document.querySelector(".home-route")).borderTopWidth,
    }));
    assert.ok(gap.learning >= 31.9);
    assert.ok(gap.history >= 31.9);
    assert.equal(gap.edge, "0px");
    await page.evaluate(() =>
      scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" })
    );
    await page.waitForTimeout(350);
    await page.locator(".home-support a").click();
    await page.waitForURL("**/donate");
    await page.waitForTimeout(5500);
    await page.locator("#menuToggle").click();
    await page.locator('dialog a[href="/#contact"]').click();
    await page.waitForURL("**/#contact");
    await page.evaluate(() =>
      document
        .querySelector('a[href^="mailto:"]')
        .addEventListener("click", (e) => e.preventDefault())
    );
    await page.locator('a[href^="mailto:"]').first().click();
    await page.waitForTimeout(5500);
    const records = [...new Map(batches.flat().map((record) => [record.id, record])).values()];
    const views = records.filter((r) => r.kind === "page_view");
    assert.deepEqual(
      views.map((r) => r.pathname),
      ["/", "/donate", "/"]
    );
    assert.equal(new Set(views.map((r) => r.pageViewId)).size, 3);
    assert.equal(new Set(views.map((r) => r.sessionId)).size, 1);
    assert.equal(views[0].referrer, "https://example.org");
    assert.equal(views[0].campaign.utm_source, "test");
    assert.ok(!JSON.stringify(records).includes("do-not-send"));
    assert.ok(records.some((r) => r.kind === "event" && r.event.name === "support_click"));
    assert.ok(records.some((r) => r.kind === "event" && r.event.name === "contact_click"));
    assert.ok(
      records.some(
        (r) => r.kind === "event" && r.event.name === "scroll_depth" && r.event.data.percent === 100
      )
    );
    assert.ok(records.some((r) => r.kind === "engagement" && r.engagement.engagedMs > 0));
    assert.ok(records.some((r) => r.kind === "font_health" && r.fontHealth.status === "ok"));
    assert.ok(
      records.filter((r) => r.kind === "vital").every((r) => r.pathname === "/" && !r.pageViewId)
    );
    assert.deepEqual(errors, []);
    for (const width of [320, 768, 1280, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      const geometry = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        gap:
          document.querySelector(".home-history").getBoundingClientRect().top -
          document.querySelector("#history-heading").getBoundingClientRect().bottom,
      }));
      assert.equal(geometry.overflow, false);
      assert.ok(geometry.gap >= 31.9);
    }
    await fs.mkdir("docs/homepage-followup", { recursive: true });
    await page.evaluate(async () => {
      scrollTo({ top: 0, behavior: "instant" });
      await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
    });
    await page.screenshot({ path: `docs/homepage-followup/${name}-desktop.png`, fullPage: true });
    await page.setViewportSize({ width: 375, height: 900 });
    await page.evaluate(async () => {
      await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
    });
    await page.screenshot({ path: `docs/homepage-followup/${name}-mobile.png`, fullPage: true });
    results.push({
      browser: name,
      gap,
      requests: batches.length,
      records: records.length,
      pageviews: views.length,
      retry: "pass",
      journeys: "pass",
      queryRedaction: "pass",
      errors,
    });
    await context.close();
    const optedOut = await browser.newContext();
    await optedOut.addInitScript(() =>
      Object.defineProperty(navigator, "doNotTrack", { value: "1" })
    );
    let optoutRequests = 0;
    await optedOut.route("**/api/telemetry", (r) => {
      optoutRequests++;
      return r.fulfill({ status: 204 });
    });
    const optPage = await optedOut.newPage();
    await optPage.goto(url);
    await optPage.waitForTimeout(5500);
    assert.equal(optoutRequests, 0);
    await optedOut.close();
  } finally {
    await browser.close();
  }
}
await fs.writeFile("docs/homepage-followup/visitor-checks.json", JSON.stringify(results, null, 2));
console.log(results);
