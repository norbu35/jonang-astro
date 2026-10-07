import { chromium } from "playwright";
import fs from "node:fs/promises";
import assert from "node:assert/strict";
const out = "docs/homepage-remediation";
const browser = await chromium.launch();
const results = {};
for (const name of ["reduced-motion", "blocked-fonts"]) {
  const context = await browser.newContext({
    viewport: { width: 375, height: 900 },
    reducedMotion: name === "reduced-motion" ? "reduce" : "no-preference",
  });
  if (name === "blocked-fonts")
    await context.route(/fonts\.googleapis\.com|fonts\.gstatic\.com|\.woff2?/, (route) =>
      route.abort()
    );
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4321/");
  await page.locator('a[href="#community"]').click();
  const result = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > innerWidth,
    title: document.querySelector("main h1").innerText,
    hash: location.hash,
    reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
  }));
  assert.equal(result.overflow, false);
  assert.equal(result.hash, "#community");
  await page.screenshot({ path: `${out}/screenshots/${name}.png`, fullPage: true });
  results[name] = result;
  await context.close();
}
await browser.close();
const extension = "/tmp/jonang-audit-zoom-extension";
await fs.mkdir(extension, { recursive: true });
await fs.writeFile(
  `${extension}/manifest.json`,
  JSON.stringify({
    manifest_version: 3,
    name: "Local audit zoom",
    version: "1.0",
    permissions: ["tabs"],
    background: { service_worker: "background.js" },
  })
);
await fs.writeFile(
  `${extension}/background.js`,
  "chrome.tabs.onUpdated.addListener((id,change,tab)=>{if(change.status==='complete'&&tab.url?.startsWith('http://127.0.0.1:4321'))chrome.tabs.setZoom(id,2);});"
);
const context = await chromium.launchPersistentContext("/tmp/jonang-remediation-zoom-profile", {
  channel: "chromium",
  headless: true,
  viewport: { width: 1440, height: 1000 },
  args: [`--disable-extensions-except=${extension}`, `--load-extension=${extension}`],
});
const page = await context.newPage();
await page.goto("http://127.0.0.1:4321/");
await page.waitForTimeout(600);
results.zoom200 = await page.evaluate(() => ({
  width: innerWidth,
  dpr: devicePixelRatio,
  overflow: document.documentElement.scrollWidth > innerWidth,
}));
assert.equal(results.zoom200.width, 720);
assert.equal(results.zoom200.dpr, 2);
assert.equal(results.zoom200.overflow, false);
await page.screenshot({ path: `${out}/screenshots/zoom-200.png`, fullPage: true });
await context.close();
await fs.writeFile(`${out}/resilience.json`, JSON.stringify(results, null, 2));
console.log(results);
