// @ts-check
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "scripts/**",
    ],
  },

  // Base: recommended TypeScript rules
  ...tseslint.configs.recommended,

  // Next.js plugin config
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // React hooks
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },

  // Project-specific overrides
  {
    files: ["**/*.{ts,tsx}"],

    rules: {
      // Allow `@ts-ignore` comments (we use them intentionally)
      "@typescript-eslint/ban-ts-comment": "off",

      // Allow `any` where needed (e.g., Lenis/GSAP globals)
      "@typescript-eslint/no-explicit-any": "warn",

      // Unused vars must start with `_`
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // Static export: we use <img> instead of next/image (server-side optimization unavailable)
      "@next/next/no-img-element": "off",

      // Prefer `const` when variable is never reassigned
      "prefer-const": "warn",

      // No console.log in production — use `console.warn` or `console.error` for diagnostics
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },

  // Relax rules for config and build files
  {
    files: ["*.config.{ts,js,mjs}", "scripts/**"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
);
