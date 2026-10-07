/** Anonymous visit and engagement measurements; no text capture or persistent visitor cookie. */
import { flushTelemetry, getSessionId, newId, queueTelemetry } from "./transport";
import { collectVitals } from "./vitals";
import { ErrorTracker } from "./errors";

let initialized = false;
let pageViewId = "";
let pathname = "";
let documentId = "";
let documentPath = "";
let visibleSince = 0;
let engagedMs = 0;
let lastActivity = 0;
let maxDepth = 0;
let longTasks = 0;
let totalBlockingMs = 0;
let scrollTimer: ReturnType<typeof setTimeout> | undefined;
let lastEngagement = "";
const thresholds = new Set<number>();
let tracker: ErrorTracker;
let previousErrorCount = 0;

function cleanReferrer(value: string): string {
  try {
    const url = new URL(value);
    return url.origin === location.origin ? url.pathname : url.origin;
  } catch {
    return "";
  }
}
function common() {
  return {
    schemaVersion: 2,
    automated: navigator.webdriver,
    sessionId: getSessionId(),
    pageViewId,
    documentId,
    pathname,
  };
}
function record(kind: string, data: Record<string, unknown> = {}) {
  queueTelemetry({ ...common(), kind, ...data });
}
export function trackEvent(name: string, data: Record<string, unknown> = {}): void {
  if (!initialized || !/^[a-z][a-z0-9_]{0,49}$/.test(name)) return;
  const allowed: Record<string, unknown> = {};
  for (const key of ["destination", "section", "percent", "theme", "action"]) {
    const value = data[key];
    if (typeof value === "number" && Number.isFinite(value)) allowed[key] = value;
    else if (typeof value === "string") allowed[key] = value.replace(/[?#].*$/, "").slice(0, 160);
  }
  record("event", { event: { name, data: allowed } });
}
function updateEngagement() {
  const now = performance.now();
  if (visibleSince) engagedMs += Math.max(0, Math.min(now, lastActivity + 30_000) - visibleSince);
  visibleSince = document.visibilityState === "visible" ? now : 0;
}
function engagement() {
  measureDepth();
  updateEngagement();
  const data = {
    engagedMs: Math.round(engagedMs),
    maxScrollPercent: maxDepth,
    longTasks,
    totalBlockingMs: Math.round(totalBlockingMs),
  };
  const signature = JSON.stringify(data);
  if (signature !== lastEngagement) {
    record("engagement", { engagement: data });
    lastEngagement = signature;
  }
}
function measureDepth() {
  if (scrollTimer) clearTimeout(scrollTimer);
  scrollTimer = undefined;
  const height = document.documentElement.scrollHeight - innerHeight;
  maxDepth = Math.max(
    maxDepth,
    Math.min(100, Math.round(height <= 0 ? 100 : (scrollY / height) * 100))
  );
  for (const percent of [25, 50, 75, 100])
    if (maxDepth >= percent && !thresholds.has(percent)) {
      thresholds.add(percent);
      trackEvent("scroll_depth", { percent });
    }
}
function startPage() {
  if (pageViewId && pathname === location.pathname) return;
  const referrer = pageViewId ? pathname : cleanReferrer(document.referrer);
  pathname = location.pathname;
  pageViewId = newId();
  engagedMs = 0;
  maxDepth = 0;
  longTasks = 0;
  totalBlockingMs = 0;
  lastEngagement = "";
  thresholds.clear();
  lastActivity = performance.now();
  visibleSince = document.visibilityState === "visible" ? lastActivity : 0;
  const params = new URLSearchParams(location.search);
  const campaign: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign"]) {
    const value = params.get(key);
    if (value && /^[\w .-]{1,80}$/.test(value)) campaign[key] = value;
  }
  const ua = navigator.userAgent;
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /Firefox\//.test(ua)
      ? "Firefox"
      : /Chrome\//.test(ua)
        ? "Chrome"
        : /Safari\//.test(ua)
          ? "Safari"
          : "Other";
  record("page_view", {
    referrer,
    campaign,
    client: {
      device: /Mobi|Android/i.test(ua) ? "mobile" : "desktop",
      browser,
      language: navigator.language.slice(0, 20),
      viewport: innerWidth < 600 ? "small" : innerWidth < 1024 ? "medium" : "large",
      automated: navigator.webdriver,
    },
  });
  tracker?.checkTibetanFontHealth();
}
export function initTelemetry() {
  if (initialized || import.meta.env.DEV || import.meta.env.PUBLIC_TELEMETRY_ENABLED === "false")
    return;
  if (
    navigator.doNotTrack === "1" ||
    (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl
  )
    return;
  initialized = true;
  documentId = newId();
  documentPath = location.pathname;
  startPage();
  tracker = new ErrorTracker((errors, fontHealth) => {
    for (const error of errors.slice(previousErrorCount)) {
      const clean = (value: unknown, limit: number) =>
        typeof value === "string"
          ? value
              .replace(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi, "[email]")
              .replace(/(https?:\/\/[^\s?#]+)[?#][^\s]*/g, "$1")
              .slice(0, limit)
          : undefined;
      record("error", {
        errors: [
          {
            type: error.type,
            message: clean(error.message, 300),
            source: clean(error.source, 200),
            stack: clean(error.stack, 1000),
          },
        ],
      });
    }
    previousErrorCount = errors.length;
    record("font_health", { fontHealth });
  });
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (document.visibilityState === "visible") {
          longTasks++;
          totalBlockingMs += Math.max(0, entry.duration - 50);
        }
      }
    });
    observer.observe({ type: "longtask" });
  } catch {
    /* Unsupported browsers omit main-thread diagnostics. */
  }
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      documentId = newId();
      documentPath = location.pathname;
      pageViewId = "";
      startPage();
    }
  });
  collectVitals((metric) =>
    queueTelemetry({
      ...common(),
      pathname: documentPath,
      pageViewId: undefined,
      kind: "vital",
      metric,
    })
  );
  document.addEventListener("astro:before-swap", () => {
    engagement();
    void flushTelemetry();
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = undefined;
  });
  document.addEventListener("astro:page-load", startPage);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      engagement();
      void flushTelemetry(true);
    } else {
      lastActivity = performance.now();
      visibleSince = lastActivity;
    }
  });
  window.addEventListener("pagehide", () => {
    engagement();
    void flushTelemetry(true);
  });

  const activity = () => {
    updateEngagement();
    lastActivity = performance.now();
  };
  document.addEventListener("pointerdown", activity, { passive: true });
  document.addEventListener("keydown", activity, { passive: true });
  window.addEventListener(
    "scroll",
    () => {
      lastActivity = performance.now();
      if (!scrollTimer) scrollTimer = setTimeout(measureDepth, 250);
    },
    { passive: true }
  );
  setInterval(() => {
    if (document.visibilityState === "visible") engagement();
  }, 15_000);
  document.addEventListener("click", (event) => {
    const link =
      event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
    if (!link) return;
    const target = new URL(link.href, location.href);
    const section =
      link.closest("section")?.id ||
      (link.closest("header") ? "header" : link.closest("footer") ? "footer" : "content");
    if (["mailto:", "tel:"].includes(target.protocol))
      trackEvent("contact_click", { action: target.protocol.slice(0, -1), section });
    else if (target.origin !== location.origin && ["http:", "https:"].includes(target.protocol))
      trackEvent("outbound_click", { destination: target.origin, section });
    else if (target.origin === location.origin)
      trackEvent(target.pathname === "/donate" ? "support_click" : "navigation_click", {
        destination: target.pathname,
        section,
      });
  });
  window.addEventListener("theme-change", (event) =>
    trackEvent("theme_change", { theme: (event as CustomEvent).detail?.theme })
  );
  (window as Window & { __jonangTelemetry?: unknown }).__jonangTelemetry = {
    trackEvent,
    getSessionId,
  };
}
if (typeof window !== "undefined") initTelemetry();
