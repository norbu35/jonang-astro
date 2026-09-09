/**
 * Reliable full-session telemetry transport.
 * Implements modern web guidance: uses fetchLater() where available (Chrome 135+),
 * falling back to fetch() with keepalive or navigator.sendBeacon().
 */

const ENDPOINT = "/api/telemetry";

// In-memory telemetry buffer for the current page session
let activePayload: Record<string, unknown> = {};
let abortController: AbortController | null = null;
let isUnloading = false;

/**
 * Retrieve or generate an ephemeral session ID stored in sessionStorage.
 * This is zero-PII and expires when the browser tab is closed.
 */
export function getSessionId(): string {
  try {
    const KEY = "jonang_telemetry_sid";
    let sid = sessionStorage.getItem(KEY);
    if (!sid) {
      sid = typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : "s_" + Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
      sessionStorage.setItem(KEY, sid);
    }
    return sid;
  } catch {
    return "ephemeral_" + Math.random().toString(36).slice(2, 10);
  }
}

/**
 * Low-level dispatch supporting modern fetchLater API with reliable keepalive fallback.
 */
function sendPayload(payload: Record<string, unknown>, immediate = false): void {
  const body = JSON.stringify(payload);

  // If immediate (e.g., critical error), fire immediately via keepalive fetch
  if (immediate) {
    try {
      if ("fetch" in window) {
        fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true,
        }).catch(() => {});
        return;
      }
    } catch {}
  }

  // Cancel prior pending scheduled request if active
  if (abortController) {
    try {
      abortController.abort();
    } catch {}
  }
  abortController = new AbortController();

  // 1. Modern fetchLater() API (Chrome 135+)
  if (typeof (globalThis as any).fetchLater === "function") {
    try {
      (globalThis as any).fetchLater(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        signal: abortController.signal,
      });
      return;
    } catch {
      // Quota exceeded or fetchLater failed, fall through to fallback
    }
  }

  // 2. Reliable keepalive / sendBeacon fallback on visibility change / unload
  const sendNow = () => {
    if (abortController?.signal.aborted) return;
    try {
      if ("fetch" in window) {
        fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true,
        }).catch(() => {});
      } else if (navigator.sendBeacon) {
        navigator.sendBeacon(ENDPOINT, body);
      }
    } catch {}
  };

  if (document.visibilityState === "hidden" || isUnloading) {
    queueMicrotask(sendNow);
  } else {
    // Schedule flush when tab becomes hidden or closes
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendNow();
        document.removeEventListener("visibilitychange", onVisibilityChange);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange, { once: true });
  }
}

/**
 * Update the active payload and schedule delivery.
 */
export function queueTelemetry(data: Record<string, unknown>, immediate = false): void {
  activePayload = {
    ...activePayload,
    ...data,
    timestamp: Date.now(),
    url: window.location.href,
    pathname: window.location.pathname,
  };

  sendPayload(activePayload, immediate);
}

/**
 * Handle page teardown safely.
 */
if (typeof window !== "undefined") {
  window.addEventListener("pagehide", () => {
    isUnloading = true;
    if (Object.keys(activePayload).length > 0) {
      sendPayload(activePayload, true);
    }
  });
}
