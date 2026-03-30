import { images } from "./images.js";

/**
 * Lightweight client router: History API + content swap into #app.
 */
export const appContext = {
  currentRoute: "/"
};

const SITE_NAME = "TechNEXT";

const LINKS = {
  "/": "Home — Learn modern web basics",
  "/tech": "Technology — TechNEXT",
  "/products": "Products — TechNEXT",
  "/sign-up": "Sign up — TechNEXT"
};

/**
 * @param {string} pathname
 */
function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

/**
 * @param {string} path
 */
function setDocumentTitle(path) {
  const key = normalizePath(path);
  document.title = LINKS[key] ?? SITE_NAME;
}

/**
 * @param {string} path
 */
const serviceCardBg = `linear-gradient(145deg, rgba(15, 15, 20, 0.35) 0%, rgba(15, 15, 20, 0.92) 100%), linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(17, 17, 17, 0.82) 100%)`;

function renderHome() {
  return `
    <div class="main hero-section hero-fullbleed">
      <div class="hero-fullbleed__bg" style="background-image: url('${images.home.heroBg}')" aria-hidden="true"></div>
      <div class="hero-fullbleed__overlay" aria-hidden="true"></div>
      <div class="hero-fullbleed__content main__container max-w-9xl inner-padding">
        <div class="main__content hero-fullbleed__copy" data-reveal data-reveal-from="bottom" data-reveal-delay="0">
          <p class="eyebrow">Production-grade experiences without a framework lock-in</p>
          <h1>NEXT GENERATION</h1>
          <h2>TECHNOLOGY</h2>
          <p class="lede lede--hero">Launch fast, stay in control: ship marketing pages and product surfaces with semantic HTML, resilient CSS, and lightweight JavaScript—perfect for teams that want clarity and performance.</p>
          <div class="cta-shine-wrap cta-shine-wrap--hero">
            <a class="main__btn cta-shine-button btn-ripple" href="/sign-up">Get started free</a>
          </div>
        </div>
      </div>
    </div>

    <section class="section features" aria-labelledby="features-heading">
      <div class="max-w-9xl inner-padding">
        <h2 id="features-heading" class="section__title" data-reveal data-reveal-from="top" data-reveal-delay="0">What you will practice</h2>
        <p class="section__subtitle" data-reveal data-reveal-from="bottom" data-reveal-delay="50">Build a portfolio-ready workflow: structure content for everyone, design layout that adapts cleanly, and wire up motion and routing without reaching for a heavy toolchain.</p>
        <ul class="features__grid">
          <li class="feature-card" data-reveal data-reveal-from="left" data-reveal-delay="0">
            <img class="feature-card__visual" src="${images.home.feature1}" alt="" width="800" height="420" loading="lazy" />
            <span class="feature-card__badge">Semantics</span>
            <div class="feature-card__title-row">
              <span class="feature-card__icon" aria-hidden="true"><i class="fas fa-layer-group"></i></span>
              <h3>Structure</h3>
            </div>
            <p>Semantic HTML, landmarks, and accessible labels for screen readers.</p>
          </li>
          <li class="feature-card" data-reveal data-reveal-from="bottom" data-reveal-delay="70">
            <img class="feature-card__visual" src="${images.home.feature2}" alt="" width="800" height="420" loading="lazy" />
            <span class="feature-card__badge">Responsive</span>
            <div class="feature-card__title-row">
              <span class="feature-card__icon" aria-hidden="true"><i class="fas fa-th-large"></i></span>
              <h3>Layout</h3>
            </div>
            <p>CSS Grid and Flexbox with mobile-first breakpoints and fluid spacing.</p>
          </li>
          <li class="feature-card" data-reveal data-reveal-from="right" data-reveal-delay="140">
            <img class="feature-card__visual" src="${images.home.feature3}" alt="" width="800" height="420" loading="lazy" />
            <span class="feature-card__badge">Interactivity</span>
            <div class="feature-card__title-row">
              <span class="feature-card__icon" aria-hidden="true"><i class="fas fa-bolt"></i></span>
              <h3>Behavior</h3>
            </div>
            <p>Small ES modules: routing, observers, and events without a build-heavy toolchain.</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="section showcase-visual" aria-labelledby="showcase-heading">
      <div class="max-w-9xl inner-padding showcase-visual__inner">
        <div class="showcase-visual__text" data-reveal data-reveal-from="left" data-reveal-delay="0">
          <h2 id="showcase-heading">Ship polished pages</h2>
          <p>
            Your landing story deserves photography that feels intentional. Pair strong imagery with copy that explains the “why” in seconds, not paragraphs—visitors stay longer when the visual hierarchy matches the message.
          </p>
          <p>
            This split layout keeps text readable on a simple grid while the photo does the emotional lift. Photos are served from Unsplash via direct URLs—no API key in the browser. Subtle motion on scroll ties the band to the rest of the page so nothing feels pasted on.
          </p>
        </div>
        <div class="showcase-visual__media" data-reveal data-reveal-from="right" data-reveal-delay="90">
          <img src="${images.home.showcase}" alt="Team collaboration workspace" width="800" height="500" loading="lazy" />
        </div>
      </div>
    </section>

    <section class="services" aria-labelledby="services-heading">
      <div class="max-w-9xl inner-padding">
        <h2 id="services-heading" class="services__heading" data-reveal data-reveal-from="top" data-reveal-delay="0">See what the hype is about</h2>
        <p class="services__sub" data-reveal data-reveal-from="bottom" data-reveal-delay="40">Three launch-ready story blocks—each with its own mood—so you can mix product proof, velocity, and scale in one scroll.</p>
        <div class="services__container">
          <article
            class="services__card services__card--cover"
            data-reveal
            data-reveal-from="left"
            data-reveal-delay="0"
            style="background-image: ${serviceCardBg}, url('${images.home.servicesA}')"
          >
            <div class="services__card-text">
              <h2>Experience Bliss</h2>
              <p>Compose interfaces from reusable sections and keep styles predictable.</p>
            </div>
            <div class="cta-shine-wrap cta-shine-wrap--card"><button type="button" class="services-card__btn cta-shine-button btn-ripple">Get Started</button></div>
          </article>
          <article
            class="services__card services__card--cover"
            data-reveal
            data-reveal-from="bottom"
            data-reveal-delay="70"
            style="background-image: ${serviceCardBg}, url('${images.home.servicesB}')"
          >
            <div class="services__card-text">
              <h2>Are you Ready?</h2>
              <p>Ship a static site to Vercel with a tiny copy build and SPA-style routes.</p>
            </div>
            <div class="cta-shine-wrap cta-shine-wrap--card"><button type="button" class="services-card__btn cta-shine-button btn-ripple">Get Started</button></div>
          </article>
          <article
            class="services__card services__card--cover"
            data-reveal
            data-reveal-from="right"
            data-reveal-delay="120"
            style="background-image: ${serviceCardBg}, url('${images.home.servicesC}')"
          >
            <div class="services__card-text">
              <h2>Scale with confidence</h2>
              <p>Grow traffic, split experiments, and keep brand polish as your team ships more routes.</p>
            </div>
            <div class="cta-shine-wrap cta-shine-wrap--card"><button type="button" class="services-card__btn cta-shine-button btn-ripple">Get Started</button></div>
          </article>
        </div>
      </div>
    </section>

    <section class="section how" aria-labelledby="how-heading">
      <div class="how__banner" data-reveal data-reveal-from="top" data-reveal-delay="0" role="presentation">
        <img src="${images.home.howBanner}" alt="" width="1400" height="600" loading="lazy" />
      </div>
      <div class="max-w-9xl inner-padding">
        <h2 id="how-heading" class="section__title" data-reveal data-reveal-from="top" data-reveal-delay="0">How it works</h2>
        <div class="how__columns">
          <ol class="how__steps">
            <li data-reveal data-reveal-from="left" data-reveal-delay="0"><strong>Design in the browser</strong> — tweak typography, motion, and spacing in CSS.</li>
            <li data-reveal data-reveal-from="left" data-reveal-delay="60"><strong>Add interaction</strong> — menus, scroll reveals, and route changes in JavaScript.</li>
            <li data-reveal data-reveal-from="left" data-reveal-delay="120"><strong>Deploy</strong> — run the build script and publish the <code>dist</code> folder.</li>
          </ol>
          <ol class="how__steps" start="4">
            <li data-reveal data-reveal-from="right" data-reveal-delay="0"><strong>Measure and iterate</strong> — fold in analytics or A/B hooks without rewriting the stack.</li>
            <li data-reveal data-reveal-from="right" data-reveal-delay="60"><strong>Harden accessibility</strong> — audit focus order, contrast, and reduced-motion paths.</li>
            <li data-reveal data-reveal-from="right" data-reveal-delay="120"><strong>Scale the brand</strong> — reuse tokens, sections, and deploy previews as the org grows.</li>
          </ol>
        </div>
      </div>
    </section>

    <section class="section cta-band" aria-labelledby="cta-heading">
      <div class="max-w-9xl inner-padding cta-band__inner" data-reveal data-reveal-from="bottom" data-reveal-delay="0">
        <h2 id="cta-heading">Ready to level up?</h2>
        <p>Create an account to save progress on future lessons—this demo keeps signup as a static exercise.</p>
        <div class="cta-shine-wrap cta-shine-wrap--cta">
          <a class="cta-band__btn button cta-shine-button btn-ripple" href="/sign-up">Create account</a>
        </div>
      </div>
    </section>
  `;
}

/**
 * @param {string} path
 */
function renderTech() {
  return `
    <div class="main hero-section hero-fullbleed">
      <div class="hero-fullbleed__bg" style="background-image: url('${images.tech.heroBg}')" aria-hidden="true"></div>
      <div class="hero-fullbleed__overlay" aria-hidden="true"></div>
      <div class="hero-fullbleed__content main__container max-w-9xl inner-padding">
        <div class="main__content hero-fullbleed__copy" data-reveal data-reveal-from="bottom" data-reveal-delay="0">
          <p class="eyebrow">Tech stack</p>
          <h1>TECH SECTION</h1>
          <p class="lede lede--hero">Check out the technologies you can learn alongside this layout: semantic HTML, modern CSS, and vanilla ES modules.</p>
          <div class="cta-shine-wrap cta-shine-wrap--hero">
            <a class="main__btn cta-shine-button btn-ripple" href="/products">Explore products</a>
          </div>
        </div>
      </div>
    </div>
    <section class="section tech-detail" aria-labelledby="tech-detail-heading">
      <div class="max-w-9xl inner-padding tech-detail__split">
        <div class="tech-detail__visual" data-reveal data-reveal-from="left" data-reveal-delay="0">
          <img src="${images.tech.detail}" alt="Devices and technology" width="1200" height="700" loading="lazy" />
        </div>
        <div class="tech-detail__copy">
        <h2 id="tech-detail-heading" class="section__title" data-reveal>Under the hood</h2>
        <ul class="tech-list">
          <li data-reveal data-reveal-delay="0"><strong>HTML</strong> — one shell page; routes swap content into <code>&lt;main&gt;</code>.</li>
          <li data-reveal data-reveal-delay="50"><strong>CSS</strong> — custom properties, fluid type, and motion with a reduced-motion fallback.</li>
          <li data-reveal data-reveal-delay="100"><strong>JavaScript</strong> — History API, link interception, Intersection Observer, requestAnimationFrame.</li>
        </ul>
        </div>
      </div>
    </section>
    <section class="how__banner" aria-hidden="true">
      <img src="${images.tech.banner}" alt="" width="1920" height="800" loading="lazy" />
    </section>
  `;
}

/**
 * @param {string} path
 */
function renderProducts() {
  return `
    <div class="main hero-section hero-fullbleed">
      <div class="hero-fullbleed__bg" style="background-image: url('${images.products.heroBg}')" aria-hidden="true"></div>
      <div class="hero-fullbleed__overlay" aria-hidden="true"></div>
      <div class="hero-fullbleed__content main__container max-w-9xl inner-padding">
        <div class="main__content hero-fullbleed__copy" data-reveal data-reveal-from="bottom" data-reveal-delay="0">
          <p class="eyebrow">Catalog</p>
          <h1>PRODUCTS</h1>
          <p class="lede lede--hero">Example product tiles for a landing page. Replace names and copy with your own project data.</p>
        </div>
      </div>
    </div>
    <section class="section products-grid-section" aria-labelledby="products-heading">
      <div class="max-w-9xl inner-padding">
        <h2 id="products-heading" class="section__title" data-reveal>Plans</h2>
        <div class="products__grid">
          <article class="product-card" data-reveal data-reveal-delay="0">
            <div class="product-card__visual"><img src="${images.products.card1}" alt="" width="600" height="240" loading="lazy" /></div>
            <h3>Starter</h3>
            <p class="product-card__price">$0</p>
            <p>Perfect for experimenting with HTML, CSS, and a few JS modules.</p>
            <div class="cta-shine-wrap cta-shine-wrap--product">
              <a href="/sign-up" class="button product-card__btn cta-shine-button btn-ripple">Choose</a>
            </div>
          </article>
          <article class="product-card product-card--featured" data-reveal data-reveal-delay="70">
            <div class="product-card__visual"><img src="${images.products.card2}" alt="" width="600" height="240" loading="lazy" /></div>
            <h3>Builder</h3>
            <p class="product-card__price">$12<span>/mo</span></p>
            <p>Add more sections, analytics, and a custom domain when you are ready.</p>
            <div class="cta-shine-wrap cta-shine-wrap--product">
              <a href="/sign-up" class="button product-card__btn cta-shine-button btn-ripple">Choose</a>
            </div>
          </article>
          <article class="product-card" data-reveal data-reveal-delay="140">
            <div class="product-card__visual"><img src="${images.products.card3}" alt="" width="600" height="240" loading="lazy" /></div>
            <h3>Team</h3>
            <p class="product-card__price">Custom</p>
            <p>Shared guidelines, components, and deploy previews for your group.</p>
            <div class="cta-shine-wrap cta-shine-wrap--product">
              <a href="/sign-up" class="button product-card__btn cta-shine-button btn-ripple">Contact</a>
            </div>
          </article>
        </div>
      </div>
    </section>
    <section class="how__banner" aria-hidden="true">
      <img src="${images.products.banner}" alt="" width="1920" height="800" loading="lazy" />
    </section>
  `;
}

/**
 * @param {string} path
 */
function renderSignUp() {
  return `
    <div class="main page-hero page-hero--compact">
      <div class="main__container max-w-9xl inner-padding">
        <div class="main__content sign-up-intro" data-reveal>
          <p class="eyebrow">Accounts</p>
          <h1>SIGN UP</h1>
          <p class="lede">This is a static demo form for learning: values are not sent anywhere.</p>
        </div>
      </div>
    </div>
    <section class="section sign-up-section" aria-labelledby="signup-form-heading">
      <div class="max-w-9xl inner-padding sign-up-section__grid">
        <div class="sign-up-visual" data-reveal data-reveal-from="left" data-reveal-delay="0">
          <img src="${images.signUp.aside}" alt="People collaborating" width="800" height="1000" loading="lazy" />
        </div>
        <div class="sign-up-form-wrap">
        <h2 id="signup-form-heading" class="visually-hidden">Registration form</h2>
        <form class="sign-up-form" data-reveal action="#" method="get">
          <label class="form-field">
            <span>Name</span>
            <input type="text" name="name" autocomplete="name" placeholder="Your name" />
          </label>
          <label class="form-field">
            <span>Email</span>
            <input type="email" name="email" autocomplete="email" placeholder="you@example.com" />
          </label>
          <label class="form-field">
            <span>Password</span>
            <input type="password" name="password" autocomplete="new-password" placeholder="Choose a password" />
          </label>
          <div class="cta-shine-wrap cta-shine-wrap--form">
            <button type="submit" class="button sign-up-form__submit cta-shine-button btn-ripple">Create account</button>
          </div>
        </form>
        <p class="sign-up-note" data-reveal data-reveal-delay="80">Already learning? <a href="/">Back home</a></p>
        </div>
      </div>
    </section>
  `;
}

const ROUTES = {
  "/": renderHome,
  "/tech": renderTech,
  "/products": renderProducts,
  "/sign-up": renderSignUp
};

/**
 * @param {string} path
 */
function renderRoute(path) {
  const key = normalizePath(path);
  const render = ROUTES[key];
  if (typeof render === "function") return render();
  return renderHome();
}

/**
 * @param {HTMLElement | null} outlet
 * @param {string} path
 */
export function navigate(outlet, path) {
  const key = normalizePath(path);
  if (!outlet) return;
  outlet.innerHTML = renderRoute(key);
  appContext.currentRoute = key;
  window.history.pushState({ path: key }, "", key);
  setDocumentTitle(key);
}

/**
 * @param {HTMLElement | null} outlet
 */
export function renderFromLocation(outlet) {
  const key = normalizePath(window.location.pathname);
  if (!outlet) return;
  outlet.innerHTML = renderRoute(key);
  appContext.currentRoute = key;
  setDocumentTitle(key);
}

/**
 * @param {HTMLElement | null} outlet
 */
export function initRouter(outlet) {
  renderFromLocation(outlet);

  window.addEventListener("popstate", () => {
    renderFromLocation(outlet);
    document.dispatchEvent(new CustomEvent("routechange"));
  });

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a[href^="/"]');
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
      const url = new URL(anchor.href);
      if (url.origin !== window.location.origin) return;
      const rel = normalizePath(url.pathname);
      if (!ROUTES[rel] && rel !== "/") return;
      event.preventDefault();
      navigate(outlet, rel);
      document.dispatchEvent(new CustomEvent("routechange"));
    },
    true
  );
}
