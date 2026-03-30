/**
 * ESLint flat config: browser globals + ES modules for everything under `js/`.
 * Run `npm run lint` before commits or CI; does not affect runtime in the browser.
 */
import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["js/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.browser }
    }
  }
];
