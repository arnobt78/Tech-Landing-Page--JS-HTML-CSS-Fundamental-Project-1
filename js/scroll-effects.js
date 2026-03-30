/** @type {IntersectionObserver | null} */
let revealObserver = null;

/** @type {number | null} */
let parallaxFrame = null;

/** @type {{ onScroll: () => void } | null} */
let parallaxBinding = null;

/**
 * @param {Element} root
 */
function applyRevealDelays(root) {
  root.querySelectorAll("[data-reveal]").forEach((el) => {
    if (!(el instanceof HTMLElement)) return;
    const raw = el.getAttribute("data-reveal-delay");
    const ms = raw ? Number.parseInt(raw, 10) : 0;
    el.style.transitionDelay = `${Number.isFinite(ms) ? ms : 0}ms`;
  });
}

/**
 * @param {Element | Document} root
 */
export function initReveal(root) {
  if (revealObserver) revealObserver.disconnect();
  const prefersReduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    root.querySelectorAll("[data-reveal]").forEach((el) => {
      el.classList.add("is-visible");
    });
    return;
  }

  applyRevealDelays(root);

  revealObserver = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    },
    { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  root.querySelectorAll("[data-reveal]").forEach((el) => {
    revealObserver?.observe(el);
  });
}

/**
 * @param {Element | Document} root
 */
export function initParallax(root) {
  if (parallaxBinding) {
    window.removeEventListener("scroll", parallaxBinding.onScroll);
    parallaxBinding = null;
  }

  const layers = root.querySelectorAll(".hero__parallax-inner");
  if (!layers.length) return;

  const prefersReduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) return;

  const onScroll = () => {
    if (parallaxFrame !== null) return;
    parallaxFrame = window.requestAnimationFrame(() => {
      parallaxFrame = null;
      const y = window.scrollY || document.documentElement.scrollTop;
      const shift = Math.min(42, Math.max(-12, y * 0.045));
      layers.forEach((layer) => {
        if (layer instanceof HTMLElement) {
          layer.style.transform = `translate3d(0, ${shift}px, 0)`;
        }
      });
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  parallaxBinding = { onScroll };
  onScroll();
}

/**
 * @param {Element | Document} [root]
 */
export function setupScrollEffects(root = document) {
  initReveal(root);
  initParallax(root);
}
