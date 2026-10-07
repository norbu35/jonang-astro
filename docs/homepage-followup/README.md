# Spacing, styling and scrolling follow-up

The homepage’s learning and history sections now use explicit 32–48px layout gaps rather than utility margins that can interact with list resets. Shared chapter headings also reserve space before a following grid/list. The learning routes are plain text columns: numbered labels, colored card edges and boxes are removed. Shared pillar/master panels use quiet neutral borders without hover lifts or colored top strips; the contact block’s decorative stripe is removed.

The shared layout no longer restarts anchor scrolling at 120, 400 and 800ms. Native anchors move immediately. The sticky section navigation now has an opaque background, a progress indicator animated with `transform` instead of width, cached scroll measurements, and listener/observer cleanup on Astro route swaps. Large blurred decorations on the introduction and monastery pages and whole-section scroll reveal animations are removed. The persistent navigation remains below the main header, with native touch/keyboard horizontal scrolling.

## Local scroll comparison

Chromium, 1440×1000 viewport, 4× CPU throttling, 180 animation-frame scroll steps per route. Each is one local run; these are diagnostic measurements rather than field guarantees or physical-wheel/touch testing.

| Route        | Before p95 frame interval | After p95 frame interval | Frames over 50ms, before → after |
| ------------ | ------------------------- | ------------------------ | -------------------------------- |
| Home         | 19.7ms                    | 17.4ms                   | 0 → 0                            |
| Introduction | 55.3ms                    | 20.0ms                   | 21 → 0                           |
| Monastery    | 52.0ms                    | 30.6ms                   | 13 → 0                           |

No long tasks were observed in either run; rendering/frame delays can happen without a JavaScript long task. See `scroll-before.json` and `scroll-after.json`. Repeat with `PLAYWRIGHT_BROWSERS_PATH=/tmp/jonang-audit-browsers node scripts/check-scroll-performance.mjs` while the production preview runs on port 4321.

Browser checks and final screenshots are stored alongside this note. The telemetry work and production-access limitations are documented in [visitor telemetry](../visitor-telemetry.md). Prior audit and remediation evidence remain historical snapshots of their respective revisions.

## Font rendering and validation

The earlier weight-range correction did not fully resolve Linux WebKit’s font fallback. Its `local("Cormorant Garamond Medium")` alias resolved to a sans-serif face even though the Font Loading API reported success. Removing those local aliases makes all browsers use the bundled file. The final check compares the actual font’s glyph widths with an independently loaded copy of that file, rather than only checking its loaded status or comparing it with Georgia. WebKit now matches the bundled reference exactly.

Final production build: 13 pages, zero errors/warnings/hints. SEO checks passed. Server telemetry tests passed, and browser visitor checks passed in Chromium, Firefox and WebKit. Eight fresh full-page axe scans (375/1440px, light/dark, Chromium/WebKit) reported no violations; each also verified the actual serif metrics. All checked widths (320/375/768/1280/1440px) reflowed without horizontal overflow, with at least 32px between homepage heading wrappers and following content. See `visitor-checks.json` and `accessibility.json`.
