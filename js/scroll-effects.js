/**
 * Scroll-driven presentation helpers: reveal-on-scroll (Intersection Observer) and optional hero parallax.
 * Scoped observers are recreated whenever `#app` innerHTML changes—see `setupScrollEffects` from `main.js`.
 */

/** @type {IntersectionObserver | null} */
let revealObserver = null;

/** @type {number | null} */
let parallaxFrame = null;

/** @type {{ onScroll: () => void } | null} */
let parallaxBinding = null;

/**
 * Reads `data-reveal-delay` (milliseconds) into inline `transition-delay` so staggered animations stay declarative in HTML.
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
 * Elements with `[data-reveal]` start hidden (see CSS); when they intersect the viewport they get `.is-visible`.
 * Respects `prefers-reduced-motion`: we skip animation and show content immediately for accessibility.
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

  // rootMargin bottom -8% triggers slightly before the element hits the bottom edge (feels less “late”).
  // threshold 0.12 avoids firing when only a sliver is visible.
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
 * Subtle vertical shift for `.hero__parallax-inner` layers on scroll; throttled with `requestAnimationFrame`.
 * No effect if those elements are absent (e.g. on routes that omit the old hero layout).
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
    // Coalesce many scroll events into one transform update per frame (smoother, less main-thread work).
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

/** @type {IntersectionObserver | null} */
let footerRevealObserver = null;

/**
 * Footer lives in `index.html` outside `#app`, so it is not re-created on route changes—observe it once globally.
 */
export function initFooterRevealOnce() {
  if (footerRevealObserver) return;
  const footer = document.querySelector(".footer-reveal");
  if (!footer) return;

  const prefersReduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    footer.classList.add("is-visible");
    return;
  }

  footerRevealObserver = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    },
    { root: null, rootMargin: "0px 0px -5% 0px", threshold: 0.08 }
  );
  footerRevealObserver.observe(footer);
}

/**
 * Called on first load and after each `routechange`; pass `#app` to limit queries to freshly injected markup.
 * @param {Element | Document} [root]
 */
export function setupScrollEffects(root = document) {
  initReveal(root);
  initParallax(root);
}
