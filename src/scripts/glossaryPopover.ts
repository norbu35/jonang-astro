/** Click-operated nonmodal definition dialog with a predictable keyboard path. */

let popoverEl: HTMLElement | null = null;
let activeTrigger: HTMLElement | null = null;
let isInitialized = false;

function createPopoverElement(): HTMLElement {
  const el = document.createElement("div");
  el.id = "glossary-popover-card";
  el.className =
    "fixed z-[10000] max-w-sm sm:max-w-md w-[calc(100vw-2rem)] sm:w-96 rounded-2xl border border-border bg-surface shadow-2xl p-4 sm:p-5 opacity-0 pointer-events-none transition-all duration-150 ease-out transform -translate-y-1";
  el.hidden = true;
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-modal", "false");
  el.setAttribute("aria-label", "Glossary term definition");

  el.innerHTML = `
    <div class="flex items-center justify-between gap-2 border-b border-border/80 pb-2 mb-2.5">
      <span data-popover-category class="px-2 py-0.5 rounded bg-accent/10 text-ink font-mono text-[11px] font-bold uppercase tracking-wider"></span>
      <button type="button" data-popover-close class="min-h-[44px] min-w-[44px] p-1 text-muted hover:text-ink rounded hover:bg-surface-subtle transition-colors" aria-label="Close definition">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="space-y-1">
      <span lang="bo" data-popover-tibetan class="font-tibetan text-ink text-base sm:text-lg font-bold block leading-[1.6]"></span>
      <h4 data-popover-title class="font-display text-xl sm:text-2xl font-bold text-ink leading-tight m-0"></h4>
      <div class="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-muted pt-0.5">
        <span data-popover-wylie></span>
        <span data-popover-skt class="italic font-sans text-ink/70"></span>
      </div>
    </div>
    <p data-popover-def class="font-serif text-sm sm:text-base text-ink/80 leading-relaxed pt-3 border-t border-border/60 mt-3 m-0"></p>
    <div class="pt-3 mt-3 border-t border-border/60 flex items-center justify-between">
      <a data-popover-link href="/glossary" class="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-mono font-bold uppercase tracking-wider text-ink hover:underline transition-colors focus-visible:outline-none focus-visible:underline">
        <span>View in Glossary</span>
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </a>
      <span class="text-[10px] font-mono text-muted/80">Press ESC to close</span>
    </div>
  `;

  const closeBtn = el.querySelector("[data-popover-close]");
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const trigger = activeTrigger;
      hidePopover();
      trigger?.focus();
    });
  }

  document.body.appendChild(el);
  return el;
}

function getOrCreatePopover(): HTMLElement {
  if (!popoverEl || !document.body.contains(popoverEl)) {
    const existing = document.getElementById("glossary-popover-card");
    if (existing && document.body.contains(existing)) {
      popoverEl = existing;
    } else {
      if (existing) existing.remove();
      popoverEl = createPopoverElement();
    }
  }
  return popoverEl;
}

function positionPopover(trigger: HTMLElement) {
  const el = getOrCreatePopover();

  const triggerRect = trigger.getBoundingClientRect();
  const popoverWidth = Math.min(384, window.innerWidth - 32);
  const popoverHeight = el.offsetHeight || 220;
  const padding = 16;
  const margin = 8;

  // Calculate horizontal position (clamp within viewport)
  let left = triggerRect.left + triggerRect.width / 2 - popoverWidth / 2;
  if (left < padding) left = padding;
  if (left + popoverWidth > window.innerWidth - padding) {
    left = window.innerWidth - padding - popoverWidth;
  }

  // Calculate vertical position (flip above if overflowing bottom)
  let top = triggerRect.bottom + margin;
  if (top + popoverHeight > window.innerHeight - padding) {
    const spaceAbove = triggerRect.top - margin - popoverHeight;
    if (spaceAbove > padding) {
      top = spaceAbove;
    }
  }

  top = Math.max(padding, Math.min(top, window.innerHeight - popoverHeight - padding));
  el.style.maxHeight = `${window.innerHeight - padding * 2}px`;
  el.style.overflowY = "auto";
  el.style.left = `${Math.round(left)}px`;
  el.style.top = `${Math.round(top)}px`;
}

export function showPopover(trigger: HTMLElement) {
  if (activeTrigger && activeTrigger !== trigger) hidePopover();
  const el = getOrCreatePopover();
  activeTrigger = trigger;
  trigger.after(el);
  el.hidden = false;

  const termId = trigger.getAttribute("data-term-id") || "";
  const termEn = trigger.getAttribute("data-term-en") || "";
  const termBo = trigger.getAttribute("data-term-bo") || "";
  const wylie = trigger.getAttribute("data-term-wylie") || "";
  const skt = trigger.getAttribute("data-term-skt") || "";
  const shortDef = trigger.getAttribute("data-short-def") || "";
  const category = trigger.getAttribute("data-category") || "term";

  const catEl = el.querySelector("[data-popover-category]");
  const tibetanEl = el.querySelector("[data-popover-tibetan]");
  const titleEl = el.querySelector("[data-popover-title]");
  const wylieEl = el.querySelector("[data-popover-wylie]");
  const sktEl = el.querySelector("[data-popover-skt]");
  const defEl = el.querySelector("[data-popover-def]");
  const linkEl = el.querySelector<HTMLAnchorElement>("[data-popover-link]");

  if (catEl) catEl.textContent = category;
  if (tibetanEl) {
    tibetanEl.textContent = termBo;
    (tibetanEl as HTMLElement).style.display = termBo ? "block" : "none";
  }
  if (titleEl) titleEl.textContent = termEn;
  if (wylieEl) {
    wylieEl.textContent = wylie ? `Wylie: ${wylie}` : "";
    (wylieEl as HTMLElement).style.display = wylie ? "inline" : "none";
  }
  if (sktEl) {
    sktEl.textContent = skt ? `Skt: ${skt}` : "";
    (sktEl as HTMLElement).style.display = skt ? "inline" : "none";
  }
  if (defEl) defEl.textContent = shortDef;
  if (linkEl) {
    linkEl.href = `/glossary#${termId}`;
  }

  // Update trigger ARIA
  trigger.setAttribute("aria-expanded", "true");
  trigger.setAttribute("aria-controls", el.id);

  // Show & Position
  positionPopover(trigger);
  el.classList.remove("opacity-0", "pointer-events-none", "-translate-y-1");
  el.classList.add("opacity-100", "pointer-events-auto", "translate-y-0");
  el.querySelector<HTMLButtonElement>("[data-popover-close]")?.focus();
}

export function hidePopover() {
  if (!popoverEl) return;
  popoverEl.hidden = true;

  popoverEl.classList.remove("opacity-100", "pointer-events-auto", "translate-y-0");
  popoverEl.classList.add("opacity-0", "pointer-events-none", "-translate-y-1");

  if (activeTrigger) {
    activeTrigger.setAttribute("aria-expanded", "false");
    activeTrigger = null;
  }
}

export function initGlossaryPopovers() {
  if (isInitialized) return;
  isInitialized = true;

  document.addEventListener("click", (event) => {
    const target = (event.target as HTMLElement)?.closest<HTMLElement>("[data-glossary-term]");
    if (target) {
      if (activeTrigger === target) hidePopover();
      else showPopover(target);
    } else if (popoverEl && !popoverEl.contains(event.target as Node)) {
      hidePopover();
    }
  });

  document.addEventListener("focusin", (event) => {
    if (
      activeTrigger &&
      event.target !== activeTrigger &&
      !popoverEl?.contains(event.target as Node)
    )
      hidePopover();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && activeTrigger) {
      const trigger = activeTrigger;
      hidePopover();
      trigger.focus();
      event.preventDefault();
    }
  });

  // Reposition on window resize or scroll
  window.addEventListener(
    "scroll",
    () => {
      if (activeTrigger && popoverEl && !popoverEl.classList.contains("opacity-0")) {
        positionPopover(activeTrigger);
      }
    },
    { passive: true }
  );

  window.addEventListener(
    "resize",
    () => {
      if (activeTrigger && popoverEl && !popoverEl.classList.contains("opacity-0")) {
        positionPopover(activeTrigger);
      }
    },
    { passive: true }
  );

  // Astro ClientRouter / View Transitions lifecycle
  document.addEventListener("astro:before-swap", () => {
    hidePopover();
    if (popoverEl) {
      popoverEl.remove();
      popoverEl = null;
    }
    activeTrigger = null;
  });

  document.addEventListener("astro:page-load", () => {
    hidePopover();
    activeTrigger = null;
  });
}
