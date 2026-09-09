/**
 * Master Telemetry & Observability Initializer for Jonang Astro.
 * Integrates Web Vitals, Error Tracking, Tibetan Font Health, and Transport.
 */

import { getSessionId, queueTelemetry } from "./transport";
import { VitalsCollector, type VitalsSnapshot, type NavigationTimingSnapshot } from "./vitals";
import { ErrorTracker, type CapturedError, type FontHealthStatus } from "./errors";

interface TelemetryState {
  sessionId: string;
  vitals?: VitalsSnapshot;
  navigation?: NavigationTimingSnapshot;
  errors: CapturedError[];
  fontHealth?: FontHealthStatus;
  events: Array<{ name: string; timestamp: number; data?: Record<string, unknown> }>;
}

let isInitialized = false;
let state: TelemetryState;
let vitalsCollector: VitalsCollector | null = null;
let errorTracker: ErrorTracker | null = null;

function syncAndFlush(immediate = false): void {
  queueTelemetry(
    {
      sessionId: state.sessionId,
      vitals: state.vitals,
      navigation: state.navigation,
      errors: state.errors,
      fontHealth: state.fontHealth,
      events: state.events,
    },
    immediate
  );
}

export function trackEvent(name: string, data?: Record<string, unknown>): void {
  if (!state) return;
  state.events.push({
    name,
    timestamp: Date.now(),
    data,
  });
  syncAndFlush(false);
}

export function initTelemetry(): void {
  if (typeof window === "undefined" || isInitialized) return;
  isInitialized = true;

  state = {
    sessionId: getSessionId(),
    errors: [],
    events: [],
  };

  // 1. Initialize Error Tracking & Font Health
  errorTracker = new ErrorTracker((errors, fontHealth) => {
    state.errors = errors;
    state.fontHealth = fontHealth;
    // Errors warrant immediate dispatch
    syncAndFlush(errors.length > 0);
  });

  // 2. Initialize Core Web Vitals Collector
  vitalsCollector = new VitalsCollector((vitals, navigation) => {
    state.vitals = vitals;
    state.navigation = navigation;
    syncAndFlush(false);
  });

  // 3. Track Route Transitions (Astro View Transitions / Page Navigations)
  document.addEventListener("astro:page-load", () => {
    if (errorTracker) {
      errorTracker.addBreadcrumb("navigation", `Navigated to ${window.location.pathname}`);
      errorTracker.checkTibetanFontHealth();
    }
    if (vitalsCollector) {
      const snap = vitalsCollector.getSnapshot();
      state.vitals = snap.vitals;
      state.navigation = snap.navigation;
    }
    syncAndFlush(false);
  });

  // 4. Expose Global Helper for Interactive Components (e.g. Preact Donation or Audio player)
  (window as any).__jonangTelemetry = {
    trackEvent,
    getSessionId: () => state.sessionId,
  };

  // 5. Initial snapshot queue
  syncAndFlush(false);
}

// Auto-initialize when loaded in browser
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTelemetry);
  } else {
    initTelemetry();
  }
}
