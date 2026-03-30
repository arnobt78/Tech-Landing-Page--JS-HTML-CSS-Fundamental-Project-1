/**
 * Application entry point (loaded as a module from index.html).
 *
 * Responsibilities in order:
 * 1. Wire shell UI that lives outside the SPA outlet (nav, footer year, footer reveal).
 * 2. Start the client router on `#app` so each “page” is injected HTML, not a full reload.
 * 3. On every `routechange`, re-run scroll/reveal observers on the new DOM inside `#app`.
 * 4. Extra UX: clicking the padded area of a `.main__btn` that wraps an `<a>` still navigates via the router.
 *
 * There is no REST API or fetch layer here—everything is static content from router templates.
 */
import { initRouter, navigate } from "./router.js";
import { initFooterRevealOnce, setupScrollEffects } from "./scroll-effects.js";
import { initRipple } from "./ripple.js";

/** Toggle hamburger + slide-out menu; close when a link is chosen or the route changes. */
function initMobileMenu() {
  const menu = document.querySelector("#mobile-menu");
  const menuLinks = document.querySelector(".navbar__menu");
  if (!menu || !menuLinks) return;

  menu.addEventListener("click", () => {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
  });

  // Keyboard users can activate the menu control like a button (role="button" on the toggle).
  menu.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      menu.classList.toggle("is-active");
      menuLinks.classList.toggle("active");
    }
  });

  menuLinks.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      menu.classList.remove("is-active");
      menuLinks.classList.remove("active");
    }
  });

  // Router swaps `#app` HTML; reset menu so the next view does not stay “stuck” open on mobile.
  document.addEventListener("routechange", () => {
    menu.classList.remove("is-active");
    menuLinks.classList.remove("active");
  });
}

/** Keeps the copyright year in the footer accurate without editing HTML each January. */
function setFooterYear() {
  const el = document.querySelector("#footer-year");
  if (el) el.textContent = String(new Date().getFullYear());
}

/** Adds a subtle scrolled state class for CSS (border/background) after the user scrolls slightly. */
function initNavbarScroll() {
  const nav = document.querySelector(".navbar");
  if (!nav) return;
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    nav.classList.toggle("navbar--scrolled", y > 24);
  };
  // `passive: true` hints the browser we will not call preventDefault—better scroll performance.
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/**
 * Demo-only: the sign-up form has no backend. We prevent real navigation/query submission so learners
 * can experiment safely in the browser.
 */
function onSignUpSubmit(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  if (!form.classList.contains("sign-up-form")) return;
  event.preventDefault();
}

/** Single listener on `document` catches submit events from forms added after initial load (e.g. after route changes). */
function bindDelegatedHandlers() {
  document.addEventListener("submit", onSignUpSubmit);
}

/** One-time startup: order matters—router last among features that replace `#app` innerHTML. */
function boot() {
  setFooterYear();
  initMobileMenu();
  initNavbarScroll();
  bindDelegatedHandlers();
  initFooterRevealOnce();
  initRipple();

  const outlet = document.querySelector("#app");
  initRouter(outlet);

  // New route = new nodes: observers must be reattached; also mimic traditional MPA scroll-to-top.
  const refreshMotion = () => {
    if (!outlet) return;
    setupScrollEffects(outlet);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  refreshMotion();
  document.addEventListener("routechange", refreshMotion);

  // Some CTAs use `<button class="main__btn"><a href="...">` for legacy styling; clicks on the button
  // chrome (but not the link itself) are routed through `navigate` so the SPA still handles them.
  document.addEventListener(
    "click",
    (event) => {
      const t = event.target;
      if (!(t instanceof Element)) return;
      const wrap = t.closest(".main__btn");
      if (!wrap) return;
      const a =
        wrap instanceof HTMLAnchorElement
          ? wrap
          : wrap.querySelector("a[href^='/']");
      if (!a || !(a instanceof HTMLAnchorElement)) return;
      if (t.closest("a") === a) return;
      event.preventDefault();
      navigate(outlet, new URL(a.href).pathname);
      document.dispatchEvent(new CustomEvent("routechange"));
    },
    true
  );
}

boot();
