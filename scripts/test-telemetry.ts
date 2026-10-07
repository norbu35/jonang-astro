import assert from "node:assert/strict";
import { handler, normalizeRecord } from "../netlify/functions/telemetry";
import type { HandlerEvent, HandlerContext } from "@netlify/functions";

const originalFetch = globalThis.fetch;
const originalLog = console.log;
const savedEnv = { ...process.env };
let logs: string[] = [];
const base = {
  schemaVersion: 2,
  kind: "page_view",
  id: "record-1",
  documentId: "doc-1",
  pageViewId: "page-1",
  sessionId: "session-1",
  pathname: "/introduction?secret=hidden",
  timestamp: Date.now(),
  referrer: "https://search.example/search?q=private",
  client: { browser: "Firefox", device: "mobile", language: "bo", rawUserAgent: "discard" },
};
async function call(body: unknown, overrides: Partial<HandlerEvent> = {}) {
  return (await handler(
    {
      httpMethod: "POST",
      headers: {
        host: "jonang.in",
        origin: "https://jonang.in",
        "client-ip": "203.0.113.1",
        "x-nf-geo": JSON.stringify({
          country: { code: "IN" },
          city: "Shimla",
          latitude: 31,
          longitude: 77,
        }),
      },
      body: JSON.stringify(body),
      isBase64Encoded: false,
      ...overrides,
    } as HandlerEvent,
    {} as HandlerContext,
    () => {}
  )) as { statusCode: number };
}
try {
  delete process.env.AXIOM_TOKEN;
  delete process.env.AXIOM_DATASET;
  delete process.env.WEBHOOK_ALERT_URL;
  process.env.TELEMETRY_SALT = "test-only-salt";
  console.log = (...args) => logs.push(args.join(" "));
  assert.equal((await call(null, { httpMethod: "OPTIONS" })).statusCode, 204);
  assert.equal((await call(null, { httpMethod: "GET" })).statusCode, 405);
  for (const invalid of [
    null,
    [],
    "bad",
    {},
    { records: [] },
    { ...base, kind: "unsupported" },
    { ...base, pageViewId: undefined },
  ])
    assert.equal((await call(invalid)).statusCode, 400);
  assert.equal((await call(null, { body: "{" })).statusCode, 400);
  assert.equal((await call(null, { body: "ཨ".repeat(30000) })).statusCode, 413);
  assert.equal((await call({ records: Array(21).fill(base) })).statusCode, 400);
  assert.equal(
    (await call(base, { headers: { host: "jonang.in", origin: "https://unrelated.example" } }))
      .statusCode,
    403
  );
  logs = [];
  assert.equal(
    (
      await call({
        records: [
          base,
          {
            ...base,
            id: "record-2",
            kind: "engagement",
            engagement: {
              engagedMs: 12500,
              maxScrollPercent: 75,
              longTasks: 2,
              totalBlockingMs: 150,
            },
          },
        ],
      })
    ).statusCode,
    204
  );
  assert.equal(logs.length, 2);
  const record = JSON.parse(logs[0]);
  assert.equal(record.pathname, "/introduction");
  assert.equal(record.referrer, "https://search.example");
  assert.equal(record.client.rawUserAgent, undefined);
  assert.equal(record.geo.latitude, undefined);
  assert.equal(record.geo.country.code, "IN");
  assert.ok(record.visitor);
  assert.ok(!logs.join("").includes("203.0.113.1"));
  assert.ok(!logs.join("").includes("private"));
  const error = normalizeRecord({
    ...base,
    kind: "error",
    errors: [
      {
        type: "runtime",
        message: "person@example.com https://example.com/file?token=secret",
        stack: "x".repeat(3000),
      },
    ],
  });
  assert.ok(!JSON.stringify(error).includes("person@example.com"));
  assert.ok(!JSON.stringify(error).includes("token=secret"));
  assert.equal((error?.errors as Array<{ stack: string }>)[0].stack.length, 1000);
  assert.equal(normalizeRecord({ sessionId: "old", pathname: "/" })?.kind, "legacy_snapshot");
  delete process.env.TELEMETRY_SALT;
  logs = [];
  await call(base);
  assert.equal(JSON.parse(logs[0]).visitor, undefined);
  assert.equal(
    (
      await call(null, {
        body: Buffer.from(JSON.stringify(base)).toString("base64"),
        isBase64Encoded: true,
      })
    ).statusCode,
    204
  );
  process.env.AXIOM_TOKEN = "test-token";
  process.env.AXIOM_DATASET = "test-dataset";
  let sent: unknown;
  globalThis.fetch = async (_url, options) => {
    sent = JSON.parse(options?.body as string);
    return new Response("", { status: 200 });
  };
  assert.equal((await call(base)).statusCode, 204);
  assert.equal((sent as Array<{ id: string }>)[0].id, "record-1");
  globalThis.fetch = async () => new Response("", { status: 429 });
  assert.equal((await call(base)).statusCode, 502);
  globalThis.fetch = async () => {
    throw new Error("offline");
  };
  assert.equal((await call(base)).statusCode, 502);
} finally {
  console.log = originalLog;
  globalThis.fetch = originalFetch;
  for (const key of ["AXIOM_TOKEN", "AXIOM_DATASET", "WEBHOOK_ALERT_URL", "TELEMETRY_SALT"]) {
    if (savedEnv[key] === undefined) delete process.env[key];
    else process.env[key] = savedEnv[key];
  }
}
console.log(
  "Telemetry server checks passed: validation, batches, redaction, legacy records, geography and sink failures."
);
