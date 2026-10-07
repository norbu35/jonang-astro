# Visitor telemetry

The implementation now separates page views from diagnostics and delivery attempts. The previous browser collector repeatedly sent cumulative arrays and the query script counted uploads as page views; those historical counts cannot be converted reliably into visitor journeys. The old CLI was a hardcoded snapshot. Both `pnpm telemetry` and `pnpm telemetry:query` now query Axiom directly, or exit clearly when read credentials are absent.

## Collected measurements

| Record        | Questions it helps answer                                                                                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `page_view`   | Which pages are visited, in how many tab sessions, from which referral origins/campaigns, countries/regions, browser families, device groups, languages and viewport groups? |
| `engagement`  | How long was a page visible and recently active? How far was it scrolled? Did the main thread encounter long tasks?                                                          |
| `event`       | Which learning links, support links, external destinations, email/phone actions and theme controls are used? Which scroll milestones are reached?                            |
| `vital`       | How do document LCP, INP, CLS, FCP and TTFB compare across routes?                                                                                                           |
| `font_health` | Did the Tibetan font families actually required by the current page load?                                                                                                    |
| `error`       | Which runtime/resource failures occur, and on which routes?                                                                                                                  |

Support clicks measure intent, not completed donations. Contact clicks do not prove a message or call happened. Active time stops accumulating after 30 seconds without interaction and while hidden; it is an engagement estimate, not proof of reading. Long-task diagnostics are available only in supporting browsers and do not measure GPU frame delays. Web Vitals use the official `web-vitals` package and remain attached to the document’s initial route rather than being copied to every Astro route transition.

Every route visit has a `pageViewId`, every document a `documentId`, and every telemetry record a stable `id`. Retries retain IDs. Queries use distinct pageview/event IDs and cumulative per-page engagement maxima; they do not sum retry uploads. A session is a browser-tab session stored in sessionStorage, not a persistent account or person. If production `TELEMETRY_SALT` and trusted client IP are available, the server adds a daily rotating pseudonymous identifier. Shared connections can group people together, and identifiers change each day; do not sum daily identifiers as unique people across a date range. No public default salt is used.

## Delivery and configuration

Browser records are batched at five-second intervals or 20 records. The queue is bounded; each batch stays below 48 KB, failed fetches retry up to three times, and hidden/page-exit delivery uses `sendBeacon` with a keepalive fallback. Page-exit delivery is best-effort, as with any browser analytics. Development builds, Do Not Track and Global Privacy Control suppress collection. `PUBLIC_TELEMETRY_ENABLED=false` disables it at build time.

The Netlify function at `/api/telemetry` validates batches and legacy records, logs normalized JSON, and forwards to Axiom when configured. Missing Axiom configuration leaves function logs as the only sink. Axiom failures return 502 so the browser can retry; HTTP errors are no longer silently accepted as successful ingestion. Existing optional `WEBHOOK_ALERT_URL` diagnostic alerts are retained. The Netlify request context supplies coarse geography when available, with the existing geo-header fallback for older runtimes.

Production variables:

- `AXIOM_TOKEN`: Axiom ingestion token.
- `AXIOM_DATASET`: destination dataset.
- `TELEMETRY_SALT`: a private, random server-side secret for daily identifiers.
- `WEBHOOK_ALERT_URL`: optional existing diagnostic alert destination.

Local read-only reporting uses `AXIOM_QUERY_TOKEN` with permission to query the dataset, and `AXIOM_DATASET`. Put these in the local environment or an ignored `.env`. The query command does not print credentials. `TELEMETRY_DAYS` selects 1–90 days (default 7); `TELEMETRY_REPORT_PATH` optionally saves a local JSON report. Keep query access separate from the production ingest token.

The browser sends referral origin (or a same-site path), three allowlisted UTM fields, broad client categories and explicit site actions. It does not capture form text, link text, email/phone destinations, full user agents or arbitrary query parameters. The server strips URL queries and email addresses from diagnostics, caps error fields, drops unknown fields, and excludes raw IP and precise coordinates from stored records. Browser automation is marked and excluded from version-2 query aggregates; this is not comprehensive bot detection.

## Verification and live status

`pnpm telemetry:test` verifies malformed/oversized requests, batch limits, legacy handling, origin rejection, normalized paths/referrers, field allowlists, error redaction, coarse geography, missing salt, base64 input, and mocked Axiom success/HTTP/network failures. It does not send data or alerts to external services.

`PLAYWRIGHT_BROWSERS_PATH=/tmp/jonang-audit-browsers node scripts/check-visitor-telemetry.mjs` checks scheduled delivery/retry IDs, route pageviews, session continuity, referral/campaign attribution, scroll/engagement, contact/support actions, font reporting, document-scoped vitals and DNT suppression in Chromium, Firefox and WebKit. The endpoint is intercepted locally; these checks do not pollute production analytics.

On 2026-10-07, the supplied local query token could list `jonang-telemetry`, but both the legacy API and the dataset’s regional query endpoint returned HTTP 403 for missing query/read permission. Live visitor statistics and the aggregate queries therefore remain unverified; no traffic totals have been inferred. The token is stored only in an ignored local `.env`. Production environment variables and geography availability still require verification. Existing version-1 records remain explicitly labeled legacy telemetry uploads.

Production deployment uses `main`. GitHub Actions currently has no Netlify deployment secrets and its deploy step skips the upload, so a successful workflow alone does not prove publication. At the deployment check on 2026-10-07, `https://jonang.in` returned Netlify HTTP 503 with `usage_exceeded`. That account-level hosting block must be resolved before the public site can be verified.

References: [Google’s web-vitals library](https://github.com/GoogleChrome/web-vitals), [Axiom query API](https://axiom.co/docs/restapi/query), [Axiom aggregation functions](https://axiom.co/docs/apl/aggregation-function/statistical-functions), [Netlify function context](https://docs.netlify.com/build/functions/api/).
