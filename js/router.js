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
function renderHome() {
  return `
    <div class="main hero-section">
      <div class="hero__glow" aria-hidden="true"></div>
      <div class="main__container max-w-9xl inner-padding">
        <div class="main__content" data-reveal data-reveal-delay="0">
          <p class="eyebrow">Beginner-friendly learning project</p>
          <h1>NEXT GENERATION</h1>
          <h2>TECHNOLOGY</h2>
          <p class="lede">Build smooth, responsive pages with plain HTML, CSS, and JavaScript—no framework required.</p>
          <button type="button" class="main__btn"><a href="/sign-up">Get started free</a></button>
        </div>
        <div class="main__img--container hero-parallax" data-reveal data-reveal-delay="80">
          <div class="hero__parallax-inner">
            <img id="main__img" src="/public/images/pic1.svg" alt="Decorative technology illustration" width="520" height="400" />
          </div>
        </div>
      </div>
    </div>

    <section class="section features" aria-labelledby="features-heading">
      <div class="max-w-9xl inner-padding">
        <h2 id="features-heading" class="section__title" data-reveal>What you will practice</h2>
        <p class="section__subtitle" data-reveal data-reveal-delay="40">Patterns you can reuse in bigger apps later.</p>
        <ul class="features__grid">
          <li class="feature-card" data-reveal data-reveal-delay="0">
            <span class="feature-card__icon" aria-hidden="true">◆</span>
            <h3>Structure</h3>
            <p>Semantic HTML, landmarks, and accessible labels for screen readers.</p>
          </li>
          <li class="feature-card" data-reveal data-reveal-delay="60">
            <span class="feature-card__icon" aria-hidden="true">◇</span>
            <h3>Layout</h3>
            <p>CSS Grid and Flexbox with mobile-first breakpoints and fluid spacing.</p>
          </li>
          <li class="feature-card" data-reveal data-reveal-delay="120">
            <span class="feature-card__icon" aria-hidden="true">○</span>
            <h3>Behavior</h3>
            <p>Small ES modules: routing, observers, and events without a build-heavy toolchain.</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="services" aria-labelledby="services-heading">
      <div class="max-w-9xl inner-padding">
        <h2 id="services-heading" class="services__heading" data-reveal>See what the hype is about</h2>
        <div class="services__container">
          <article class="services__card services__card--a" data-reveal data-reveal-delay="0">
            <h2>Experience Bliss</h2>
            <p>Compose interfaces from reusable sections and keep styles predictable.</p>
            <button type="button">Get Started</button>
          </article>
          <article class="services__card services__card--b" data-reveal data-reveal-delay="80">
            <h2>Are you Ready?</h2>
            <p>Ship a static site to Vercel with a tiny copy build and SPA-style routes.</p>
            <button type="button">Get Started</button>
          </article>
        </div>
      </div>
    </section>

    <section class="section how" aria-labelledby="how-heading">
      <div class="max-w-9xl inner-padding">
        <h2 id="how-heading" class="section__title" data-reveal>How it works</h2>
        <ol class="how__steps">
          <li data-reveal data-reveal-delay="0"><strong>Design in the browser</strong> — tweak typography, motion, and spacing in CSS.</li>
          <li data-reveal data-reveal-delay="60"><strong>Add interaction</strong> — menus, scroll reveals, and route changes in JavaScript.</li>
          <li data-reveal data-reveal-delay="120"><strong>Deploy</strong> — run the build script and publish the <code>dist</code> folder.</li>
        </ol>
      </div>
    </section>

    <section class="section cta-band" aria-labelledby="cta-heading">
      <div class="max-w-9xl inner-padding cta-band__inner" data-reveal>
        <h2 id="cta-heading">Ready to level up?</h2>
        <p>Create an account to save progress on future lessons—this demo keeps signup as a static exercise.</p>
        <a class="cta-band__btn button" href="/sign-up">Create account</a>
      </div>
    </section>
  `;
}

/**
 * @param {string} path
 */
function renderTech() {
  return `
    <div class="main page-hero">
      <div class="main__container max-w-9xl inner-padding">
        <div class="main__content" data-reveal>
          <p class="eyebrow">Tech stack</p>
          <h1>TECH SECTION</h1>
          <p class="lede">Check out the technologies you can learn alongside this layout: semantic HTML, modern CSS, and vanilla ES modules.</p>
          <button type="button" class="main__btn"><a href="/products">Explore products</a></button>
        </div>
        <div class="main__img--container" data-reveal data-reveal-delay="80">
          <img id="main__img" src="/public/images/pic1.svg" alt="Technology illustration" width="520" height="400" />
        </div>
      </div>
    </div>
    <section class="section tech-detail" aria-labelledby="tech-detail-heading">
      <div class="max-w-9xl inner-padding">
        <h2 id="tech-detail-heading" class="section__title" data-reveal>Under the hood</h2>
        <ul class="tech-list">
          <li data-reveal data-reveal-delay="0"><strong>HTML</strong> — one shell page; routes swap content into <code>&lt;main&gt;</code>.</li>
          <li data-reveal data-reveal-delay="50"><strong>CSS</strong> — custom properties, fluid type, and motion with a reduced-motion fallback.</li>
          <li data-reveal data-reveal-delay="100"><strong>JavaScript</strong> — History API, link interception, Intersection Observer, requestAnimationFrame.</li>
        </ul>
      </div>
    </section>
  `;
}

/**
 * @param {string} path
 */
function renderProducts() {
  return `
    <div class="main page-hero">
      <div class="main__container max-w-9xl inner-padding">
        <div class="main__content" data-reveal>
          <p class="eyebrow">Catalog</p>
          <h1>PRODUCTS</h1>
          <p class="lede">Example product tiles for a landing page. Replace names and copy with your own project data.</p>
        </div>
      </div>
    </div>
    <section class="section products-grid-section" aria-labelledby="products-heading">
      <div class="max-w-9xl inner-padding">
        <h2 id="products-heading" class="section__title" data-reveal>Plans</h2>
        <div class="products__grid">
          <article class="product-card" data-reveal data-reveal-delay="0">
            <h3>Starter</h3>
            <p class="product-card__price">$0</p>
            <p>Perfect for experimenting with HTML, CSS, and a few JS modules.</p>
            <a href="/sign-up" class="button product-card__btn">Choose</a>
          </article>
          <article class="product-card product-card--featured" data-reveal data-reveal-delay="70">
            <h3>Builder</h3>
            <p class="product-card__price">$12<span>/mo</span></p>
            <p>Add more sections, analytics, and a custom domain when you are ready.</p>
            <a href="/sign-up" class="button product-card__btn">Choose</a>
          </article>
          <article class="product-card" data-reveal data-reveal-delay="140">
            <h3>Team</h3>
            <p class="product-card__price">Custom</p>
            <p>Shared guidelines, components, and deploy previews for your group.</p>
            <a href="/sign-up" class="button product-card__btn">Contact</a>
          </article>
        </div>
      </div>
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
      <div class="max-w-9xl inner-padding">
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
          <button type="submit" class="button sign-up-form__submit">Create account</button>
        </form>
        <p class="sign-up-note" data-reveal data-reveal-delay="80">Already learning? <a href="/">Back home</a></p>
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
