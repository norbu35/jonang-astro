/** Keep reading content visible without animating entire sections on scroll. */
export function initScrollReveal() {
  document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
    el.classList.remove("opacity-0", "animate-fade-in-up");
  });
}
