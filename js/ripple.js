/**
 * Material-style ripple on click for `.btn-ripple` using **event delegation** on `document`.
 * Works for buttons/links injected later by the router—no per-element listeners required.
 * Shine/gloss on gradient CTAs is separate (CSS on `.cta-shine-wrap`); see docs/RIPPLE_BUTTON_EFFECT.md.
 */
export function initRipple() {
  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const el = target.closest(".btn-ripple");
      if (!el || !(el instanceof HTMLElement)) return;

      const reduce =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // Click coordinates relative to the button box so the ripple originates under the cursor.
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const maxDim = Math.max(rect.width, rect.height);
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple__wave";
      ripple.setAttribute("aria-hidden", "true");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = ripple.style.height = `${maxDim * 2.5}px`;
      el.appendChild(ripple);

      const cleanup = () => {
        ripple.removeEventListener("animationend", cleanup);
        ripple.remove();
      };
      ripple.addEventListener("animationend", cleanup);
    },
    false
  );
}
