const { defineConfig } = require("eslint-define-config");
const eslintPluginReact = require("eslint-plugin-react");
const eslintPluginJsxA11y = require("eslint-plugin-jsx-a11y");
const eslintPluginReactHooks = require("eslint-plugin-react-hooks");
const eslintPluginCypress = require("eslint-plugin-cypress");
const eslintPluginTailwindcss = require("eslint-plugin-tailwindcss");

module.exports = defineConfig([
  {
    ignores: ["**/.next/**"],
    languageOptions: {
      globals: {
        "cypress/globals": true,
        browser: true,
        es2021: true,
        jest: true,
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: eslintPluginReact,
      "jsx-a11y": eslintPluginJsxA11y,
      "react-hooks": eslintPluginReactHooks,
      cypress: eslintPluginCypress,
      tailwindcss: eslintPluginTailwindcss,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/prop-types": ["warn"],
      "no-unused-vars": ["warn", { varsIgnorePattern: "^React$" }],
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": ["error", {
        "whitelistPatterns": ["^custom-"]
      }]
    },
  },
  {
    // Specific configuration for .cy.js files
    files: ["**/*.cy.js", "cypress.config.js"],
    languageOptions: {
      globals: {
        "cypress/globals": true,
      },
    },
    plugins: {
      cypress: eslintPluginCypress,
    },
    rules: {
      "no-unused-vars": "off",
      "no-console": "off",
      "cypress/no-assertion-after-screenshot": "off",
    },
  },
  {
    // Specific configuration for logging.js
    files: ["src/utils/logging.js"],
    rules: {
      "no-console": "off",
    },
  },
]);
