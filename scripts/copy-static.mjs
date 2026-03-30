/**
 * Production “build” for this static site: copy HTML/CSS/JS/public into `dist/` without bundling or minifying.
 * Hosts like Vercel point their output directory at `dist` and rewrite all routes to `index.html` for SPA refresh support.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");

if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true });

["index.html", "styles.css"].forEach((f) => {
  const src = path.join(root, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(dist, f));
  }
});

/** Recursive directory copy (used for `js/` and `public/` trees). */
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

const jsSrc = path.join(root, "js");
const jsDest = path.join(dist, "js");
if (fs.existsSync(jsSrc)) copyDir(jsSrc, jsDest);

copyDir(path.join(root, "public"), path.join(dist, "public"));
