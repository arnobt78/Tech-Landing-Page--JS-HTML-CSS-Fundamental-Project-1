/**
 * Central place for remote imagery used in `router.js` templates.
 *
 * Unsplash: no API key is needed for **direct image URLs** (what we use here). The browser simply requests
 * a JPEG/WebP like any other static asset. For programmatic search or uploads you would use the Unsplash API
 * with a server-side key instead—this project stays static for teaching clarity.
 *
 * License: https://unsplash.com/license — attribute photographers in production sites when required.
 */

/** JPEG/WebP quality query param (balance file size vs clarity for hero photography). */
const Q = 82;

/**
 * Builds a stable, sized `images.unsplash.com` URL. Keeping dimensions here avoids huge originals on mobile.
 * @param {string} photoPath e.g. "photo-1517694712202-14dd9538aa97"
 * @param {{ w?: number; h?: number }} [opts]
 */
export function unsplashPhoto(photoPath, opts = {}) {
  const w = opts.w ?? 1600;
  const h = opts.h;
  const hPart = h != null ? `&h=${h}` : "";
  return `https://images.unsplash.com/${photoPath}?auto=format&fit=crop&w=${w}${hPart}&q=${Q}`;
}

/**
 * Curated photo IDs grouped by route/section. To swap art for a lesson, change paths or `opts` only here.
 */
export const images = {
  home: {
    hero: unsplashPhoto("photo-1517694712202-14dd9538aa97", { w: 900, h: 700 }),
    heroBg: unsplashPhoto("photo-1517694712202-14dd9538aa97", { w: 1920, h: 1080 }),
    feature1: unsplashPhoto("photo-1498050108023-c5249f4df085", { w: 800, h: 500 }),
    feature2: unsplashPhoto("photo-1461749280684-dccba630e2f6", { w: 800, h: 500 }),
    feature3: unsplashPhoto("photo-1555066931-4365d14bab8c", { w: 800, h: 500 }),
    showcase: unsplashPhoto("photo-1522071820081-009f0129c71c", { w: 1200, h: 750 }),
    servicesA: unsplashPhoto("photo-1552664730-d307ca884978", { w: 900, h: 1200 }),
    servicesB: unsplashPhoto("photo-1504384308090-c894fdcc538d", { w: 900, h: 1200 }),
    servicesC: unsplashPhoto("photo-1553877522-43269d4ea984", { w: 900, h: 1200 }),
    howBanner: unsplashPhoto("photo-1551434678-e076c223a692", { w: 1400, h: 600 })
  },
  tech: {
    hero: unsplashPhoto("photo-1461749280684-dccba630e2f6", { w: 900, h: 700 }),
    heroBg: unsplashPhoto("photo-1461749280684-dccba630e2f6", { w: 1920, h: 1080 }),
    detail: unsplashPhoto("photo-1516321318423-f06f85e504b3", { w: 1200, h: 700 })
  },
  products: {
    hero: unsplashPhoto("photo-1498050108023-c5249f4df085", { w: 1600, h: 600 }),
    heroBg: unsplashPhoto("photo-1498050108023-c5249f4df085", { w: 1920, h: 1080 }),
    banner: unsplashPhoto("photo-1522071820081-009f0129c71c", { w: 1920, h: 800 }),
    card1: unsplashPhoto("photo-1551288049-bebda4e38f71", { w: 600, h: 400 }),
    card2: unsplashPhoto("photo-1551434678-e076c223a692", { w: 600, h: 400 }),
    card3: unsplashPhoto("photo-1553877522-43269d4ea984", { w: 600, h: 400 })
  },
  signUp: {
    aside: unsplashPhoto("photo-1522202176988-66273c2fd55f", { w: 800, h: 1000 })
  }
};
