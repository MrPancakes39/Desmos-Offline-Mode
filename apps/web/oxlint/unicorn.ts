import type { OxlintConfig } from "oxlint";

export const unicornRules = {
  "unicorn/require-post-message-target-origin": "error",
} satisfies NonNullable<OxlintConfig["rules"]>;
