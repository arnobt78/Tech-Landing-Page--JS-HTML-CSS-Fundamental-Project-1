import { initRouter, navigate } from "./router.js";
import { initFooterRevealOnce, setupScrollEffects } from "./scroll-effects.js";
import { initRipple } from "./ripple.js";

function initMobileMenu() {
  const menu = document.querySelector("#mobile-menu");
  const menuLinks = document.querySelector(".navbar__menu");
  if (!menu || !menuLinks) return;

  menu.addEventListener("click", () => {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
  });

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

  document.addEventListener("routechange", () => {
    menu.classList.remove("is-active");
    menuLinks.classList.remove("active");
  });
}

function setFooterYear() {
  const el = document.querySelector("#footer-year");
  if (el) el.textContent = String(new Date().getFullYear());
}

function initNavbarScroll() {
  const nav = document.querySelector(".navbar");
  if (!nav) return;
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    nav.classList.toggle("navbar--scrolled", y > 24);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function onSignUpSubmit(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  if (!form.classList.contains("sign-up-form")) return;
  event.preventDefault();
}

function bindDelegatedHandlers() {
  document.addEventListener("submit", onSignUpSubmit);
}

function boot() {
  setFooterYear();
  initMobileMenu();
  initNavbarScroll();
  bindDelegatedHandlers();
  initFooterRevealOnce();
  initRipple();

  const outlet = document.querySelector("#app");
  initRouter(outlet);

  const refreshMotion = () => {
    if (!outlet) return;
    setupScrollEffects(outlet);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  refreshMotion();
  document.addEventListener("routechange", refreshMotion);

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
