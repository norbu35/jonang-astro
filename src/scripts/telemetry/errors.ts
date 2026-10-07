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

  public addBreadcrumb(
    category: Breadcrumb["category"],
    message: string,
    data?: Record<string, unknown>
  ): void {
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
        const isResource =
          target &&
          target !== (window as any) &&
          (target.tagName === "IMG" || target.tagName === "LINK" || target.tagName === "SCRIPT");

        // Suppress expected media fallbacks marked to be ignored by telemetry
        if (
          isResource &&
          (target?.getAttribute("data-telemetry-ignore") === "true" ||
            target?.getAttribute("data-fallback") === "true")
        ) {
          return;
        }

        const captured: CapturedError = {
          message:
            event.message ||
            (isResource
              ? `Resource load failed: ${(target as any).src || (target as any).href}`
              : "Unknown Script Error"),
          stack: event.error?.stack,
          source:
            event.filename ||
            (isResource ? (target as any).src || (target as any).href : undefined),
          lineno: event.lineno,
          colno: event.colno,
          type: isResource ? "resource" : "runtime",
          breadcrumbs: [...this.breadcrumbs],
        };

        if (this.capturedErrors.length >= 20) return;
        this.capturedErrors.push(captured);
        this.onErrorCallback(this.capturedErrors, this.fontHealth);
      },
      true // Capture phase to catch resource loading errors
    );

    // 2. Unhandled Promise Rejections
    window.addEventListener("unhandledrejection", (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message =
        typeof reason === "string" ? reason : reason?.message || "Unhandled Promise Rejection";
      const stack = reason?.stack;

      const captured: CapturedError = {
        message,
        stack,
        type: "unhandledrejection",
        breadcrumbs: [...this.breadcrumbs],
      };

      if (this.capturedErrors.length >= 20) return;
      this.capturedErrors.push(captured);
      this.onErrorCallback(this.capturedErrors, this.fontHealth);
    });
  }

  /**
   * Specifically verify canonical Tibetan fonts (critical for Jonang scriptural accuracy).
   */
  public async checkTibetanFontHealth(): Promise<void> {
    if (!("fonts" in document)) return;

    try {
      await document.fonts.ready;

      const loaded = (family: string) =>
        [...document.fonts].some(
          (face) => face.family.replace(/["']/g, "") === family && face.status === "loaded"
        );
      const families = ["Noto Serif Tibetan", "Jomolhari", "Monlam Uni Ouchan3"];
      const required = [...document.querySelectorAll('[lang="bo"]')]
        .map((el) => getComputedStyle(el).fontFamily.split(",")[0].trim().replace(/["']/g, ""))
        .filter((family) => families.includes(family));
      this.fontHealth = {
        notoSerifTibetanLoaded: loaded(families[0]),
        jomolhariLoaded: loaded(families[1]),
        monlamUniLoaded: loaded(families[2]),
        status: required.some((family) => !loaded(family)) ? "degraded" : "ok",
      };
      this.onErrorCallback(this.capturedErrors, this.fontHealth);
    } catch {}
  }

  public getErrors(): CapturedError[] {
    return [...this.capturedErrors];
  }

  public getFontHealth(): FontHealthStatus {
    return { ...this.fontHealth };
  }
}
