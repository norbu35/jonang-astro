export function initScrollReveal() {
  if (typeof window === "undefined") return;

  // Respect user preference for reduced motion
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    return;
  }

  const options = {
    root: null,
    rootMargin: "0px 0px -40px 0px",
    threshold: 0.08,
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in-up");
        entry.target.classList.remove("opacity-0");
        obs.unobserve(entry.target);
      }
    });
  }, options);

  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  revealElements.forEach((el) => {
    // Only hide if not already in initial viewport to prevent flash
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("animate-fade-in-up");
    } else {
      el.classList.add("opacity-0");
      observer.observe(el);
    }
  });
}
