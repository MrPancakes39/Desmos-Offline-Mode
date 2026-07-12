import type { OxlintConfig } from "oxlint";

export const modulesRules = {
  "promise/avoid-new": "off",
  "promise/param-names": ["error"],
  "import/first": ["error"],
  "import/no-cycle": ["error"],
  "import/no-absolute-path": [
    "error",
    {
      esmodule: true,
      commonjs: true,
      amd: false,
    },
  ],
  "import/no-duplicates": ["error"],
  "import/no-named-default": ["error"],
  "import/no-self-import": ["error"],
  "import/no-webpack-loader-syntax": ["error"],
  "node/handle-callback-err": ["error", "^(err|error)$"],
  "node/no-exports-assign": ["error"],
  "node/no-new-require": ["error"],
  "node/no-path-concat": ["error"],
} satisfies NonNullable<OxlintConfig["rules"]>;
