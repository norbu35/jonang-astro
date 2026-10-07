import { chromium } from "playwright";
import fs from "node:fs/promises";
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
await context.route("**/api/telemetry", (r) => r.fulfill({ status: 204 }));
const page = await context.newPage();
const cdp = await context.newCDPSession(page);
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
const result = [];
for (const path of ["/", "/introduction", "/monastery"]) {
  await page.goto("http://127.0.0.1:4321" + path);
  await page.evaluate(() => document.fonts.ready);
  result.push({
    path,
    ...(await page.evaluate(async () => {
      const frames = [];
      const tasks = [];
      const observer = new PerformanceObserver((list) =>
        tasks.push(...list.getEntries().map((e) => e.duration))
      );
      observer.observe({ type: "longtask" });
      let previous = performance.now();
      for (let i = 0; i < 180; i++) {
        await new Promise(requestAnimationFrame);
        const now = performance.now();
        frames.push(now - previous);
        previous = now;
        window.scrollTo({
          top: ((document.documentElement.scrollHeight - innerHeight) * i) / 179,
          behavior: "instant",
        });
      }
      observer.disconnect();
      frames.sort((a, b) => a - b);
      return {
        p95FrameMs: frames[Math.floor(frames.length * 0.95)],
        framesOver50ms: frames.filter((x) => x > 50).length,
        longTasks: tasks.length,
        maxLongTaskMs: Math.max(0, ...tasks),
        headingGap: document.querySelector(".home-history")
          ? document.querySelector(".home-history").getBoundingClientRect().top -
            document.querySelector("#history-heading").getBoundingClientRect().bottom
          : null,
      };
    })),
  });
}
await browser.close();
await fs.writeFile(
  process.argv[2] || "docs/homepage-followup/scroll-repeat.json",
  JSON.stringify(result, null, 2)
);
console.log(result);
