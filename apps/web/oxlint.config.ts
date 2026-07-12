import { defineConfig } from "oxlint";

import { accessibilityRules } from "./oxlint/accessibility.ts";
import { modulesRules } from "./oxlint/modules.ts";
import { qualityRules } from "./oxlint/quality.ts";
import { typescriptRules } from "./oxlint/typescript.ts";
import { unicornRules } from "./oxlint/unicorn.ts";

const typescriptPlugins = ["typescript", "node", "promise", "import"] as const;
const typescriptEnv = { es2020: true, browser: true } as const;
const functionLengthOptions = {
  skipBlankLines: true,
  skipComments: true,
} as const;

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
    ...unicornRules,
  },
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      excludeFiles: ["src/controllers/modal/components/HotKeysModal/shortcuts.ts"],
      rules: {
        ...qualityRules,
        ...typescriptRules,
        ...modulesRules,
        "max-lines-per-function": ["error", { max: 120, ...functionLengthOptions }],
      },
      plugins: [...typescriptPlugins],
      env: typescriptEnv,
    },
    {
      files: ["src/controllers/modal/components/HotKeysModal/shortcuts.ts"],
      rules: {
        ...qualityRules,
        ...typescriptRules,
        ...modulesRules,
        "max-lines-per-function": ["error", { max: 400, ...functionLengthOptions }],
      },
      plugins: [...typescriptPlugins],
      env: typescriptEnv,
    },
  ],
});
