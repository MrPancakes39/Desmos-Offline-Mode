import { defineConfig } from "oxlint";

import { accessibilityRules } from "./oxlint/accessibility.ts";
import { modulesRules } from "./oxlint/modules.ts";
import { qualityRules } from "./oxlint/quality.ts";
import { typescriptRules } from "./oxlint/typescript.ts";


export default defineConfig({
  plugins: ["jsx-a11y", "unicorn"],
  categories: {
    correctness: "error",
    perf: "warn",
  },
  options: {
    typeAware: true,
    typeCheck: true,
    maxWarnings: 0,
  },
  env: {
    builtin: true,
  },
  ignorePatterns: ["dist", "fetch_desmos_res", "public/desmos", "oxlint.config.ts", "oxlint"],
  rules: {
    ...accessibilityRules,
    "unicorn/require-post-message-target-origin": "error",
  },
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      rules: {
        ...qualityRules,
        ...typescriptRules,
        ...modulesRules,
      },
      plugins: ["typescript", "node", "promise", "import"],
    }
  ],
});
