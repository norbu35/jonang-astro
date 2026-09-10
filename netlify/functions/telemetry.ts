import type { Handler, HandlerEvent, HandlerContext, HandlerResponse } from "@netlify/functions";
import { createHash } from "node:crypto";

interface TelemetryMetric {
  value: number;
  rating?: "good" | "needs-improvement" | "poor";
  element?: string;
  target?: string;
}

interface TelemetryError {
  message: string;
  stack?: string;
  source?: string;
  lineno?: number;
  colno?: number;
  type: "runtime" | "unhandledrejection" | "resource" | "font";
  breadcrumbs?: Array<{
    timestamp: number;
    category: string;
    message: string;
    data?: Record<string, unknown>;
  }>;
}

interface TelemetryPayload {
  sessionId: string;
  timestamp: number;
  url: string;
  pathname: string;
  referrer?: string;
  vitals?: {
    lcp?: TelemetryMetric;
    inp?: TelemetryMetric;
    cls?: TelemetryMetric;
    fcp?: TelemetryMetric;
    ttfb?: TelemetryMetric;
  };
  navigation?: {
    dnsTime?: number;
    tcpTime?: number;
    tlsTime?: number;
    domInteractive?: number;
    domComplete?: number;
    loadTime?: number;
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
  };
  errors?: TelemetryError[];
  fontHealth?: {
    notoSerifTibetanLoaded: boolean;
    jomolhariLoaded: boolean;
    monlamUniLoaded: boolean;
    status: "ok" | "degraded";
  };
  events?: Array<{
    name: string;
    timestamp: number;
    data?: Record<string, unknown>;
  }>;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store, no-cache, must-revalidate",
};

/**
 * Anonymize client IP using daily rotating salt for strict GDPR/CCPA compliance.
 */
function hashClientIdentifier(ip: string, userAgent: string): string {
  const dateBucket = new Date().toISOString().slice(0, 10);
  const secret = process.env.TELEMETRY_SALT || "jonang-telemetry-default-salt";
  return createHash("sha256")
    .update(`${ip}:${userAgent}:${dateBucket}:${secret}`)
    .digest("hex")
    .slice(0, 16);
}

/**
 * Safely parse Netlify's x-nf-geo header if present.
 */
function parseNetlifyGeo(rawGeo?: string): Record<string, unknown> | null {
  if (!rawGeo) return null;
  try {
    if (rawGeo.startsWith("{")) {
      return JSON.parse(rawGeo);
    }
    const decoded = Buffer.from(rawGeo, "base64").toString("utf8");
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

/**
 * Optional async dispatch to Axiom (Generous free tier: 500GB/month).
 */
async function forwardToAxiom(enrichedRecord: Record<string, unknown>): Promise<void> {
  const token = process.env.AXIOM_TOKEN;
  const dataset = process.env.AXIOM_DATASET;
  if (!token || !dataset) return;

  try {
    await fetch(`https://api.axiom.co/v1/datasets/${dataset}/ingest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([enrichedRecord]),
      signal: AbortSignal.timeout(1500),
    });
  } catch (err) {
    console.error("[Telemetry] Failed to forward to Axiom:", err);
  }
}

/**
 * Optional async webhook dispatch for critical client-side crashes or font degradation.
 */
async function dispatchWebhookAlert(enrichedRecord: Record<string, unknown>): Promise<void> {
  const webhookUrl = process.env.WEBHOOK_ALERT_URL;
  if (!webhookUrl) return;

  const errors = (enrichedRecord.errors as TelemetryError[]) || [];
  const fontHealth = enrichedRecord.fontHealth as { status: string } | undefined;

  const hasCriticalErrors = errors.length > 0;
  const hasFontDegradation = fontHealth && fontHealth.status === "degraded";

  if (!hasCriticalErrors && !hasFontDegradation) return;

  try {
    const title = hasCriticalErrors
      ? `🚨 [Client Exception] ${errors[0]?.message?.slice(0, 100) || "Unknown Error"}`
      : `⚠️ [Tibetan Font Degradation] Sacred script failed to render`;

    const description = hasCriticalErrors
      ? `**Route:** \`${enrichedRecord.pathname}\`\n**Type:** \`${errors[0]?.type}\`\n**Stack:**\`\`\`\n${errors[0]?.stack?.slice(0, 400) || "No stack"}\`\`\``
      : `**Route:** \`${enrichedRecord.pathname}\`\nTibetan typefaces failed to load, falling back to system serif.`;

    const payload = {
      embeds: [
        {
          title,
          description,
          color: hasCriticalErrors ? 0x992224 : 0xfdbc2d, // Sangha Crimson or Sacred Gold
          fields: [
            { name: "Session", value: String(enrichedRecord.session || "N/A"), inline: true },
            {
              name: "Country",
              value: String((enrichedRecord.geo as any)?.country?.code || "N/A"),
              inline: true,
            },
            { name: "Release", value: String(enrichedRecord.release || "N/A"), inline: true },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(1500),
    });
  } catch (err) {
    console.error("[Telemetry] Webhook alert dispatch failed:", err);
  }
}

export const handler: Handler = async (
  event: HandlerEvent,
  _context: HandlerContext
): Promise<HandlerResponse> => {
  // 1. Preflight CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: "",
    };
  }

  // 2. Enforce POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // 3. Size and content validation
  if (!event.body) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Empty payload" }),
    };
  }

  // 64 KB limit to prevent abuse
  if (event.body.length > 65536) {
    return {
      statusCode: 413,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Payload Too Large" }),
    };
  }

  let payload: TelemetryPayload;
  try {
    const rawContent = event.isBase64Encoded
      ? Buffer.from(event.body, "base64").toString("utf8")
      : event.body;
    payload = JSON.parse(rawContent);
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Invalid JSON" }),
    };
  }

  // 4. Extract Edge Metadata
  const headers = event.headers || {};
  const rawIp = headers["client-ip"] || headers["x-forwarded-for"] || "127.0.0.1";
  const userAgent = headers["user-agent"] || "unknown";
  const anonymizedHash = hashClientIdentifier(rawIp.split(",")[0].trim(), userAgent);
  const geo = parseNetlifyGeo(headers["x-nf-geo"]);
  const release = process.env.COMMIT_REF?.slice(0, 7) || process.env.DEPLOY_ID || "dev";

  // Determine severity level
  let level: "info" | "warn" | "error" = "info";
  if (payload.errors && payload.errors.length > 0) {
    level = "error";
  } else if (
    payload.fontHealth?.status === "degraded" ||
    payload.vitals?.lcp?.rating === "poor" ||
    payload.vitals?.inp?.rating === "poor"
  ) {
    level = "warn";
  }

  const enrichedRecord = {
    schema_version: "1.0",
    timestamp: new Date().toISOString(),
    level,
    release,
    site: "jonang.in",
    visitor: anonymizedHash,
    session: payload.sessionId,
    url: payload.url,
    pathname: payload.pathname,
    referrer: payload.referrer || headers["referer"] || null,
    geo,
    vitals: payload.vitals || null,
    navigation: payload.navigation || null,
    errors: payload.errors || [],
    fontHealth: payload.fontHealth || null,
    customEvents: payload.events || [],
  };

  // 5. Output Canonical Structured JSON to stdout
  // Streams directly to Netlify CLI (netlify logs:listen) and Netlify Function Console
  console.log(JSON.stringify(enrichedRecord));

  // 6. Asynchronously trigger external sinks
  const sinkPromises = [forwardToAxiom(enrichedRecord), dispatchWebhookAlert(enrichedRecord)];
  await Promise.allSettled(sinkPromises);

  // 7. Return 204 No Content
  return {
    statusCode: 204,
    headers: CORS_HEADERS,
    body: "",
  };
};
