/**
 * Observability, Error Tracking & Tibetan Font Health Engine.
 * Captures unhandled exceptions, resource failures, user action breadcrumbs,
 * and monitors critical typeface rendering.
 */

export interface Breadcrumb {
  timestamp: number;
  category: "ui" | "navigation" | "scroll" | "network" | "console";
  message: string;
  data?: Record<string, unknown>;
}

export interface CapturedError {
  message: string;
  stack?: string;
  source?: string;
  lineno?: number;
  colno?: number;
  type: "runtime" | "unhandledrejection" | "resource" | "font";
  breadcrumbs: Breadcrumb[];
}

export interface FontHealthStatus {
  notoSerifTibetanLoaded: boolean;
  jomolhariLoaded: boolean;
  monlamUniLoaded: boolean;
  status: "ok" | "degraded";
}

const MAX_BREADCRUMBS = 15;

export class ErrorTracker {
  private breadcrumbs: Breadcrumb[] = [];
  private capturedErrors: CapturedError[] = [];
  private fontHealth: FontHealthStatus = {
    notoSerifTibetanLoaded: false,
    jomolhariLoaded: false,
    monlamUniLoaded: false,
    status: "ok",
  };
  private onErrorCallback: (errors: CapturedError[], fontHealth: FontHealthStatus) => void;

  constructor(onError: (errors: CapturedError[], fontHealth: FontHealthStatus) => void) {
    this.onErrorCallback = onError;
    if (typeof window !== "undefined") {
      this.initListeners();
      this.checkTibetanFontHealth();
    }
  }

  public addBreadcrumb(category: Breadcrumb["category"], message: string, data?: Record<string, unknown>): void {
    this.breadcrumbs.push({
      timestamp: Date.now(),
      category,
      message,
      data,
    });
    if (this.breadcrumbs.length > MAX_BREADCRUMBS) {
      this.breadcrumbs.shift();
    }
  }

  private initListeners(): void {
    // 1. Unhandled JavaScript Runtime Errors & Resource Load Errors
    window.addEventListener(
      "error",
      (event: ErrorEvent) => {
        // Distinguish resource load failure (<img>, <link>, <script>) from script error
        const target = event.target as HTMLElement | null;
        const isResource = target && target !== (window as any) && (target.tagName === "IMG" || target.tagName === "LINK" || target.tagName === "SCRIPT");

        const captured: CapturedError = {
          message: event.message || (isResource ? `Resource load failed: ${(target as any).src || (target as any).href}` : "Unknown Script Error"),
          stack: event.error?.stack,
          source: event.filename || (isResource ? (target as any).src || (target as any).href : undefined),
          lineno: event.lineno,
          colno: event.colno,
          type: isResource ? "resource" : "runtime",
          breadcrumbs: [...this.breadcrumbs],
        };

        this.capturedErrors.push(captured);
        this.onErrorCallback(this.capturedErrors, this.fontHealth);
      },
      true // Capture phase to catch resource loading errors
    );

    // 2. Unhandled Promise Rejections
    window.addEventListener("unhandledrejection", (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message = typeof reason === "string" ? reason : reason?.message || "Unhandled Promise Rejection";
      const stack = reason?.stack;

      const captured: CapturedError = {
        message,
        stack,
        type: "unhandledrejection",
        breadcrumbs: [...this.breadcrumbs],
      };

      this.capturedErrors.push(captured);
      this.onErrorCallback(this.capturedErrors, this.fontHealth);
    });

    // 3. Track User Action Breadcrumbs (Clicks & Navigation)
    document.addEventListener(
      "click",
      (e) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;
        const tag = target.tagName?.toLowerCase() || "element";
        const role = target.getAttribute("role") || "";
        const href = target.getAttribute("href") || "";
        const text = (target.textContent || "").trim().slice(0, 30);

        this.addBreadcrumb("ui", `click ${tag}${href ? ` -> ${href}` : ""}${text ? ` ("${text}")` : ""}`, {
          tag,
          role,
        });
      },
      { passive: true }
    );

    // 4. Track Scroll Milestones (25%, 50%, 75%, 100%)
    const milestones = new Set<number>();
    window.addEventListener(
      "scroll",
      () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (docHeight <= 0) return;
        const percent = Math.round((scrollTop / docHeight) * 100);

        for (const m of [25, 50, 75, 100]) {
          if (percent >= m && !milestones.has(m)) {
            milestones.add(m);
            this.addBreadcrumb("scroll", `Scrolled ${m}% of document`);
          }
        }
      },
      { passive: true }
    );
  }

  /**
   * Specifically verify canonical Tibetan fonts (critical for Jonang scriptural accuracy).
   */
  public async checkTibetanFontHealth(): Promise<void> {
    if (!("fonts" in document)) return;

    try {
      await document.fonts.ready;

      const notoCheck = document.fonts.check("16px 'Noto Serif Tibetan'");
      const jomolhariCheck = document.fonts.check("16px 'Jomolhari'");
      const monlamCheck = document.fonts.check("16px 'Monlam Uni Ouchan3'");

      const notoLoaded = notoCheck;
      const jomolhariLoaded = jomolhariCheck;
      const monlamLoaded = monlamCheck;

      // Noto Serif Tibetan is our default primary font; if it fails, typography degrades
      const isDegraded = !notoLoaded && !jomolhariLoaded;

      this.fontHealth = {
        notoSerifTibetanLoaded: notoLoaded,
        jomolhariLoaded,
        monlamUniLoaded: monlamLoaded,
        status: isDegraded ? "degraded" : "ok",
      };

      if (isDegraded) {
        this.addBreadcrumb("ui", "Tibetan font fallback triggered; primary webfonts unavailable");
        this.onErrorCallback(this.capturedErrors, this.fontHealth);
      }
    } catch {}
  }

  public getErrors(): CapturedError[] {
    return [...this.capturedErrors];
  }

  public getFontHealth(): FontHealthStatus {
    return { ...this.fontHealth };
  }
}
