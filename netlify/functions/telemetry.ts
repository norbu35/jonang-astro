import { getContext, type Handler } from "@netlify/functions";
import { createHash, randomUUID } from "node:crypto";

type Data = Record<string, unknown>;
const object = (value: unknown): value is Data =>
  !!value && typeof value === "object" && !Array.isArray(value);
const text = (value: unknown, limit = 200) =>
  typeof value === "string"
    ? value
        .replace(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi, "[email]")
        .replace(/(https?:\/\/[^\s?#]+)[?#][^\s]*/g, "$1")
        .slice(0, limit)
    : undefined;
const number = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : undefined;
const path = (value: unknown) =>
  typeof value === "string" && value.startsWith("/")
    ? value.split(/[?#]/)[0].slice(0, 200)
    : undefined;
function pick(value: unknown, keys: string[]): Data | undefined {
  if (!object(value)) return undefined;
  return Object.fromEntries(
    keys
      .filter((key) => ["string", "number", "boolean"].includes(typeof value[key]))
      .map((key) => [
        key,
        typeof value[key] === "string"
          ? text(value[key])
          : typeof value[key] === "number"
            ? number(value[key])
            : value[key],
      ])
  );
}
function referrer(value: unknown) {
  if (typeof value !== "string") return undefined;
  if (value.startsWith("/")) return path(value);
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.origin : undefined;
  } catch {
    return undefined;
  }
}
export function normalizeRecord(raw: unknown): Data | null {
  if (!object(raw) || !text(raw.sessionId, 80) || !path(raw.pathname)) return null;
  const kinds = ["page_view", "engagement", "event", "vital", "error", "font_health"];
  const legacy = raw.schemaVersion !== 2;
  if (
    !legacy &&
    (!kinds.includes(String(raw.kind)) || !text(raw.id, 80) || !text(raw.documentId, 80))
  )
    return null;
  if (!legacy && raw.kind !== "vital" && !text(raw.pageViewId, 80)) return null;
  const record: Data = {
    schema_version: legacy ? "1.0" : "2.0",
    id: text(raw.id, 80) || randomUUID(),
    kind: legacy ? "legacy_snapshot" : raw.kind,
    session: text(raw.sessionId, 80),
    pageViewId: text(raw.pageViewId, 80),
    documentId: text(raw.documentId, 80),
    automated: raw.automated === true,
    pathname: path(raw.pathname),
    referrer: referrer(raw.referrer),
    clientTimestamp: number(raw.timestamp),
    client: pick(raw.client, ["browser", "device", "language", "viewport", "automated"]),
    campaign: pick(raw.campaign, ["utm_source", "utm_medium", "utm_campaign"]),
    engagement: pick(raw.engagement, [
      "engagedMs",
      "maxScrollPercent",
      "longTasks",
      "totalBlockingMs",
    ]),
    metric: pick(raw.metric, ["name", "value", "rating", "metricId", "navigationType"]),
    fontHealth: pick(raw.fontHealth, [
      "notoSerifTibetanLoaded",
      "jomolhariLoaded",
      "monlamUniLoaded",
      "status",
    ]),
  };
  if (object(raw.event))
    record.event = {
      name: text(raw.event.name, 50),
      data: pick(raw.event.data, ["destination", "section", "percent", "theme", "action"]),
    };
  if (Array.isArray(raw.errors))
    record.errors = raw.errors
      .slice(0, 20)
      .filter(object)
      .map((error) => ({
        type: text(error.type, 30),
        message: text(error.message, 300),
        source: text(error.source, 200),
        stack: text(error.stack, 1000),
      }));
  // Legacy snapshots stay distinguishable from pageviews during rolling deploys.
  if (legacy && object(raw.vitals))
    record.vitals = Object.fromEntries(
      Object.entries(raw.vitals)
        .filter(([key]) => ["lcp", "inp", "cls", "fcp", "ttfb"].includes(key))
        .map(([key, value]) => [key, pick(value, ["value", "rating"])])
    );
  return record;
}
function geoFromHeader(value?: string): Data | undefined {
  try {
    const raw = JSON.parse(
      value?.startsWith("{") ? value : Buffer.from(value || "", "base64").toString()
    );
    if (!object(raw)) return undefined;
    return {
      country: pick(raw.country, ["code", "name"]),
      subdivision: pick(raw.subdivision, ["code", "name"]),
      city: text(raw.city, 80),
    };
  } catch {
    return undefined;
  }
}
export const handler: Handler = async (event) => {
  const origin = event.headers.origin;
  const host = event.headers.host;
  if (
    origin &&
    origin !== "https://jonang.in" &&
    origin !== `https://${host}` &&
    origin !== `http://${host}`
  )
    return { statusCode: 403, body: "" };
  const headers = {
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": origin || "https://jonang.in",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
  const response = (statusCode: number) => ({ statusCode, headers, body: "" });
  if (event.httpMethod === "OPTIONS") return response(204);
  if (event.httpMethod !== "POST") return response(405);
  if (!event.body) return response(400);
  if (event.body.length > 90_000) return response(413);
  const body = event.isBase64Encoded
    ? Buffer.from(event.body, "base64").toString("utf8")
    : event.body;
  if (Buffer.byteLength(body) > 65_536) return response(413);
  let input: unknown;
  try {
    input = JSON.parse(body);
  } catch {
    return response(400);
  }
  const rawRecords = object(input) && Array.isArray(input.records) ? input.records : [input];
  if (!rawRecords.length || rawRecords.length > 20) return response(400);
  const records = rawRecords.map(normalizeRecord);
  if (records.some((record) => !record)) return response(400);
  let edgeGeo: string | undefined;
  let edgeIp: string | undefined;
  try {
    const context = getContext();
    edgeGeo = JSON.stringify(context.geo);
    edgeIp = context.ip;
  } catch {
    /* Local and legacy runtimes may only supply headers. */
  }
  const secret = process.env.TELEMETRY_SALT;
  const ip = edgeIp || event.headers["client-ip"] || event.headers["x-nf-client-connection-ip"];
  const visitor =
    secret && ip
      ? createHash("sha256")
          .update(`${ip}:${new Date().toISOString().slice(0, 10)}:${secret}`)
          .digest("hex")
          .slice(0, 16)
      : undefined;
  const enriched = records.map<Data>((record) => ({
    ...record,
    timestamp: new Date().toISOString(),
    site: "jonang.in",
    release: process.env.COMMIT_REF?.slice(0, 7) || process.env.DEPLOY_ID || "dev",
    visitor,
    geo: geoFromHeader(edgeGeo || event.headers["x-nf-geo"]),
  }));
  enriched.forEach((record) => console.log(JSON.stringify(record)));
  const token = process.env.AXIOM_TOKEN;
  const dataset = process.env.AXIOM_DATASET;
  if (token && dataset) {
    try {
      const result = await fetch(
        `https://api.axiom.co/v1/datasets/${encodeURIComponent(dataset)}/ingest`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify(enriched),
          signal: AbortSignal.timeout(3000),
        }
      );
      if (!result.ok) {
        console.error(`[Telemetry] Axiom HTTP ${result.status}`);
        return response(502);
      }
    } catch {
      console.error("[Telemetry] Axiom delivery failed");
      return response(502);
    }
  }
  // Preserve the existing optional alert sink; failures do not discard analytics.
  if (process.env.WEBHOOK_ALERT_URL) {
    const alert = enriched.find(
      (record) =>
        record.kind === "error" ||
        (object(record.fontHealth) && record.fontHealth.status === "degraded")
    );
    if (alert)
      try {
        await fetch(process.env.WEBHOOK_ALERT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            embeds: [
              {
                title: "Jonang site diagnostic",
                description: `Route: ${alert.pathname} · ${alert.kind}`,
                timestamp: alert.timestamp,
              },
            ],
          }),
          signal: AbortSignal.timeout(1500),
        });
      } catch {
        console.error("[Telemetry] Alert delivery failed");
      }
  }
  return response(204);
};
