import type { OxlintConfig } from "oxlint";

export const qualityRules = {
  "no-case-declarations": ["error"],
  "no-constant-condition": [
    "error",
    {
      checkLoops: false,
    },
  ],
  "no-empty": [
    "error",
    {
      allowEmptyCatch: true,
    },
  ],
  "no-fallthrough": ["error"],
  "no-prototype-builtins": ["error"],
  "no-regex-spaces": ["error"],
  "no-self-assign": [
    "error",
    {
      props: true,
    },
  ],
  "no-unused-vars": [
    "warn",
    {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^jsx$",
    },
  ],
  "use-isnan": [
    "error",
    {
      enforceForSwitchCase: true,
      enforceForIndexOf: true,
    },
  ],
  "valid-typeof": [
    "error",
    {
      requireStringLiterals: true,
    },
  ],
  "no-var": ["error"],
  "prefer-const": [
    "error",
    {
      destructuring: "all",
      ignoreReadBeforeAssign: false,
    },
  ],
  "prefer-rest-params": "error",
  "prefer-spread": "error",
  "no-array-constructor": ["error"],
  "no-unused-expressions": [
    "error",
    {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true,
      enforceForJSX: false,
    },
  ],
  "no-throw-literal": "error",
  "prefer-promise-reject-errors": "error",
  "no-empty-function": [
    "error",
    {
      allow: [],
    },
  ],
  "accessor-pairs": [
    "error",
    {
      setWithoutGet: true,
      getWithoutSet: false,
      enforceForClassMembers: true,
    },
  ],
  "array-callback-return": [
    "error",
    {
      allowImplicit: false,
      allowVoid: false,
      checkForEach: false,
    },
  ],
  complexity: [
    "error",
    {
      variant: "modified",
      max: 15,
    },
  ],
  "default-case-last": ["error"],
  eqeqeq: [
    "error",
    "always",
    {
      null: "ignore",
    },
  ],
  "grouped-accessor-pairs": ["error", "getBeforeSet"],
  "guard-for-in": ["error"],
  "logical-assignment-operators": [
    "error",
    "always",
    {
      enforceForIfStatements: true,
    },
  ],
  "max-depth": [
    "error",
    {
      max: 4,
    },
  ],
  "max-lines": [
    "error",
    {
      max: 500,
      skipBlankLines: true,
      skipComments: true,
    },
  ],
  "max-lines-per-function": ["error", { max: 120,
    skipBlankLines: true,
    skipComments: true,
   }],
  "max-nested-callbacks": [
    "error",
    {
      max: 4,
    },
  ],
  "new-cap": [
    "error",
    {
      newIsCap: true,
      capIsNew: false,
      properties: true,
    },
  ],
  "no-alert": "off",
  "no-console": "off",
  "no-constructor-return": ["error"],
  "no-extend-native": ["error"],
  "no-extra-bind": ["error"],
  "no-implicit-globals": ["error"],
  "no-labels": [
    "error",
    {
      allowLoop: false,
      allowSwitch: false,
    },
  ],
  "no-lone-blocks": ["error"],
  "no-multi-str": ["error"],
  "no-new": ["error"],
  "no-new-func": ["error"],
  "no-new-wrappers": ["error"],
  "no-object-constructor": ["error"],
  "no-proto": ["error"],
  "no-return-assign": ["error", "except-parens"],
  "no-self-compare": ["error"],
  "no-sequences": ["error"],
  "no-template-curly-in-string": ["error"],
  "no-unmodified-loop-condition": ["error"],
  "no-unneeded-ternary": [
    "error",
    {
      defaultAssignment: false,
    },
  ],
  "no-useless-call": ["error"],
  "no-useless-computed-key": ["error"],
  "no-useless-return": ["error"],
  "no-void": [
    "error",
    {
      allowAsStatement: true,
    },
  ],
  "object-shorthand": ["warn", "properties"],
  "prefer-regex-literals": [
    "error",
    {
      disallowRedundantWrapping: true,
    },
  ],
  "symbol-description": ["error"],
  "unicode-bom": ["error", "never"],
  yoda: ["error", "never"],
  "init-declarations": ["error", "always"],
  "max-params": [
    "error",
    {
      max: 5,
    },
  ],
  "no-loop-func": ["error"],
  "no-useless-constructor": ["error"],
} satisfies NonNullable<OxlintConfig["rules"]>;
