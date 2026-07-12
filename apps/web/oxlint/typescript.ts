import type { OxlintConfig } from "oxlint";

export const typescriptRules = {
  "typescript/ban-ts-comment": [
    "error",
    {
      "ts-expect-error": "allow-with-description",
      "ts-ignore": true,
      "ts-nocheck": true,
      "ts-check": false,
      minimumDescriptionLength: 3,
    },
  ],
  "typescript/no-duplicate-type-constituents": [
    "error",
    {
      ignoreIntersections: false,
      ignoreUnions: false,
    },
  ],
  "typescript/no-empty-object-type": [
    "error",
    {
      allowInterfaces: "with-single-extends",
      allowObjectTypes: "never",
    },
  ],
  "typescript/no-explicit-any": [
    "error",
    {
      fixToUnknown: false,
      ignoreRestArgs: false,
    },
  ],
  "typescript/no-misused-promises": [
    "error",
    {
      checksVoidReturn: {
        attributes: false,
      },
    },
  ],
  "typescript/no-namespace": ["error"],
  "typescript/no-require-imports": [
    "error",
    {
      allow: [],
      allowAsImport: false,
    },
  ],
  "typescript/no-this-alias": [
    "error",
    {
      allowDestructuring: true,
    },
  ],
  "typescript/no-unnecessary-condition": ["error"],
  "typescript/no-unnecessary-type-assertion": ["error"],
  "typescript/no-unnecessary-type-conversion": ["error"],
  "typescript/no-unnecessary-type-constraint": ["error"],
  "typescript/no-unsafe-argument": ["error"],
  "typescript/no-unsafe-assignment": ["error"],
  "typescript/no-unsafe-call": ["error"],
  "typescript/no-unsafe-enum-comparison": ["error"],
  "typescript/no-unsafe-function-type": ["error"],
  "typescript/no-unsafe-member-access": ["error"],
  "typescript/no-unsafe-return": ["error"],
  "typescript/only-throw-error": [
    "error",
    {
      allowThrowingAny: false,
      allowThrowingUnknown: false,
    },
  ],
  "typescript/prefer-promise-reject-errors": ["error"],
  "typescript/require-await": "off",
  "typescript/restrict-plus-operands": [
    "error",
    {
      skipCompoundAssignments: false,
    },
  ],
  "typescript/restrict-template-expressions": [
    "error",
    {
      allowNumber: true,
    },
  ],
  "typescript/triple-slash-reference": [
    "error",
    {
      lib: "never",
      path: "never",
      types: "never",
    },
  ],
  "typescript/unbound-method": [
    "error",
    {
      ignoreStatic: false,
    },
  ],
  "typescript/adjacent-overload-signatures": ["error"],
  "typescript/array-type": "off",
  "typescript/ban-tslint-comment": ["error"],
  "typescript/class-literal-property-style": ["error", "fields"],
  "typescript/consistent-generic-constructors": ["error", "constructor"],
  "typescript/consistent-indexed-object-style": ["error", "record"],
  "typescript/consistent-type-assertions": [
    "error",
    {
      assertionStyle: "as",
      objectLiteralTypeAssertions: "never",
    },
  ],
  "typescript/consistent-type-definitions": [
    "error",
    "interface"
  ],
  "typescript/dot-notation": [
    "error",
    {
      allowIndexSignaturePropertyAccess: false,
      allowKeywords: true,
      allowPattern: "",
      allowPrivateClassPropertyAccess: false,
      allowProtectedClassPropertyAccess: false,
    },
  ],
  "typescript/no-confusing-non-null-assertion": ["error"],
  "typescript/no-inferrable-types": [
    "error",
    {
      ignoreParameters: false,
      ignoreProperties: false,
    },
  ],
  "typescript/non-nullable-type-assertion-style": ["error"],
  "typescript/prefer-find": ["error"],
  "typescript/prefer-for-of": ["error"],
  "typescript/prefer-function-type": ["error"],
  "typescript/prefer-includes": ["error"],
  "typescript/prefer-nullish-coalescing": [
    "error",
    {
      ignoreConditionalTests: false,
      ignoreMixedLogicalExpressions: false,
    },
  ],
  "typescript/prefer-optional-chain": ["error"],
  "typescript/prefer-regexp-exec": ["error"],
  "typescript/prefer-string-starts-ends-with": [
    "error",
    {
      allowSingleElementEquality: "never",
    },
  ],
  "typescript/consistent-type-exports": [
    "error",
    {
      fixMixedExportsWithInlineTypeSpecifier: true,
    },
  ],
  "typescript/consistent-type-imports": [
    "warn",
    {
      prefer: "type-imports",
      fixStyle: "inline-type-imports",
    },
  ],
  "typescript/explicit-function-return-type": "off",
  "typescript/method-signature-style": ["error"],
  "typescript/no-confusing-void-expression": [
    "error",
    {
      ignoreArrowShorthand: true,
    },
  ],
  "typescript/no-deprecated": ["warn"],
  "typescript/no-dynamic-delete": ["error"],
  "typescript/no-extraneous-class": [
    "error",
    {
      allowWithDecorator: true,
    },
  ],
  "typescript/no-import-type-side-effects": ["error"],
  "typescript/no-invalid-void-type": ["error"],
  "typescript/no-meaningless-void-operator": [
    "error",
    {
      checkNever: true,
    },
  ],
  "typescript/no-misused-spread": [
    "error",
    {
      allow: [],
    },
  ],
  "typescript/no-mixed-enums": ["error"],
  "typescript/no-non-null-asserted-nullish-coalescing": ["error"],
  "typescript/no-non-null-assertion": ["error"],
  "typescript/no-unnecessary-boolean-literal-compare": ["error"],
  "typescript/no-unnecessary-qualifier": ["error"],
  "typescript/no-unnecessary-template-expression": ["error"],
  "typescript/no-unnecessary-type-arguments": ["error"],
  "typescript/no-unnecessary-type-parameters": "off",
  "typescript/no-unsafe-type-assertion": ["error"],
  "typescript/prefer-literal-enum-member": [
    "error",
    {
      allowBitwiseExpressions: true,
    },
  ],
  "typescript/prefer-readonly": ["error"],
  "typescript/prefer-reduce-type-parameter": ["error"],
  "typescript/prefer-return-this-type": ["error"],
  "typescript/promise-function-async": ["error"],
  "typescript/related-getter-setter-pairs": ["error"],
  "typescript/require-array-sort-compare": [
    "error",
    {
      ignoreStringArrays: true,
    },
  ],
  "typescript/return-await": ["error", "always"],
  "typescript/strict-boolean-expressions": [
    "error",
    {
      allowString: false,
      allowNumber: false,
      allowNullableObject: false,
      allowNullableBoolean: false,
      allowNullableString: false,
      allowNullableNumber: false,
      allowAny: false,
    },
  ],
  "typescript/switch-exhaustiveness-check": [
    "error",
    {
      allowDefaultCaseForExhaustiveSwitch: false,
      requireDefaultForNonUnion: false,
      considerDefaultExhaustiveForUnions: true,
    },
  ],
  "typescript/unified-signatures": [
    "error",
    {
      ignoreDifferentlyNamedParameters: false,
    },
  ],
  "typescript/use-unknown-in-catch-callback-variable": ["error"],
} satisfies NonNullable<OxlintConfig["rules"]>;
