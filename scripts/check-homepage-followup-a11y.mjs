import { chromium, webkit } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const results = [];
for (const [name, engine] of Object.entries({ chromium, webkit })) {
  const browser = await engine.launch();
  try {
    for (const width of [375, 1440])
      for (const colorScheme of ["light", "dark"]) {
        const context = await browser.newContext({
          viewport: { width, height: 1000 },
          colorScheme,
        });
        await context.route("**/api/telemetry", (r) => r.fulfill({ status: 204 }));
        const page = await context.newPage();
        await page.goto("http://127.0.0.1:4321/");
        await page.evaluate(() => document.fonts.ready);
        for (let y = 0; y < (await page.evaluate(() => document.body.scrollHeight)); y += 800) {
          await page.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), y);
          await page.waitForTimeout(60);
        }
        await page.addScriptTag({
          path:
            process.env.AUDIT_AXE_PATH ||
            "/tmp/jonang-homepage-audit-tools/node_modules/axe-core/axe.min.js",
        });
        const violations = await page.evaluate(async () =>
          (await window.axe.run(document)).violations.map((v) => ({
            id: v.id,
            targets: v.nodes.map((n) => n.target),
          }))
        );
        results.push({ browser: name, width, colorScheme, violations });
        assert.deepEqual(violations, []);
        const font = await page.evaluate(async () => {
          const source = document.querySelector("link[rel=preload][href*=Cormorant]").href;
          const face = new FontFace("Reference Cormorant", `url(${source})`, { weight: "500" });
          await face.load();
          document.fonts.add(face);
          const canvas = document.createElement("canvas").getContext("2d");
          const measure = (family) => {
            canvas.font = `500 20px "${family}"`;
            return canvas.measureText("Main Jonang Takten Phuntsok Choeling").width;
          };
          return {
            actual: measure("Cormorant Garamond"),
            reference: measure("Reference Cormorant"),
            fallback: measure("sans-serif"),
          };
        });
        assert.ok(
          Math.abs(font.actual - font.reference) < 1,
          `${name}: bundled serif must match its font file`
        );
        results.at(-1).font = font;
        await context.close();
      }
  } finally {
    await browser.close();
  }
}
await fs.writeFile("docs/homepage-followup/accessibility.json", JSON.stringify(results, null, 2));
console.log(`Passed ${results.length} complete-page accessibility and actual-font checks.`);
