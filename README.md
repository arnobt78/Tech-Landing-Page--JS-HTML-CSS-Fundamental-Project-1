# Tech Landing Page – JavaScript, HTML, CSS Frontend Fundamentals Project 1

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Layouts%20%26%20motion-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES%20modules-F7DF1E?logo=javascript&logoColor=000)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

A **production-style learning project**: a responsive marketing-style site called **TechNEXT** that runs as a **single-page application (SPA)** in the browser—without React, Next.js, or a custom backend. You get full-bleed heroes, scroll-driven motion, optional click ripples and CTA shine, client-side routing with clean URLs, and a tiny **Node** build step that copies static files into `dist/` for hosting (for example on **Vercel**). It is ideal for teaching **semantic HTML**, **modern CSS** (Grid, Flexbox, custom properties, `clamp()`), and **vanilla ES modules** (History API, event delegation, `IntersectionObserver`).

- **Live Demo:** [https://next-tech-ui.vercel.app/](https://next-tech-ui.vercel.app/)

---

## Table of contents

- [What this project is (and is not)](#what-this-project-is-and-is-not)
- [High-level walkthrough](#high-level-walkthrough)
- [Features & functionality](#features--functionality)
- [Technology stack](#technology-stack)
- [Architecture & how it works](#architecture--how-it-works)
- [Routes (client-side)](#routes-client-side)
- [API, backend & data](#api-backend--data)
- [Environment variables (`.env`)](#environment-variables-env)
- [Project structure](#project-structure)
- [Dependencies & dev tools](#dependencies--dev-tools)
- [How to run locally](#how-to-run-locally)
- [Build & deploy](#build--deploy)
- [Reusing this project elsewhere](#reusing-this-project-elsewhere)
- [Documentation in `docs/`](#documentation-in-docs)
- [Keywords](#keywords)
- [Credits](#credits)
- [License](#license)
- [Happy coding](#happy-coding-)

---

## What this project is (and is not)

**It is:**

- A **static front-end** site: one shell page (`index.html`) with a `<main id="app">` outlet where JavaScript injects “views.”
- A **learning-oriented** codebase with clear separation: `router.js` (views), `scroll-effects.js` (motion), `ripple.js` (interaction polish), `images.js` (centralized image URLs).
- **Deployable** as static files; `vercel.json` rewrites all paths to `index.html` so `/tech` and `/products` work after refresh.

**It is not:**

- A **Next.js** or **React** app (no JSX, no framework runtime).
- A project with a **REST/GraphQL API** or **database** in this repo—the sign-up form is a **demo** (submit is prevented in JS; nothing is sent to a server).
- A project that requires **environment variables** to run locally or to build.

---

## High-level walkthrough

1. Open **`index.html`**. The **navbar** and **footer** live in the shell; **page content** is rendered inside **`#app`** by `js/router.js`.
2. Click **Home**, **Tech**, **Products**, or **Sign Up**. Internal links use the **History API** (`pushState`) so the URL changes without a full page reload; `router.js` swaps `innerHTML` for that route.
3. On each route change, `main.js` listens for a custom **`routechange`** event and re-runs **scroll effects** (e.g. reveal-on-scroll) for the new DOM inside `#app`.
4. **Images** for heroes and cards are mostly **hotlinked Unsplash URLs** defined in `js/images.js` (no API key in the browser—just HTTPS image URLs).
5. Run **`npm run build`** to copy `index.html`, `styles.css`, `js/`, and `public/` into **`dist/`** for production hosting.

---

## Features & functionality

| Area                | What learners should notice                                                                                                       |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Accessibility**   | Skip link to `#app`, `aria-label` on nav, `aria-live` on main, reduced-motion handling for some animations.                       |
| **Responsive nav**  | Hamburger + full-screen menu on small viewports; closes on link click and on route change.                                        |
| **SPA routing**     | Same-origin `a[href^="/"]` clicks are intercepted; `popstate` restores views when using browser back/forward.                     |
| **Home page**       | Full-bleed hero, feature cards, showcase split, services cards with overlays, “How it works” + full-width banner, CTA band.       |
| **Tech / Products** | Full-bleed heroes, split “stack” sections (image/text order varies), full-width footer banners.                                     |
| **Sign-up**         | Demo form: heading + fields + “Create account” in one panel; submit does not POST anywhere.                                       |
| **Motion**          | Scroll-triggered reveals (`data-reveal` attributes + `IntersectionObserver`); optional parallax-style behavior where implemented. |
| **Buttons**         | **Ripple** on click (`.btn-ripple`) and **periodic shine** on gradient CTAs (`.cta-shine-wrap` + layered `::before` / `::after`). |
| **SEO / sharing**   | Meta description, Open Graph, Twitter cards, JSON-LD `WebSite` in `index.html`.                                                   |
| **Linting**         | `npm run lint` runs ESLint on `js/**/*.js`.                                                                                       |

---

## Technology stack

| Layer       | Choice                             | Why it matters for learning                                              |
| ----------- | ---------------------------------- | ------------------------------------------------------------------------ |
| **Markup**  | HTML5                              | Semantic regions, one shell + dynamic main.                              |
| **Styling** | CSS3                               | Custom properties, Grid, Flexbox, animations, fluid type with `clamp()`. |
| **Logic**   | Vanilla **ES modules**             | `import`/`export` without a bundler; runs in modern browsers.            |
| **Icons**   | Font Awesome 5 (CDN)               | Quick iconography for nav and UI.                                        |
| **Fonts**   | Google Fonts (Sora, IBM Plex Sans) | Distinct display + body pairing.                                         |
| **Images**  | Unsplash (direct URLs)             | No API key; see `js/images.js` and footer credit.                        |
| **Build**   | Node script                        | Copies static assets to `dist/`—easy to understand pipeline.             |
| **Hosting** | Vercel (example)                   | Static output + SPA rewrite rule.                                        |

---

## Architecture & how it works

### Boot sequence (`js/main.js`)

`main.js` is the entry point. It:

- Initializes the **mobile menu**, **footer year**, **navbar scroll** class, **ripple** listener, and **sign-up form** guard (prevents real submit).
- Calls **`initRouter(outlet)`** with `#app`.
- On each **`routechange`**, runs **`setupScrollEffects(outlet)`** and scrolls to top.

### Router (`js/router.js`)

- **`ROUTES`** maps paths like `"/"`, `"/tech"`, `"/products"`, `"/sign-up"` to **template functions** that return HTML strings.
- **`navigate(outlet, path)`** sets `outlet.innerHTML`, updates **`document.title`**, and uses **`history.pushState`**.
- **`initRouter`** registers **`click`** (capture) on internal anchors and **`popstate`** for back/forward.

**Minimal mental model:** each “page” is a **function returning HTML**—similar in spirit to a framework’s render function, but without virtual DOM.

### Scroll effects (`js/scroll-effects.js`)

Observes elements with `data-reveal` (and related attributes) to toggle classes when they enter the viewport—teaches **`IntersectionObserver`** and progressive enhancement.

### Ripple (`js/ripple.js`)

Delegated **click** handler on `.btn-ripple`: appends a short-lived span with a CSS animation—teaches **event delegation** and **DOM micro-updates**.

### Images (`js/images.js`)

Central **`unsplashPhoto()`** helper builds stable crop URLs. **Changing photos** for a lesson means editing one file, not hunting through HTML strings.

Example pattern (simplified):

```js
// js/images.js — build a sized Unsplash URL (no API key)
export function unsplashPhoto(photoPath, opts = {}) {
  const w = opts.w ?? 1600;
  const h = opts.h;
  const hPart = h != null ? `&h=${h}` : "";
  return `https://images.unsplash.com/${photoPath}?auto=format&fit=crop&w=${w}${hPart}&q=82`;
}
```

---

## Routes (client-side)

These paths are handled **in the browser** by `router.js` (not separate HTML files for each view):

| Path        | Purpose                                                                     |
| ----------- | --------------------------------------------------------------------------- |
| `/`         | Home: hero, features, showcase, services, how-it-works, CTA band.           |
| `/tech`     | Hero, “Under the hood” (image left), mirrored stack (text left), one wide banner. |
| `/products` | Hero, plans grid, “How this page is built” split, wide banner.                     |
| `/sign-up`  | Demo registration UI.                                                       |

All of these routes are rendered by **`index.html` + `js/router.js`** (no separate HTML file per page).

---

## API, backend & data

- **No backend** is included in this repository.
- **No API endpoints** are implemented here—the app does not `fetch()` application JSON.
- **Unsplash** is used as **static image URLs** only (see `images.js`). That is **not** the same as calling the Unsplash API (which would require a **server-side** or secured key for production use).
- The **sign-up form** is **front-end only**; `main.js` prevents default submit so learners can experiment safely.

If you extend this project with a real API later, you would typically add a separate server or serverless functions and then use `fetch` from `main.js` or a new module—still optional for this fundamentals repo.

---

## Environment variables (`.env`)

**You do not need a `.env` file** to run, build, or deploy this project. There are **no required environment variables** in `package.json`, the build script, or the static assets.

**Optional future use:** If you add features (analytics IDs, API base URLs, feature flags), you could introduce `.env` **only in a build tool** that injects values at build time, or read public config from `window.__CONFIG__` for advanced lessons. For the repo as shipped, **skip `.env` entirely**.

---

## Project structure

```
tech-ui/
├── index.html              # App shell: nav, #app outlet, footer, module entry
├── styles.css              # Global styles, layout, components, motion
├── package.json            # npm scripts (build, lint)
├── package-lock.json
├── eslint.config.js        # ESLint flat config for browser + ES2022
├── vercel.json             # Build output dir + SPA fallback rewrite
├── LICENSE                 # MIT
├── README.md               # This file
├── js/
│   ├── main.js             # Boot: menu, router, routechange, ripple, form guard
│   ├── router.js           # Route table + render functions + History API
│   ├── images.js           # Unsplash URL helpers + image map
│   ├── scroll-effects.js   # Reveal / scroll-driven effects
│   └── ripple.js           # Click ripple for .btn-ripple
├── scripts/
│   └── copy-static.mjs     # Copies static files into dist/
├── public/                 # Static assets served as-is
│   ├── favicon.svg
│   └── images/             # e.g. local SVGs referenced where used
├── docs/                   # Deep-dive notes (deploy, UI, ripple, images, etc.)
└── dist/                   # Generated by npm run build (deploy this folder)
```

The **build** does not transpile or minify JavaScript—it **copies** your sources. That keeps the pipeline transparent for beginners.

**Build script behavior (conceptual):**

```text
copy: index.html, styles.css → dist/
copy: js/ → dist/js/
copy: public/ → dist/public/
```

---

## Dependencies & dev tools

### Runtime (browser)

- **None** via npm for the live site—only **native modules** loaded from `/js/*.js`.

### npm `devDependencies` (development only)

| Package        | Role                                                     |
| -------------- | -------------------------------------------------------- |
| **eslint**     | Static analysis for `js/**/*.js`.                        |
| **@eslint/js** | ESLint recommended baseline rules.                       |
| **globals**    | Browser global definitions (`window`, `document`, etc.). |

**Install dev tools:**

```bash
npm install
```

**Example lint run:**

```bash
npm run lint
```

---

## How to run locally

### Prerequisites

- A modern browser (Chrome, Firefox, Safari, Edge).
- **Node.js 18+** (recommended) if you want `npm run build` / `npm run lint`.
- Optional: **VS Code** with **Live Server** (or any static server) for correct module loading and clean URLs.

### Option A — Static server (recommended)

From the project root:

```bash
npx serve .
```

Then open the URL it prints (often `http://localhost:3000`). Use **`/`** and client routes like **`/tech`**.

### Option B — VS Code Live Server

Open the folder, right-click **`index.html`** → **Open with Live Server**. Ensure the server root is the **project root** so `/js/main.js` and `/styles.css` resolve.

### Option C — Open file directly

Double-clicking `index.html` may work in some browsers for the home view, but **ES modules and absolute paths** can break with `file://`. Prefer Option A or B.

---

## Build & deploy

### Build

```bash
npm run build
```

Output: **`dist/`** with `index.html`, `styles.css`, `js/`, `public/`.

### Vercel

This repo includes **`vercel.json`** with:

- **`buildCommand`:** `npm run build`
- **`outputDirectory`:** `dist`
- **`rewrites`:** all routes → `/index.html` (SPA fallback)

More detail: **`docs/VERCEL-PLAIN-JS-DEPLOY.md`**.

---

## Reusing this project elsewhere

**Patterns worth copying:**

1. **Shell + outlet** — Keep nav/footer in HTML; swap only `#app` for faster “SPA feel” without a framework.
2. **Route map** — One object mapping paths to render functions; extend with new keys and templates.
3. **Central images** — One module for media URLs keeps coursework maintainable.
4. **Event delegation** — Ripples and form guards on `document` reduce per-element wiring.
5. **Design tokens** — CSS custom properties in `styles.css` for colors, radii, and spacing—swap tokens to rebrand.

**To reuse in another project:** copy `js/router.js` (adapt `ROUTES`), `main.js` (trim features you do not need), and the relevant **CSS** sections. Replace **branding**, **routes**, and **`images.js`** with your own content.

---

## Documentation in `docs/`

| File                               | Topic                                       |
| ---------------------------------- | ------------------------------------------- |
| `VERCEL-PLAIN-JS-DEPLOY.md`        | Deploying this static/SPA layout on Vercel. |
| `VERCEL_PRODUCTION_GUARDRAILS.md`  | Production-oriented notes.                  |
| `RIPPLE_BUTTON_EFFECT.md`          | Ripple + CTA shine implementation notes.    |
| `UI_STYLING_GUIDE.md`              | Styling conventions / UI guidance.          |
| `SAFE_IMAGE_REUSABLE_COMPONENT.md` | Image usage patterns.                       |

---

## Keywords

`HTML5`, `CSS3`, `JavaScript`, `ES modules`, `Vanilla JS`, `SPA`, `client-side routing`, `History API`, `static site`, `responsive design`, `Flexbox`, `CSS Grid`, `accessibility`, `Intersection Observer`, `Vercel`, `frontend fundamentals`, `landing page`, `TechNEXT`, `Unsplash`, `Font Awesome`, `ESLint`, `open source`, `MIT License`, `learning project`, `web development`, `portfolio`

---

## Credits

- Original tutorial inspiration: **Brian Design** (YouTube); this repo extends that direction with routing, build output, and expanded UI.
- **Font Awesome** — icons ([fontawesome.com](https://fontawesome.com/)).
- **Google Fonts** — **Sora** & **IBM Plex Sans**.
- **Unsplash** — photography via direct URLs ([unsplash.com](https://unsplash.com/)); follow the [Unsplash License](https://unsplash.com/license) for real projects.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

---

## Happy coding! 🎉

This is an **open-source project** — feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊

---
