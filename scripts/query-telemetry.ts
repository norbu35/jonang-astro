#!/usr/bin/env tsx
/** Live aggregate analytics. Never treat telemetry uploads as pageviews. */
import { existsSync, writeFileSync } from "node:fs";
if (existsSync(".env")) process.loadEnvFile(".env");
const token = process.env.AXIOM_QUERY_TOKEN || process.env.AXIOM_TOKEN;
const dataset = process.env.AXIOM_DATASET || "jonang-telemetry";
if (!/^[\w-]+$/.test(dataset)) throw new Error("Invalid AXIOM_DATASET");
const days = Math.max(1, Math.min(90, Number(process.env.TELEMETRY_DAYS) || 7));
const base = `['${dataset}'] | where _time >= ago(${days}d) | where schema_version == "2.0" | where automated != true`;
const pageviews = `${base} | where kind == "page_view"`;
const queries: Record<string, string> = {
  "Daily traffic (daily identifiers are not persistent people)": `${pageviews} | summarize pageviews=dcount(pageViewId), sessions=dcount(session), daily_identifiers=dcountif(visitor, isnotempty(visitor)) by bin(_time, 1d) | sort by _time asc`,
  "Popular pages": `${pageviews} | summarize pageviews=dcount(pageViewId), sessions=dcount(session) by pathname | sort by pageviews desc`,
  "Countries and regions": `${pageviews} | summarize pageviews=dcount(pageViewId), sessions=dcount(session) by country=tostring(['geo.country.code']), region=tostring(['geo.subdivision.name']) | sort by pageviews desc`,
  "Referral sources": `${pageviews} | summarize pageviews=dcount(pageViewId), sessions=dcount(session) by referrer | sort by pageviews desc`,
  Campaigns: `${pageviews} | where isnotempty(['campaign.utm_source']) | summarize pageviews=dcount(pageViewId) by source=tostring(['campaign.utm_source']), medium=tostring(['campaign.utm_medium']), campaign=tostring(['campaign.utm_campaign'])`,
  "Browser, device and language": `${pageviews} | summarize pageviews=dcount(pageViewId) by browser=tostring(['client.browser']), device=tostring(['client.device']), language=tostring(['client.language']), viewport=tostring(['client.viewport'])`,
  "Reading engagement and scroll performance": `${base} | where kind == "engagement" | summarize active_ms=max(todouble(['engagement.engagedMs'])), depth=max(todouble(['engagement.maxScrollPercent'])), long_tasks=max(todouble(['engagement.longTasks'])), blocking_ms=max(todouble(['engagement.totalBlockingMs'])) by pageViewId, pathname | summarize page_samples=count(), avg_active_seconds=avg(active_ms)/1000, avg_depth=avg(depth), p75_blocking_ms=percentile(blocking_ms, 75) by pathname`,
  "Actions and navigation journeys (click intent, not completed donations)": `${base} | where kind == "event" | summarize actions=dcount(id), sessions=dcount(session) by action=tostring(['event.name']), pathname, destination=tostring(['event.data.destination']), section=tostring(['event.data.section']) | sort by actions desc`,
  "Document Web Vitals": `${base} | where kind == "vital" | summarize value=max(todouble(['metric.value'])) by documentId, pathname, metric_name=tostring(['metric.name']), metric_id=tostring(['metric.metricId']) | summarize samples=count(), p50=percentile(value, 50), p75=percentile(value, 75), p95=percentile(value, 95) by pathname, metric_name`,
  "Runtime/resource errors": `${base} | where kind == "error" | mv-expand errors | summarize records=dcount(id) by pathname, error_type=tostring(errors.type), message=tostring(errors.message) | sort by records desc | limit 30`,
  "Font health": `${base} | where kind == "font_health" | summarize pages=dcount(pageViewId) by pathname, status=tostring(['fontHealth.status'])`,
  "Legacy ingestion (uploads, not pageviews)": `['${dataset}'] | where _time >= ago(${days}d) | where schema_version == "1.0" | summarize uploads=count(), sessions=dcount(session)`,
};
async function main() {
  if (!token) {
    console.error(
      "Live analytics unavailable: set AXIOM_QUERY_TOKEN with read access and AXIOM_DATASET in your local environment or .env. Keep the production AXIOM_TOKEN ingest-only. No visitor totals have been inferred."
    );
    process.exitCode = 1;
    return;
  }
  const results = [];
  for (const [name, apl] of Object.entries(queries)) {
    const response = await fetch("https://api.axiom.co/v1/datasets/_apl", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        apl,
        startTime: new Date(Date.now() - days * 86400000).toISOString(),
        endTime: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) {
      console.error(
        `Axiom query failed: HTTP ${response.status}. Check dataset access for the query token.`
      );
      process.exitCode = 1;
      return;
    }
    const data = await response.json();
    console.log(`\n${name}\n${JSON.stringify(data, null, 2)}`);
    results.push({ name, data });
  }
  if (process.env.TELEMETRY_REPORT_PATH)
    writeFileSync(
      process.env.TELEMETRY_REPORT_PATH,
      JSON.stringify({ generated: new Date().toISOString(), days, results }, null, 2)
    );
}
await main();
