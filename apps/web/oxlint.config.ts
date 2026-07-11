import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["jsx-a11y", "unicorn"],
  categories: {
    correctness: "off",
  },
  options: {
    typeAware: true,
    maxWarnings: 0,
  },
  env: {
    builtin: true,
  },
  ignorePatterns: ["dist", "fetch_desmos_res", "public/desmos", "oxlint.config.ts"],
  rules: {
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-has-content": "error",
    "jsx-a11y/anchor-is-valid": "error",
    "jsx-a11y/aria-activedescendant-has-tabindex": "error",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/aria-proptypes": "error",
    "jsx-a11y/aria-role": "error",
    "jsx-a11y/aria-unsupported-elements": "error",
    "jsx-a11y/autocomplete-valid": "error",
    "jsx-a11y/click-events-have-key-events": "error",
    "jsx-a11y/heading-has-content": "error",
    "jsx-a11y/html-has-lang": "error",
    "jsx-a11y/iframe-has-title": "error",
    "jsx-a11y/img-redundant-alt": "error",
    "jsx-a11y/interactive-supports-focus": [
      "error",
      {
        tabbable: ["button", "checkbox", "link", "searchbox", "spinbutton", "switch", "textbox"],
      },
    ],
    "jsx-a11y/label-has-associated-control": "error",
    "jsx-a11y/media-has-caption": "error",
    "jsx-a11y/mouse-events-have-key-events": "error",
    "jsx-a11y/no-access-key": "error",
    "jsx-a11y/no-autofocus": "error",
    "jsx-a11y/no-distracting-elements": "error",
    "jsx-a11y/no-interactive-element-to-noninteractive-role": [
      "error",
      {
        tr: ["none", "presentation"],
        canvas: ["img"],
      },
    ],
    "jsx-a11y/no-noninteractive-element-interactions": [
      "error",
      {
        handlers: ["onClick", "onError", "onLoad", "onMouseDown", "onMouseUp", "onKeyPress", "onKeyDown", "onKeyUp"],
        alert: ["onKeyUp", "onKeyDown", "onKeyPress"],
        body: ["onError", "onLoad"],
        dialog: ["onKeyUp", "onKeyDown", "onKeyPress"],
        iframe: ["onError", "onLoad"],
        img: ["onError", "onLoad"],
      },
    ],
    "jsx-a11y/no-noninteractive-element-to-interactive-role": [
      "error",
      {
        ul: ["listbox", "menu", "menubar", "radiogroup", "tablist", "tree", "treegrid"],
        ol: ["listbox", "menu", "menubar", "radiogroup", "tablist", "tree", "treegrid"],
        li: ["menuitem", "menuitemradio", "menuitemcheckbox", "option", "row", "tab", "treeitem"],
        table: ["grid"],
        td: ["gridcell"],
        fieldset: ["radiogroup", "presentation"],
      },
    ],
    "jsx-a11y/no-noninteractive-tabindex": [
      "error",
      {
        tags: [],
        roles: ["tabpanel"],
        allowExpressionValues: true,
      },
    ],
    "jsx-a11y/no-redundant-roles": "error",
    "jsx-a11y/no-static-element-interactions": [
      "error",
      {
        allowExpressionValues: true,
        handlers: ["onClick", "onMouseDown", "onMouseUp", "onKeyPress", "onKeyDown", "onKeyUp"],
      },
    ],
    "jsx-a11y/role-has-required-aria-props": "error",
    "jsx-a11y/role-supports-aria-props": "error",
    "jsx-a11y/scope": "error",
    "jsx-a11y/tabindex-no-positive": "error",
  },
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      rules: {
        "constructor-super": ["error"],
        "for-direction": ["error"],
        "getter-return": "off",
        "no-async-promise-executor": ["error"],
        "no-case-declarations": ["error"],
        "no-class-assign": ["error"],
        "no-compare-neg-zero": ["error"],
        "no-cond-assign": ["error"],
        "no-const-assign": ["error"],
        "no-constant-binary-expression": ["error"],
        "no-constant-condition": [
          "error",
          {
            checkLoops: false,
          },
        ],
        "no-control-regex": ["error"],
        "no-debugger": ["error"],
        "no-delete-var": ["error"],
        "no-dupe-class-members": ["error"],
        "no-dupe-else-if": ["error"],
        "no-dupe-keys": ["error"],
        "no-duplicate-case": ["error"],
        "no-empty": [
          "error",
          {
            allowEmptyCatch: true,
          },
        ],
        "no-empty-character-class": ["error"],
        "no-empty-pattern": ["error"],
        "no-empty-static-block": ["error"],
        "no-ex-assign": ["error"],
        "no-extra-boolean-cast": ["error"],
        "no-fallthrough": ["error"],
        "no-func-assign": ["error"],
        "no-global-assign": ["error"],
        "no-import-assign": ["error"],
        "no-invalid-regexp": ["error"],
        "no-irregular-whitespace": ["error"],
        "no-loss-of-precision": ["error"],
        "no-misleading-character-class": ["error"],
        "no-new-native-nonconstructor": ["error"],
        "no-nonoctal-decimal-escape": "error",
        "no-obj-calls": ["error"],
        "no-prototype-builtins": ["error"],
        "no-redeclare": "off",
        "no-regex-spaces": ["error"],
        "no-self-assign": [
          "error",
          {
            props: true,
          },
        ],
        "no-setter-return": "off",
        "no-shadow-restricted-names": ["error"],
        "no-sparse-arrays": ["error"],
        "no-this-before-super": ["error"],
        "no-unreachable": ["error"],
        "no-unsafe-finally": ["error"],
        "no-unsafe-negation": ["error"],
        "no-unsafe-optional-chaining": "error",
        "no-unused-labels": "error",
        "no-unused-private-class-members": "error",
        "no-unused-vars": [
          "warn",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^jsx$",
          },
        ],
        "no-useless-backreference": ["error"],
        "no-useless-catch": ["error"],
        "no-useless-escape": ["error"],
        "no-with": ["error"],
        "require-yield": "error",
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
        "no-implied-eval": "off",
        "no-unused-expressions": [
          "error",
          {
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true,
            enforceForJSX: false,
          },
        ],
        "no-throw-literal": "off",
        "prefer-promise-reject-errors": "off",
        "require-await": "off",
        "typescript/await-thenable": ["error"],
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
        "typescript/no-array-delete": ["error"],
        "typescript/no-base-to-string": ["error"],
        "typescript/no-duplicate-enum-values": ["error"],
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
        "typescript/no-extra-non-null-assertion": ["error"],
        "typescript/no-floating-promises": ["error"],
        "typescript/no-for-in-array": ["error"],
        "typescript/no-implied-eval": ["error"],
        "typescript/no-misused-new": ["error"],
        "typescript/no-misused-promises": [
          "error",
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],
        "typescript/no-namespace": ["error"],
        "typescript/no-non-null-asserted-optional-chain": ["error"],
        "typescript/no-redundant-type-constituents": ["error"],
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
        "typescript/no-unnecessary-type-assertion": ["error"],
        "typescript/no-unnecessary-type-constraint": ["error"],
        "typescript/no-unsafe-argument": ["error"],
        "typescript/no-unsafe-assignment": ["error"],
        "typescript/no-unsafe-call": ["error"],
        "typescript/no-unsafe-declaration-merging": ["error"],
        "typescript/no-unsafe-enum-comparison": ["error"],
        "typescript/no-unsafe-function-type": ["error"],
        "typescript/no-unsafe-member-access": ["error"],
        "typescript/no-unsafe-return": "off",
        "typescript/no-unsafe-unary-minus": ["error"],
        "typescript/no-wrapper-object-types": ["error"],
        "typescript/only-throw-error": [
          "error",
          {
            allowThrowingAny: false,
            allowThrowingUnknown: false,
          },
        ],
        "typescript/prefer-as-const": ["error"],
        "typescript/prefer-namespace-keyword": ["error"],
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
        "no-empty-function": [
          "error",
          {
            allow: [],
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
        "typescript/consistent-type-definitions": "off",
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
        "typescript/prefer-regexp-exec": ["error"],
        "typescript/prefer-string-starts-ends-with": [
          "error",
          {
            allowSingleElementEquality: "never",
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
        "arrow-body-style": [
          "error",
          "as-needed",
          {
            requireReturnForObjectLiteral: false,
          },
        ],
        complexity: [
          "error",
          {
            variant: "modified",
            max: 10,
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
            max: 5,
          },
        ],
        "max-lines": [
          "error",
          {
            max: 450,
            skipBlankLines: true,
            skipComments: true,
          },
        ],
        "max-nested-callbacks": [
          "error",
          {
            max: 3,
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
        "no-caller": ["error"],
        "no-console": "off",
        "no-constructor-return": ["error"],
        "no-eval": ["error"],
        "no-extend-native": ["error"],
        "no-extra-bind": ["error"],
        "no-implicit-globals": ["error"],
        "no-iterator": ["error"],
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
        "no-useless-rename": ["error"],
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
        "promise/avoid-new": "off",
        "promise/param-names": ["error"],
        "import/first": ["error"],
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
        "import/no-webpack-loader-syntax": ["error"],
        "class-methods-use-this": "off",
        "init-declarations": ["error", "always"],
        "max-params": [
          "error",
          {
            max: 4,
          },
        ],
        "no-loop-func": ["error"],
        "no-magic-numbers": "off",
        "no-use-before-define": [
          "error",
          {
            functions: false,
            classes: false,
            enums: false,
            variables: false,
            typedefs: false,
          },
        ],
        "no-useless-constructor": ["error"],
        "node/handle-callback-err": ["error", "^(err|error)$"],
        "node/no-exports-assign": ["error"],
        "node/no-new-require": ["error"],
        "node/no-path-concat": ["error"],
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
        "typescript/no-unnecessary-parameter-property-assignment": ["error"],
        "typescript/no-unnecessary-qualifier": ["error"],
        "typescript/no-unnecessary-template-expression": ["error"],
        "typescript/no-unnecessary-type-arguments": ["error"],
        "typescript/no-unnecessary-type-parameters": "off",
        "typescript/no-unsafe-type-assertion": ["error"],
        "typescript/no-useless-empty-export": ["error"],
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
      },
      plugins: ["typescript", "node", "promise", "import"],
      env: {
        es2020: true,
        browser: true,
      },
    },
  ],
});
