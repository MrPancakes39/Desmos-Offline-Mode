import type { OxlintConfig } from "oxlint";

export const accessibilityRules = {
  "jsx-a11y/anchor-ambiguous-text": "error",
  "jsx-a11y/interactive-supports-focus": [
    "error",
    {
      tabbable: ["button", "checkbox", "link", "searchbox", "spinbutton", "switch", "textbox"],
    },
  ],
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
  "jsx-a11y/no-static-element-interactions": [
    "error",
    {
      allowExpressionValues: true,
      handlers: ["onClick", "onMouseDown", "onMouseUp", "onKeyPress", "onKeyDown", "onKeyUp"],
    },
  ],
} satisfies NonNullable<OxlintConfig["rules"]>;
