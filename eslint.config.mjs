// @ts-check

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintConfigPrettier from "eslint-config-prettier";
import love from "eslint-config-love";

export default tseslint.config(
  { ignores: ["dist", "fetch_desmos_res", "public/desmos"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      love,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      sourceType: "module",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // File Formatting
      "linebreak-style": ["error", "unix"],
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: "~/**",
              group: "internal",
            },
          ],
        },
      ],
      // We have to disable this for returning JSX from functions to work
      "@typescript-eslint/no-unsafe-return": "off",
      // Disable some love eslint rules
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-magic-numbers": "off",
      "@typescript-eslint/prefer-destructuring": "off",
      "@typescript-eslint/class-methods-use-this": "off",
      "@typescript-eslint/no-unnecessary-type-parameters": "off",
      "promise/avoid-new": "off",
      "no-console": "off",
      "no-alert": "off",
      // TS ESLint
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "@typescript-eslint/no-confusing-void-expression": [
        "error",
        {
          ignoreArrowShorthand: true,
        },
      ],
    },
  },
  jsxA11y.flatConfigs.recommended,
  eslintConfigPrettier
);
