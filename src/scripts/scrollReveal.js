export function initScrollReveal() {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // If element is in viewport, add the animation class
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in-up");
        entry.target.classList.remove("opacity-0");
        // Once animated, we don't need to observe it anymore
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Grab all elements with the reveal-on-scroll class
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  revealElements.forEach((el) => {
    // Ensure they start hidden
    el.classList.add("opacity-0");
    observer.observe(el);
  });
}
