/**
 * Real User Monitoring (RUM) Core Web Vitals and Navigation Timing Engine.
 * Uses standards-compliant PerformanceObserver APIs with zero third-party overhead.
 */

export interface MetricRating {
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  element?: string;
  target?: string;
}

export interface VitalsSnapshot {
  lcp?: MetricRating;
  inp?: MetricRating;
  cls?: MetricRating;
  fcp?: MetricRating;
  ttfb?: MetricRating;
}

export interface NavigationTimingSnapshot {
  dnsTime?: number;
  tcpTime?: number;
  tlsTime?: number;
  domInteractive?: number;
  domComplete?: number;
  loadTime?: number;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
}

function getRating(
  metric: "lcp" | "inp" | "cls" | "fcp" | "ttfb",
  value: number
): "good" | "needs-improvement" | "poor" {
  switch (metric) {
    case "lcp":
      return value <= 2500 ? "good" : value <= 4000 ? "needs-improvement" : "poor";
    case "inp":
      return value <= 200 ? "good" : value <= 500 ? "needs-improvement" : "poor";
    case "cls":
      return value <= 0.1 ? "good" : value <= 0.25 ? "needs-improvement" : "poor";
    case "fcp":
      return value <= 1800 ? "good" : value <= 3000 ? "needs-improvement" : "poor";
    case "ttfb":
      return value <= 800 ? "good" : value <= 1800 ? "needs-improvement" : "poor";
  }
}

function getElementSelector(node?: Node | null): string | undefined {
  if (!node || !(node instanceof Element)) return undefined;
  const tag = node.tagName.toLowerCase();
  const id = node.id ? `#${node.id}` : "";
  const className =
    typeof node.className === "string" && node.className.trim()
      ? `.${node.className.trim().split(/\s+/).slice(0, 2).join(".")}`
      : "";
  return `${tag}${id}${className}`;
}

export class VitalsCollector {
  private vitals: VitalsSnapshot = {};
  private clsValue = 0;
  private maxInpDuration = 0;
  private onChangeCallback: (vitals: VitalsSnapshot, nav: NavigationTimingSnapshot) => void;

  constructor(onChange: (vitals: VitalsSnapshot, nav: NavigationTimingSnapshot) => void) {
    this.onChangeCallback = onChange;
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      this.initObservers();
    }
  }

  private initObservers(): void {
    // 1. TTFB and Navigation Performance
    try {
      const navEntries = performance.getEntriesByType(
        "navigation"
      ) as PerformanceNavigationTiming[];
      if (navEntries && navEntries.length > 0) {
        const nav = navEntries[0];
        const ttfbValue = Math.round(nav.responseStart);
        this.vitals.ttfb = {
          value: ttfbValue,
          rating: getRating("ttfb", ttfbValue),
        };
      }
    } catch {}

    // 2. First Contentful Paint (FCP)
    try {
      const fcpObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === "first-contentful-paint") {
            const val = Math.round(entry.startTime);
            this.vitals.fcp = {
              value: val,
              rating: getRating("fcp", val),
            };
            this.notify();
            fcpObserver.disconnect();
          }
        }
      });
      fcpObserver.observe({ type: "paint", buffered: true });
    } catch {}

    // 3. Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        if (lastEntry) {
          const val = Math.round(lastEntry.startTime);
          this.vitals.lcp = {
            value: val,
            rating: getRating("lcp", val),
            element: getElementSelector(lastEntry.element),
          };
          this.notify();
        }
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {}

    // 4. Cumulative Layout Shift (CLS)
    try {
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as any[]) {
          // Ignore shifts within 500ms of user interaction
          if (!entry.hadRecentInput) {
            this.clsValue += entry.value;
            const roundedCls = Number(this.clsValue.toFixed(4));
            this.vitals.cls = {
              value: roundedCls,
              rating: getRating("cls", roundedCls),
            };
            this.notify();
          }
        }
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
    } catch {}

    // 5. Interaction to Next Paint (INP)
    try {
      const inpObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as any[]) {
          if (entry.duration && entry.duration > this.maxInpDuration) {
            this.maxInpDuration = entry.duration;
            const roundedInp = Math.round(entry.duration);
            this.vitals.inp = {
              value: roundedInp,
              rating: getRating("inp", roundedInp),
              target: getElementSelector(entry.target),
            };
            this.notify();
          }
        }
      });
      // Observe interaction events
      inpObserver.observe({ type: "event", durationThreshold: 40, buffered: true } as any);
    } catch {}
  }

  public getNavigationMetrics(): NavigationTimingSnapshot {
    const metrics: NavigationTimingSnapshot = {};
    try {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      if (nav) {
        if (nav.domainLookupEnd && nav.domainLookupStart) {
          metrics.dnsTime = Math.round(nav.domainLookupEnd - nav.domainLookupStart);
        }
        if (nav.connectEnd && nav.connectStart) {
          metrics.tcpTime = Math.round(nav.connectEnd - nav.connectStart);
        }
        if (nav.secureConnectionStart && nav.connectEnd) {
          metrics.tlsTime = Math.round(nav.connectEnd - nav.secureConnectionStart);
        }
        if (nav.domInteractive) {
          metrics.domInteractive = Math.round(nav.domInteractive);
        }
        if (nav.domComplete) {
          metrics.domComplete = Math.round(nav.domComplete);
        }
        if (nav.loadEventEnd) {
          metrics.loadTime = Math.round(nav.loadEventEnd);
        }
      }

      // Network information
      const navAny = navigator as any;
      if (navAny.connection) {
        metrics.effectiveType = navAny.connection.effectiveType;
        metrics.downlink = navAny.connection.downlink;
        metrics.rtt = navAny.connection.rtt;
      }
    } catch {}
    return metrics;
  }

  private notify(): void {
    this.onChangeCallback(this.vitals, this.getNavigationMetrics());
  }

  public getSnapshot(): { vitals: VitalsSnapshot; navigation: NavigationTimingSnapshot } {
    return {
      vitals: { ...this.vitals },
      navigation: this.getNavigationMetrics(),
    };
  }
}
