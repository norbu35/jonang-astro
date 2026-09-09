import { handler } from "../netlify/functions/telemetry.ts";
import assert from "node:assert";

async function runTests() {
  console.log("▶ Starting Netlify Telemetry Function Automated Verification...\n");

  const mockContext: any = {
    callbackWaitsForEmptyEventLoop: false,
    functionName: "telemetry",
    functionVersion: "1",
    invokedFunctionArn: "arn",
    memoryLimitInMB: "128",
    awsRequestId: "test-req",
    logGroupName: "log",
    logStreamName: "stream",
    getRemainingTimeInMillis: () => 5000,
    done: () => {},
    fail: () => {},
    succeed: () => {},
  };

  // Test 1: CORS Preflight (OPTIONS)
  console.log("  [Test 1] CORS preflight OPTIONS request returns 204 with required headers");
  const optionsRes = await (handler as any)(
    {
      httpMethod: "OPTIONS",
      headers: {},
      body: "",
      isBase64Encoded: false,
    },
    mockContext
  );
  assert.strictEqual(optionsRes.statusCode, 204);
  assert.strictEqual(optionsRes.headers["Access-Control-Allow-Origin"], "*");
  assert.ok(optionsRes.headers["Access-Control-Allow-Methods"].includes("POST"));
  console.log("  ✓ Test 1 passed.\n");

  // Test 2: Method Not Allowed (GET)
  console.log("  [Test 2] GET request is rejected with 405 Method Not Allowed");
  const getRes = await (handler as any)(
    {
      httpMethod: "GET",
      headers: {},
      body: "",
      isBase64Encoded: false,
    },
    mockContext
  );
  assert.strictEqual(getRes.statusCode, 405);
  console.log("  ✓ Test 2 passed.\n");

  // Test 3: Empty Payload Validation
  console.log("  [Test 3] Empty POST body is rejected with 400 Bad Request");
  const emptyRes = await (handler as any)(
    {
      httpMethod: "POST",
      headers: {},
      body: "",
      isBase64Encoded: false,
    },
    mockContext
  );
  assert.strictEqual(emptyRes.statusCode, 400);
  console.log("  ✓ Test 3 passed.\n");

  // Test 4: Oversized Payload Guard (>64KB)
  console.log("  [Test 4] Payload exceeding 64KB is rejected with 413 Payload Too Large");
  const largeBody = "x".repeat(70000);
  const largeRes = await (handler as any)(
    {
      httpMethod: "POST",
      headers: {},
      body: largeBody,
      isBase64Encoded: false,
    },
    mockContext
  );
  assert.strictEqual(largeRes.statusCode, 413);
  console.log("  ✓ Test 4 passed.\n");

  // Test 5: Valid Telemetry Payload with Netlify Edge Geo & Web Vitals
  console.log("  [Test 5] Valid Web Vitals beacon parses, enriches Netlify geo, hashes IP, and logs structured JSON");
  const validPayload = {
    sessionId: "sid_test_12345",
    timestamp: Date.now(),
    url: "https://jonang.in/kalachakra",
    pathname: "/kalachakra",
    referrer: "https://google.com",
    vitals: {
      lcp: { value: 1200, rating: "good", element: "h1.kalachakra-title" },
      inp: { value: 45, rating: "good", target: "button.play-audio" },
      cls: { value: 0.012, rating: "good" },
      fcp: { value: 850, rating: "good" },
      ttfb: { value: 120, rating: "good" },
    },
    navigation: {
      dnsTime: 15,
      tcpTime: 25,
      tlsTime: 30,
      domInteractive: 950,
      domComplete: 1400,
      loadTime: 1450,
      effectiveType: "4g",
      downlink: 10,
      rtt: 50,
    },
    fontHealth: {
      notoSerifTibetanLoaded: true,
      jomolhariLoaded: true,
      monlamUniLoaded: true,
      status: "ok",
    },
    events: [{ name: "mantra_audio_start", timestamp: Date.now() }],
  };

  const netlifyGeoHeader = Buffer.from(
    JSON.stringify({
      country: { code: "IN", name: "India" },
      subdivision: { code: "HP", name: "Himachal Pradesh" },
      city: "Shimla",
      timezone: "Asia/Kolkata",
      latitude: 31.1048,
      longitude: 77.1734,
    })
  ).toString("base64");

  // Intercept stdout to inspect emitted structured JSON
  let capturedLog = "";
  const originalLog = console.log;
  console.log = (msg: string) => {
    capturedLog += msg + "\n";
  };

  const postRes = await (handler as any)(
    {
      httpMethod: "POST",
      headers: {
        "content-type": "application/json",
        "client-ip": "203.0.113.195",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
        "x-nf-geo": netlifyGeoHeader,
      },
      body: JSON.stringify(validPayload),
      isBase64Encoded: false,
    },
    mockContext
  );

  console.log = originalLog;

  assert.strictEqual(postRes.statusCode, 204);
  assert.strictEqual(postRes.headers["Access-Control-Allow-Origin"], "*");
  assert.ok(capturedLog.length > 0, "Expected structured log output to stdout");

  const parsedLog = JSON.parse(capturedLog.trim());
  assert.strictEqual(parsedLog.schema_version, "1.0");
  assert.strictEqual(parsedLog.level, "info");
  assert.strictEqual(parsedLog.pathname, "/kalachakra");
  assert.strictEqual(parsedLog.vitals.lcp.rating, "good");
  assert.strictEqual(parsedLog.fontHealth.status, "ok");
  assert.strictEqual(parsedLog.geo.city, "Shimla");
  assert.strictEqual(parsedLog.geo.country.code, "IN");
  assert.ok(parsedLog.visitor, "Visitor hash must be generated");
  assert.notStrictEqual(parsedLog.visitor, "203.0.113.195", "Raw IP must never be logged");
  console.log("  ✓ Test 5 passed. Structured log record validated.\n");

  // Test 6: Error payload escalates severity level to 'error'
  console.log("  [Test 6] Client exception with breadcrumbs escalates severity to 'error'");
  const errorPayload = {
    sessionId: "sid_test_err_999",
    timestamp: Date.now(),
    url: "https://jonang.in/monastery",
    pathname: "/monastery",
    errors: [
      {
        message: "ReferenceError: window.webVitals is not defined",
        stack: "ReferenceError: window.webVitals is not defined\n    at init (script.js:42:10)",
        type: "runtime",
        breadcrumbs: [
          { timestamp: Date.now() - 500, category: "ui", message: "click button#donate-now" },
          { timestamp: Date.now() - 100, category: "navigation", message: "Navigated to /monastery" },
        ],
      },
    ],
  };

  capturedLog = "";
  console.log = (msg: string) => {
    capturedLog += msg + "\n";
  };

  const errRes = await (handler as any)(
    {
      httpMethod: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(errorPayload),
      isBase64Encoded: false,
    },
    mockContext
  );

  console.log = originalLog;

  assert.strictEqual(errRes.statusCode, 204);
  const parsedErrLog = JSON.parse(capturedLog.trim());
  assert.strictEqual(parsedErrLog.level, "error");
  assert.strictEqual(parsedErrLog.errors.length, 1);
  assert.strictEqual(parsedErrLog.errors[0].breadcrumbs.length, 2);
  console.log("  ✓ Test 6 passed. Error breadcrumbs and escalation validated.\n");

  // Test 7: Font degradation escalates severity level to 'warn'
  console.log("  [Test 7] Tibetan font degradation escalates severity to 'warn'");
  const fontDegradedPayload = {
    sessionId: "sid_font_deg",
    timestamp: Date.now(),
    url: "https://jonang.in/doctrine",
    pathname: "/doctrine",
    fontHealth: {
      notoSerifTibetanLoaded: false,
      jomolhariLoaded: false,
      monlamUniLoaded: false,
      status: "degraded",
    },
  };

  capturedLog = "";
  console.log = (msg: string) => {
    capturedLog += msg + "\n";
  };

  const fontRes = await (handler as any)(
    {
      httpMethod: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(fontDegradedPayload),
      isBase64Encoded: false,
    },
    mockContext
  );

  console.log = originalLog;

  assert.strictEqual(fontRes.statusCode, 204);
  const parsedFontLog = JSON.parse(capturedLog.trim());
  assert.strictEqual(parsedFontLog.level, "warn");
  assert.strictEqual(parsedFontLog.fontHealth.status, "degraded");
  console.log("  ✓ Test 7 passed. Font degradation warning validated.\n");

  console.log("🎉 All 7 automated telemetry tests passed successfully!\n");
}

runTests().catch((err) => {
  console.error("❌ Test verification failed:", err);
  process.exit(1);
});
