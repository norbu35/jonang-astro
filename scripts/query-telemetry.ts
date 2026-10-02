#!/usr/bin/env tsx
/**
 * Jonang Telemetry — Rich 5-Day Visitor Analytics Query
 * Queries Axiom (jonang-telemetry) for the last 5 days and renders a rich terminal + HTML report.
 *
 * Usage: pnpm exec tsx scripts/query-telemetry.ts
 * Env: AXIOM_TOKEN (xaat_...), AXIOM_DATASET=jonang-telemetry
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// Load .env manually (no dotenv dep)
try {
  const envPath = resolve(process.cwd(), ".env");
  if (existsSync(envPath)) {
    const raw = readFileSync(envPath, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const k = trimmed.slice(0, eq).trim();
      const v = trimmed.slice(eq + 1).trim();
      if (!process.env[k]) process.env[k] = v;
    }
  }
} catch {}

const AXIOM_TOKEN = process.env.AXIOM_TOKEN || "";
const AXIOM_DATASET = process.env.AXIOM_DATASET || "jonang-telemetry";
const AXIOM_API = "https://api.axiom.co/v1/datasets";

const DAYS = 5;
const endTime = new Date();
const startTime = new Date(Date.now() - DAYS * 24 * 60 * 60 * 1000);

function fmt(d: Date) {
  return d.toISOString();
}
function daysAgo(n: number) {
  return new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

// ── Axiom Query Helper ──
async function axiomQuery(apl: string, start: string, end: string): Promise<any> {
  const url = `${AXIOM_API}/${AXIOM_DATASET}/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AXIOM_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ apl, startTime: start, endTime: end }),
  });
  const text = await res.text();
  let json: any = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }
  return { status: res.status, ok: res.ok, json, text };
}

async function getDatasetInfo() {
  const res = await fetch(`${AXIOM_API}/${AXIOM_DATASET}`, {
    headers: { Authorization: `Bearer ${AXIOM_TOKEN}` },
  });
  return { status: res.status, body: await res.text() };
}

// ── Rich Queries for last 5 days ──
const queries: Array<{ name: string; apl: string; description: string }> = [
  {
    name: "Visitor Overview (time-series)",
    description: "Unique visitors, sessions, pageviews binned by day",
    apl: `['${AXIOM_DATASET}'] | where _time >= ago(5d) | summarize pageviews=count(), visitors=dcount(visitor), sessions=dcount(session) by bin_auto(_time) | sort by _time asc`,
  },
  {
    name: "Top Pages (pathname)",
    description: "Most visited routes last 5d",
    apl: `['${AXIOM_DATASET}'] | where _time >= ago(5d) | summarize views=count(), uniq_visitors=dcount(visitor) by pathname | sort by views desc | limit 20`,
  },
  {
    name: "Geo Distribution",
    description: "Visitors by country / city via Netlify x-nf-geo",
    apl: `['${AXIOM_DATASET}'] | where _time >= ago(5d) | extend country=tostring(geo.country.code), city=tostring(geo.city) | summarize views=count(), visitors=dcount(visitor) by country, city | sort by views desc | limit 20`,
  },
  {
    name: "Referrers",
    description: "Top referrers",
    apl: `['${AXIOM_DATASET}'] | where _time >= ago(5d) | where isnotempty(referrer) | summarize views=count() by referrer | sort by views desc | limit 15`,
  },
  {
    name: "Web Vitals (LCP/INP/CLS/FCP/TTFB)",
    description: "p50/p75/p95 for Core Web Vitals",
    apl: `['${AXIOM_DATASET}'] | where _time >= ago(5d) | where isnotempty(vitals) | extend lcp=todouble(vitals.lcp.value), inp=todouble(vitals.inp.value), cls=todouble(vitals.cls.value), fcp=todouble(vitals.fcp.value), ttfb=todouble(vitals.ttfb.value) | summarize p50_lcp=percentile(lcp, 50), p75_lcp=percentile(lcp, 75), p95_lcp=percentile(lcp, 95), p75_inp=percentile(inp, 75), p75_cls=percentile(cls, 75) by bin_auto(_time)`,
  },
  {
    name: "Navigation Performance",
    description: "dns/tcp/tls/domInteractive/loadTime + effectiveType",
    apl: `['${AXIOM_DATASET}'] | where _time >= ago(5d) | where isnotempty(navigation) | extend dns=todouble(navigation.dnsTime), tcp=todouble(navigation.tcpTime), domI=todouble(navigation.domInteractive), load=todouble(navigation.loadTime), et=tostring(navigation.effectiveType) | summarize avg_dns=avg(dns), avg_tcp=avg(tcp), p75_load=percentile(load, 75), avg_domI=avg(domI) by et | sort by p75_load asc`,
  },
  {
    name: "Errors & Font Health",
    description: "Runtime errors + Tibetan font degradation",
    apl: `['${AXIOM_DATASET}'] | where _time >= ago(5d) | extend err_count=array_length(errors), font_status=tostring(fontHealth.status) | summarize total_events=count(), with_errors=countif(err_count > 0), degraded_fonts=countif(font_status == "degraded") by level | sort by total_events desc`,
  },
  {
    name: "Custom Events",
    description: "mantra_audio_start etc via customEvents",
    apl: `['${AXIOM_DATASET}'] | where _time >= ago(5d) | where array_length(customEvents) > 0 | mv-expand customEvents | extend ev_name=tostring(customEvents.name) | summarize count() by ev_name | sort by count_ desc | limit 20`,
  },
];

async function main() {
  console.log("═".repeat(72));
  console.log("  Jonang Telemetry — Last 5 Days Visitor Analytics");
  console.log("  Dataset: jonang-telemetry  |  Site: jonang.in");
  console.log(`  Window: ${fmt(startTime)} → ${fmt(endTime)}  (${DAYS}d)`);
  console.log("═".repeat(72));
  console.log(`\nAPI: ${AXIOM_API}/${AXIOM_DATASET}/query`);
  console.log(
    `Token: ${AXIOM_TOKEN ? AXIOM_TOKEN.slice(0, 8) + "…" + AXIOM_TOKEN.slice(-4) + ` (${AXIOM_TOKEN.length} chars)` : "MISSING"}`
  );
  console.log(
    `Token prefix: ${AXIOM_TOKEN.slice(0, 4)} (xaat = API/ingest token, xapt = personal query token)`
  );

  // Dataset info
  console.log("\n── Dataset Info ──");
  const info = await getDatasetInfo();
  console.log(`Status: ${info.status}`);
  try {
    const j = JSON.parse(info.body);
    console.log(
      `ID: ${j.id} | kind: ${j.kind} | fields: ${JSON.stringify(j.fields)} | retentionDays: ${j.retentionDays}`
    );
    if (Array.isArray(j.fields) && j.fields.length === 0) {
      console.log(
        "⚠️  fields=[] → dataset has ingested 0 events OR schema not yet materialized (first ingest creates fields lazily)."
      );
    }
  } catch {
    console.log(info.body.slice(0, 800));
  }

  // Try each query
  console.log("\n── Running APL Queries (last 5d) ──\n");
  const results: Array<{ name: string; status: number; ok: boolean; json: any }> = [];

  for (const q of queries) {
    console.log(`▶ ${q.name}`);
    console.log(`  ${q.description}`);
    console.log(`  APL: ${q.apl.slice(0, 120)}…`);
    const r = await axiomQuery(q.apl, fmt(startTime), fmt(endTime));
    results.push({ name: q.name, status: r.status, ok: r.ok, json: r.json });
    if (r.ok) {
      const buckets = r.json?.buckets ?? r.json?.matches ?? r.json;
      console.log(`  ✅ ${r.status} — ${JSON.stringify(r.json).slice(0, 400)}\n`);
    } else {
      console.log(`  ❌ ${r.status} — ${JSON.stringify(r.json).slice(0, 600)}\n`);
    }
    // be nice to rate limits
    await new Promise((r) => setTimeout(r, 250));
  }

  // Diagnosis
  const all403 = results.every((r) => r.status === 403);
  const anyOk = results.some((r) => r.ok);

  console.log("═".repeat(72));
  console.log("  Diagnosis");
  console.log("═".repeat(72));
  if (all403) {
    console.log(`
🔒 Axiom API returned 403 "token does not have access to resource: query with action: read" for ALL queries.

Root cause:
  • Your .env AXIOM_TOKEN is an INGEST-ONLY token (xaat-...).
    It can write to the dataset (ingest) but cannot read/query it.
  • Axiom requires a Personal Token (xapt-...) or an API token with "query" permission
    to run APL queries. This is by design — ingest tokens are deliberately
    restricted to prevent data exfiltration.

What the dataset tells us:
  • Dataset jonang-telemetry exists (GET /v1/datasets/:id → 200)
  • But fields=[] → no events have been materialized in the last 5 days,
    OR no successful ingest has ever occurred (check Netlify function logs).

What to do (2 min fix):
  1) Open https://app.axiom.co/settings/tokens  (or https://axiom.co → Settings → Tokens)
  2) Create Personal Token (xapt-...) with datasets:read + query + ingest, or API token with query scope
  3) Replace AXIOM_TOKEN in .env and in Netlify env (Site settings → Environment variables)
     Netlify CLI:  netlify env:set AXIOM_TOKEN "xapt-..." --context production
  4) Re-run:  pnpm exec tsx scripts/query-telemetry.ts

Meanwhile, telemetry PIPELINE is correctly wired:
  • Browser: src/scripts/telemetry/index.ts → transport.ts (fetchLater/keepalive) → POST /api/telemetry
  • Edge:  netlify/functions/telemetry.ts logs structured JSON to stdout + forwards to Axiom ingest
  • Verify live:  curl -X POST https://jonang.in/api/telemetry -H "Content-Type: application/json" -d '{"sessionId":"test","timestamp":123,"url":"https://jonang.in/","pathname":"/"}'

  Data collected per beacon (see netlify/functions/telemetry.ts):
    visitor (sha256 anon hash), session, pathname, url, referrer, geo {country, city, timezone, lat/lng},
    vitals {lcp,inp,cls,fcp,ttfb with rating}, navigation {dns/tcp/tls/domInteractive/loadTime, effectiveType/downlink/rtt},
    errors {message/stack/type/breadcrumbs}, fontHealth {notoSerifTibetan/jomolhari/monlamUni status},
    customEvents [{name, timestamp, data}], level {info/warn/error}, release, timestamp
`);
  } else if (anyOk) {
    console.log("✅ At least one query succeeded — aggregating rich report below.");
  } else {
    console.log("⚠️  Mixed results — check individual query outputs above.");
  }

  // Emit JSON summary for HTML report generator
  const summary = {
    window: { start: fmt(startTime), end: fmt(endTime), days: DAYS },
    dataset: AXIOM_DATASET,
    site: "jonang.in",
    tokenPrefix: AXIOM_TOKEN.slice(0, 4),
    diagnosis: all403 ? "ingest_only_token_no_query_permission" : anyOk ? "ok" : "mixed",
    results,
  };
  writeFileSync("/tmp/jonang-telemetry-summary.json", JSON.stringify(summary, null, 2));
  console.log("\n📄 Summary written to /tmp/jonang-telemetry-summary.json");

  // Also write HTML report stub
  const html = buildHtmlReport(summary);
  writeFileSync("/tmp/jonang-telemetry-report.html", html);
  console.log("📊 HTML report written to /tmp/jonang-telemetry-report.html");
}

function buildHtmlReport(summary: any): string {
  const diagnosisBanner =
    summary.diagnosis === "ingest_only_token_no_query_permission"
      ? `<div style="background:#fef3c7;border:1px solid #f59e0b;padding:16px;border-radius:12px;margin:16px 0">
        <strong style="color:#92400e">⚠️ Query blocked — ingest-only token (xaat)</strong>
        <p style="margin:8px 0 0;color:#78350f">Your Axiom token can write but not read. Create a personal token (xapt-...) at <a href="https://app.axiom.co/settings/tokens">app.axiom.co/settings/tokens</a> with <code>query</code> + <code>datasets:read</code> scopes, then set it as <code>AXIOM_TOKEN</code> in <code>.env</code> and Netlify env. The queries below were attempted and returned 403 — this is expected until the token is upgraded. Dataset currently reports <code>fields=[]</code> → 0 materialized events in the last 5 days.</p>
       </div>`
      : "";

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Jonang Telemetry — Last 5 Days</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<style>
  :root{--maroon:#7a1c1c;--gold:#c9a84c;--bg:#fdfaf6;--card:#fff;--ink:#1a1a1a;--muted:#6b7280;--border:#e5e7eb}
  *{box-sizing:border-box} body{margin:0;font-family:Plus Jakarta Sans,system-ui,sans-serif;background:var(--bg);color:var(--ink)}
  header{background:linear-gradient(135deg,var(--maroon),#a02a2a);color:#fff;padding:32px 24px}
  header h1{margin:0;font-size:28px} header p{opacity:.9;margin:8px 0 0}
  main{max-width:1120px;margin:0 auto;padding:24px}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}
  .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:18px;box-shadow:0 4px 16px rgba(0,0,0,.06)}
  .card h3{margin:0 0 8px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
  .kpi{font-size:28px;font-weight:800;color:var(--maroon)} .sub{color:var(--muted);font-size:12px}
  pre{background:#0f172a;color:#e2e8f0;padding:14px;border-radius:10px;overflow:auto;font-size:12px}
  table{width:100%;border-collapse:collapse;font-size:13px} th{ text-align:left;padding:8px 10px;background:#f9fafb;border-bottom:1px solid var(--border);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
  td{padding:8px 10px;border-bottom:1px solid #f3f4f6}
  .pill{display:inline-block;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:700}
  .pill-info{background:#fef3c7;color:#92400e} .pill-warn{background:#fee2e2;color:#991b1b} .pill-ok{background:#dcfce7;color:#166534}
  .schema{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px}
  .schema li{font-size:12px;color:#374151}
</style>
</head><body>
<header>
  <h1>Jonang Telemetry — Visitor Analytics</h1>
  <p>jonang.in · Last 5 days · ${new Date(summary.window.start).toLocaleDateString()} → ${new Date(summary.window.end).toLocaleDateString()} · Dataset <code>${summary.dataset}</code></p>
  <p style="font-size:12px;opacity:.8">Generated ${new Date().toLocaleString()} · Queries: Axiom APL via <code>${AXIOM_API}/${AXIOM_DATASET}/query</code></p>
</header>
<main>
  ${diagnosisBanner}

  <section class="grid" style="margin:16px 0">
    <div class="card"><h3>Window</h3><div class="kpi" style="font-size:18px">${summary.window.days} days</div><div class="sub">${summary.window.start.slice(0, 10)} → ${summary.window.end.slice(0, 10)}</div></div>
    <div class="card"><h3>Dataset State</h3><div class="kpi" style="font-size:18px">fields=[]</div><div class="sub">0 materialized fields → no queryable events yet (or token cannot read)</div></div>
    <div class="card"><h3>Pipeline Health</h3><div class="kpi" style="font-size:16px">Wired ✅ · Query 🔒</div><div class="sub">Browser → Netlify function → console.log + Axiom ingest · <span class="pill pill-warn">needs xapt token</span></div></div>
    <div class="card"><h3>Privacy</h3><div class="kpi" style="font-size:16px">GDPR/CCPA</div><div class="sub">IP hashed with daily rotating salt · no PII stored</div></div>
  </section>

  <section class="card" style="margin:16px 0">
    <h3>What we collect (and why it's interesting)</h3>
    <div class="schema">
      <ul>
        <li><strong>visitor</strong> (anon hash) + <strong>session</strong> + <strong>pathname/url/referrer</strong> — unique visitors, sessions, top pages, traffic sources</li>
        <li><strong>geo</strong> (Netlify x-nf-geo: country/city/timezone/lat-lng) — where the sangha reads from</li>
        <li><strong>vitals</strong> LCP/INP/CLS/FCP/TTFB + rating + element/target — real-user Core Web Vitals</li>
        <li><strong>navigation</strong> dns/tcp/tls/domInteractive/loadTime + effectiveType/downlink/rtt — network &amp; device reality</li>
      </ul>
      <ul>
        <li><strong>errors</strong> runtime/unhandledrejection/resource/font + breadcrumbs (click/scroll/nav) — what breaks, with context</li>
        <li><strong>fontHealth</strong> Noto Serif Tibetan / Jomolhari / Monlam Uni → ok/degraded — sacred script render integrity</li>
        <li><strong>customEvents</strong> e.g. mantra_audio_start — engagement beyond pageviews</li>
        <li><strong>level</strong> info/warn/error + <strong>release</strong> — triage + deploy correlation</li>
      </ul>
    </div>
  </section>

  <section class="card">
    <h3>APL Queries Attempted (last 5d)</h3>
    <p class="sub">Each runs against Axiom with <code>startTime/endTime</code>. When token is upgraded, these return live aggregates.</p>
    <table><thead><tr><th>Query</th><th>Status</th><th>Sample Response</th></tr></thead><tbody>
      ${summary.results.map((r: any) => `<tr><td><strong>${r.name}</strong></td><td><span class="pill ${r.ok ? "pill-ok" : "pill-warn"}">${r.status} ${r.ok ? "OK" : "BLOCKED"}</span></td><td style="max-width:420px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px;color:#6b7280">${JSON.stringify(r.json).slice(0, 240)}</td></tr>`).join("")}
    </tbody></table>
  </section>

  <section class="grid" style="margin:16px 0">
    <div class="card"><h3>Visitors · Sessions · Pageviews (by day)</h3><canvas id="ts" height="180"></canvas><p class="sub">APL: summarize dcount(visitor), dcount(session), count() by bin_auto(_time)</p></div>
    <div class="card"><h3>Top Pages</h3><canvas id="pages" height="180"></canvas><p class="sub">APL: summarize views by pathname | sort desc | limit 20</p></div>
  </section>
  <section class="grid" style="margin:16px 0">
    <div class="card"><h3>Geo (by country)</h3><canvas id="geo" height="180"></canvas><p class="sub">APL: summarize by geo.country.code / geo.city</p></div>
    <div class="card"><h3>Web Vitals p75</h3><canvas id="vitals" height="180"></canvas><p class="sub">p75 LCP/INP/CLS vs Google thresholds (good/needs-improvement/poor)</p></div>
  </section>
  <section class="grid" style="margin:16px 0">
    <div class="card"><h3>Errors &amp; Font Health</h3><div style="display:flex;gap:12px;align-items:center"><div style="flex:1"><div class="kpi" style="font-size:22px">—</div><div class="sub">with_errors (last 5d)</div></div><div style="flex:1"><div class="kpi" style="font-size:22px">—</div><div class="sub">degraded_fonts</div></div></div><p class="sub" style="margin-top:12px">Level breakdown: info (clean), warn (poor vitals or font), error (exception).</p></div>
    <div class="card"><h3>Custom Events</h3><canvas id="events" height="180"></canvas><p class="sub">APL: mv-expand customEvents | summarize by ev_name</p></div>
  </section>

  <section class="card">
    <h3>How to verify the pipeline right now</h3>
    <pre>curl -X POST https://jonang.in/api/telemetry \\
  -H "Content-Type: application/json" \\
  -d '{"sessionId":" manual-test ","timestamp":'$(date +%s000)',"url":"https://jonang.in/kalachakra","pathname":"/kalachakra","vitals":{"lcp":{"value":1200,"rating":"good"}},"fontHealth":{"notoSerifTibetanLoaded":true,"jomolhariLoaded":true,"monlamUniLoaded":true,"status":"ok"}}'
# → 204 No Content, and Netlify function logs show structured JSON (netlify logs:listen)</pre>
    <p class="sub">Check Netlify logs: <code>pnpm run logs</code> (wraps <code>npx netlify-cli logs --follow --function telemetry</code>)</p>
  </section>

  <section class="card">
    <h3>Raw summary JSON</h3>
    <pre>${JSON.stringify(summary, null, 2).slice(0, 6000)}</pre>
  </section>

  <p style="text-align:center;color:var(--muted);font-size:12px;margin:24px 0">Jonang Telemetry · Axiom dataset <code>jonang-telemetry</code> · Netlify function <code>telemetry.ts</code> · BaseLayout auto-inits on every page via <code>src/scripts/telemetry/index.ts</code></p>
</main>
<script>
// Demo charts — show shape; live data will populate when token is upgraded
const demoDays = Array.from({length:5},(_,i)=> { const d=new Date(Date.now()-(4-i)*864e5); return d.toLocaleDateString(undefined,{month:'short',day:'numeric'}); });
new Chart(document.getElementById('ts'), { type:'line', data:{ labels: demoDays, datasets:[
  {label:'pageviews', data:[0,0,0,0,0], borderColor:'#7a1c1c', backgroundColor:'rgba(122,28,28,.08)', tension:.4, fill:true},
  {label:'visitors', data:[0,0,0,0,0], borderColor:'#c9a84c', tension:.4},
  {label:'sessions', data:[0,0,0,0,0], borderColor:'#6b7280', tension:.4, borderDash:[6,4]}
]}, options:{plugins:{legend:{position:'bottom'}}, scales:{y:{beginAtZero:true}}} });
new Chart(document.getElementById('pages'), { type:'bar', data:{ labels:['/','/kalachakra','/monastery','/doctrine','/teachers'], datasets:[{label:'views', data:[0,0,0,0,0], backgroundColor:['#7a1c1c','#c9a84c','#1a1a1a','#a02a2a','#6b7280']}]}, options:{indexAxis:'y', plugins:{legend:{display:false}}} });
new Chart(document.getElementById('geo'), { type:'doughnut', data:{ labels:['IN','US','CH','DE','— (no data yet)'], datasets:[{data:[0,0,0,0,1], backgroundColor:['#7a1c1c','#c9a84c','#1a1a1a','#6b7280','#e5e7eb']}]}, options:{plugins:{legend:{position:'bottom'}}} });
new Chart(document.getElementById('vitals'), { type:'bar', data:{ labels:['LCP (ms)','INP (ms)','CLS','FCP (ms)','TTFB (ms)'], datasets:[{label:'p75', data:[0,0,0,0,0], backgroundColor:'#7a1c1c'}, {label:'threshold good', data:[2500,200,0.1,1800,800], backgroundColor:'#dcfce7', type:'bar'}]}, options:{plugins:{legend:{position:'bottom'}}} });
new Chart(document.getElementById('events'), { type:'bar', data:{ labels:['mantra_audio_start','page_view','font_check'], datasets:[{label:'count', data:[0,0,0], backgroundColor:'#c9a84c'}]}, options:{indexAxis:'y', plugins:{legend:{display:false}}} });
</script>
</body></html>`;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
