/* oxlint-disable max-lines -- JSON dump of shortcuts */

export type Shortcut =
  | {
      i18nKey: string;
      standard: string;
      apple?: string;
    }
  | {
      latex: string;
      standard: string;
    };

export interface Hotkeys {
  i18nSectionKey: string;
  shortcuts: Shortcut[];
};

export interface GraphingShortcuts {
  commonsymbols: Hotkeys;
  tables: Hotkeys;
  sliders: Hotkeys;
  audiotrace: Hotkeys;
  slidertrace: Hotkeys;
  interactivepoints: Hotkeys;
  commonactions: Hotkeys;
  desmoscomonly: Hotkeys;
  braille: Hotkeys;
  mathquill: Hotkeys;
};

export interface GeoShortcuts extends GraphingShortcuts {
  toolSelection: Hotkeys;
  graphNavigation: Hotkeys;
  expressionEdit: Hotkeys;
  tokenNavigator: Hotkeys;
};

const brailleShortcuts: Hotkeys = {
  i18nSectionKey: "shared-calculator-heading-keyboard-shortcuts-braille",
  shortcuts: [
    {
      i18nKey: "shared-calculator-text-keyboard-shortcut-nemeth-mode",
      standard: "<key>ALT</key> + <key>N</key>",
      apple: "<key>CTRL</key> + <key>N</key>",
    },
    {
      i18nKey: "shared-calculator-text-keyboard-shortcut-ueb-mode",
      standard: "<key>ALT</key> + <key>U</key>",
      apple: "<key>CTRL</key> + <key>U</key>",
    },
    {
      i18nKey: "shared-calculator-text-keyboard-shortcut-print-mode",
      standard: "<key>ALT</key> + <key>Q</key>",
      apple: "<key>CTRL</key> + <key>Q</key>",
    },
    {
      i18nKey: "shared-calculator-text-keyboard-shortcut-toggle-braille-typing",
      standard: "<key>ALT</key> + <key>6</key>",
      apple: "<key>CTRL</key> + <key>6</key>",
    },
  ],
};

function getMathQuillShortcuts(options: { decimalToFraction: boolean }): Hotkeys {
  const tmp = {
    i18nSectionKey: "shared-calculator-heading-keyboard-shortcuts-expression-entry-and-navigation",
    shortcuts: [
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-previous-expression",
        standard: "<key>UP ARROW</key>, <key>SHIFT</key> + <key>Tab</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-next-expression",
        standard: "<key>DOWN ARROW</key>, <key>Tab</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-remove-empty-expression",
        standard: "<key>Backspace</key>",
        apple: "<key>Delete</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-previous-character",
        standard: "<key>LEFT ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-next-character",
        standard: "<key>RIGHT ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-move-to-numerator",
        standard: "<key>UP ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-move-to-denominator",
        standard: "<key>DOWN ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-exit-block",
        standard: "<key>Tab</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-beginning-of-block",
        standard: "<key>Home</key>",
        apple: "<key>Fn</key> + <key>LEFT ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-end-of-block",
        standard: "<key>End</key>",
        apple: "<key>Fn</key> + <key>RIGHT ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-beginning-of-expression",
        standard: "<key>CTRL</key> + <key>Home</key>",
        apple: "<key>CTRL</key> + <key>Fn</key> + <key>LEFT ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-end-of-expression",
        standard: "<key>CTRL</key> + <key>End</key>",
        apple: "<key>CTRL</key> + <key>Fn</key> + <key>RIGHT ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-increase-selection-left",
        standard: "<key>SHIFT</key> + <key>LEFT ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-increase-selection-right",
        standard: "<key>SHIFT</key> + <key>RIGHT ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-delete-selection",
        standard: "<key>Backspace</key>",
        apple: "<key>Delete</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-select-all",
        standard: "<key>CTRL</key> + <key>A</key>",
        apple: "<key>COMMAND</key> + <key>A</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-speak-parent-block",
        standard: "<key>CTRL</key> + <key>ALT</key> + <key>UP ARROW</key>",
        apple: "<key>CTRL</key> + <key>Option</key> + <key>UP ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-speak-focused-block",
        standard: "<key>CTRL</key> + <key>ALT</key> + <key>DOWN ARROW</key>",
        apple: "<key>CTRL</key> + <key>Option</key> + <key>DOWN ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-speak-left-adjacent-block",
        standard: "<key>CTRL</key> + <key>ALT</key> + <key>LEFT ARROW</key>",
        apple: "<key>CTRL</key> + <key>Option</key> + <key>LEFT ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-speak-right-adjacent-block",
        standard: "<key>CTRL</key> + <key>ALT</key> + <key>RIGHT ARROW</key>",
        apple: "<key>CTRL</key> + <key>Option</key> + <key>RIGHT ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-speak-selection",
        standard: "<key>CTRL</key> + <key>ALT</key> + <key>SHIFT</key> + <key>DOWN ARROW</key>",
        apple: "<key>CTRL</key> + <key>Option</key> + <key>SHIFT</key> + <key>DOWN ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-speak-answer",
        standard: "<key>CTRL</key> + <key>ALT</key> + <key>=</key>",
        apple: "<key>CTRL</key> + <key>Option</key> + <key>SHIFT</key> + <key>RIGHT ARROW</key>",
      },
    ],
  };
  if (options.decimalToFraction) {
    tmp.shortcuts.push({
      i18nKey: "shared-calculator-text-keyboard-shortcut-show-answer-as-decimal-or-fraction",
      standard: "<key>ALT</key> + <key>SHIFT</key> + <key>A</key>",
      apple: "<key>COMMAND</key> + <key>SHIFT</key> + <key>A</key>",
    });
  }
  return tmp;
}

// oxlint-disable-next-line eslint/max-lines-per-function
function getCalcShortcuts(options: { isGeometry: boolean }): GraphingShortcuts {
  return {
    commonsymbols: getCommonSymbolsShortcuts(options),
    tables: {
      i18nSectionKey: "shared-calculator-heading-keyboard-shortcuts-tables",
      shortcuts: [
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-table-previous-cell",
          standard: "<key>SHIFT</key> + <key>TAB</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-table-next-cell",
          standard: "<key>TAB</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-table-previous-row",
          standard: "<key>UP ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-table-next-row",
          standard: "<key>DOWN ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-table-previous-column",
          standard: "<key>LEFT ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-table-next-column",
          standard: "<key>RIGHT ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-table-first-row",
          standard: "<key>CTRL</key> + <key>UP ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-table-last-row",
          standard: "<key>CTRL</key> + <key>DOWN ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-table-first-column",
          standard: "<key>CTRL</key> + <key>LEFT ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-table-last-column",
          standard: "<key>CTRL</key> + <key>RIGHT ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-table-speak-column-header",
          standard: "<key>CTRL</key> + <key>H</key>",
        },
      ],
    },
    sliders: {
      i18nSectionKey: "shared-calculator-heading-keyboard-shortcuts-sliders",
      shortcuts: [
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-slider-decrease",
          standard: "<key>LEFT ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-slider-decrease-larger",
          standard: "<key>PAGE DOWN</key>",
          apple: "<key>FN</key> + <key>DOWN ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-slider-increase",
          standard: "<key>RIGHT ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-slider-increase-larger",
          standard: "<key>PAGE UP</key>",
          apple: "<key>FN</key> + <key>UP ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-slider-minimum",
          standard: "<key>HOME</key>",
          apple: "<key>FN</key> + <key>LEFT ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-slider-maximum",
          standard: "<key>END</key>",
          apple: "<key>FN</key> + <key>RIGHT ARROW</key>",
        },
      ],
    },
    audiotrace: {
      i18nSectionKey: "shared-calculator-heading-keyboard-shortcuts-audio-tracing",
      shortcuts: [
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-toggle-audio-trace",
          standard: "<key>ALT</key> + <key>T</key>",
          apple: "<key>OPTION</key> + <key>T</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-summarize-graph",
          standard: "<key>ALT</key> + <key>S</key>",
          apple: "<key>OPTION</key> + <key>S</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-describe-axes",
          standard: "<key>ALT</key> + <key>G</key>",
          apple: "<key>OPTION</key> + <key>G</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-previous-point",
          standard: "<key>LEFT ARROW</key>, <key>UP ARROW</key>, <key>J</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-next-point",
          standard: "<key>RIGHT ARROW</key>, <key>DOWN ARROW</key>, <key>L</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-previous-poi",
          standard: "<key>PAGE UP</key>, <key>SHIFT</key> + <key>TAB</key>, <key>K</key>",
          apple: "<key>FN</key> + <key>UP ARROW</key>, <key>SHIFT</key> + <key>TAB</key>, <key>K</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-next-poi",
          standard: "<key>PAGE DOWN</key>, <key>TAB</key>, <key>I</key>",
          apple: "<key>FN</key> + <key>DOWN ARROW</key>, <key>TAB</key>, <key>I</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-first-point",
          standard: "<key>HOME</key>, <key>U</key>",
          apple: "<key>FN</key> + <key>LEFT ARROW</key>, <key>U</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-last-point",
          standard: "<key>END</key> <key>N</key>",
          apple: "<key>FN</key> + <key>RIGHT ARROW</key> <key>N</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-speak-poi-count",
          standard: "<key>P</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-speak-x",
          standard: "<key>X</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-speak-y",
          standard: "<key>Y</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-speak-color",
          standard: "<key>C</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-speak-branch",
          standard: "<key>B</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-speak-point-type",
          standard: "<key>T</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-move-to-origin",
          standard: "<key>O</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-previous-curve",
          standard: "<key>ALT</key> + <key>UP ARROW</key>",
          apple: "<key>OPTION</key> + <key>UP ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-next-curve",
          standard: "<key>ALT</key> + <key>DOWN ARROW</key>",
          apple: "<key>OPTION</key> + <key>DOWN ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-hear-graph",
          standard: "<key>H</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-hear-specific-branch",
          standard: "<key>1</key> - <key>0</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-adjust-playback-speed",
          standard: "<key>ALT</key> + <key>1</key> - <key>5</key>",
          apple: "<key>OPTION</key> + <key>1</key> - <key>5</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-increase-volume",
          standard: "<key>V</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-decrease-volume",
          standard: "<key>SHIFT</key> + <key>V</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-announce-slider-animations",
          standard: "<key>A</key>",
        },
      ],
    },
    slidertrace: {
      i18nSectionKey: "shared-calculator-heading-keyboard-shortcuts-slider-trace",
      shortcuts: [
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-toggle-slider-trace",
          standard: "<key>S</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-slider-trace-decrease",
          standard: "<key>LEFT ARROW</key> <key>J</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-slider-trace-decrease-larger",
          standard: "<key>PAGE DOWN</key>",
          apple: "<key>FN</key> + <key>DOWN ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-slider-trace-increase",
          standard: "<key>RIGHT ARROW</key> <key>L</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-slider-trace-increase-larger",
          standard: "<key>PAGE UP</key>",
          apple: "<key>FN</key> + <key>UP ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-slider-trace-minimum",
          standard: "<key>HOME</key> <key>U</key>",
          apple: "<key>FN</key> + <key>LEFT ARROW</key> <key>U</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-slider-trace-maximum",
          standard: "<key>END</key> <key>N</key>",
          apple: "<key>FN</key> + <key>RIGHT ARROW</key> <key>N</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-slider-trace-next-slider",
          standard: "<key>DOWN ARROW</key>, <key>TAB</key>, <key>K</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-slider-trace-previous-slider",
          standard: "<key>UP ARROW</key>, <key>SHIFT</key> + <key>TAB</key>, <key>I</key>",
        },
      ],
    },
    interactivepoints: {
      i18nSectionKey: "shared-calculator-heading-keyboard-shortcuts-interactive-points",
      shortcuts: [
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-focus-first-interactive-point",
          standard: "<key>CTRL</key> + <key>ALT</key> + <key>P</key>",
          apple: "<key>CTRL</key> + <key>COMMAND</key> + <key>P</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-next-interactive-point",
          standard: "<key>TAB</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-previous-interactive-point",
          standard: "<key>SHIFT</key> + <key>TAB</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-increase-x",
          standard: "<key>RIGHT ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-decrease-x",
          standard: "<key>LEFT ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-increase-y",
          standard: "<key>UP ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-decrease-y",
          standard: "<key>DOWN ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-increase-x-larger",
          standard: "<key>SHIFT</key> + <key>RIGHT ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-decrease-x-larger",
          standard: "<key>SHIFT</key> + <key>LEFT ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-increase-y-larger",
          standard: "<key>SHIFT</key> + <key>UP ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-decrease-y-larger",
          standard: "<key>SHIFT</key> + <key>DOWN ARROW</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-speak-x",
          standard: "<key>X</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-speak-y",
          standard: "<key>Y</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-speak-label",
          standard: "<key>L</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-speak-color",
          standard: "<key>C</key>",
        },
      ],
    },
    commonactions: getCommonActionsShortcuts({
      folders: true,
      notes: true,
      images: true,
      authorFeatures: false,
    }),
    desmoscomonly: {
      i18nSectionKey: "shared-calculator-heading-keyboard-shortcuts-desmos-com-only",
      shortcuts: [
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-open-shortcuts-dialog",
          standard: "<key>CTRL</key> + <key>/</key>",
          apple: "<key>COMMAND</key> + <key>/</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-open-a-graph",
          standard: "<key>CTRL</key> + <key>O</key>",
          apple: "<key>COMMAND</key> + <key>O</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-save-a-graph",
          standard: "<key>CTRL</key> + <key>S</key>",
          apple: "<key>COMMAND</key> + <key>S</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-print-a-graph",
          standard: "<key>CTRL</key> + <key>P</key>",
          apple: "<key>COMMAND</key> + <key>P</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-toggle-account-menu",
          standard: "<key>CTRL</key> + <key>ALT</key> + <key>A</key>",
          apple: "<key>CTRL</key> + <key>COMMAND</key> + <key>A</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-toggle-help-menu",
          standard: "<key>CTRL</key> + <key>ALT</key> + <key>H</key>",
          apple: "<key>CTRL</key> + <key>COMMAND</key> + <key>H</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-toggle-language-menu",
          standard: "<key>CTRL</key> + <key>ALT</key> + <key>L</key>",
          apple: "<key>CTRL</key> + <key>COMMAND</key> + <key>L</key>",
        },
        {
          i18nKey: "shared-calculator-text-keyboard-shortcut-toggle-share-menu",
          standard: "<key>CTRL</key> + <key>ALT</key> + <key>S</key>",
          apple: "<key>CTRL</key> + <key>COMMAND</key> + <key>S</key>",
        },
      ],
    },
    braille: brailleShortcuts,
    mathquill: getMathQuillShortcuts({
      decimalToFraction: true,
    }),
  };
}

function getCommonSymbolsShortcuts(options: { isGeometry: boolean }): Hotkeys {
  const tmp = {
    i18nSectionKey: "shared-calculator-heading-keyboard-shortcuts-common-symbols",
    shortcuts: [
      {
        latex: "a^b",
        standard: "<key>^</key> (<key>SHIFT</key> + <key>6</key>)",
      },
      {
        latex: "a_b",
        standard: "<key>_</key> (<key>SHIFT</key> + <key>-</key>)",
      },
      {
        latex: "\\le",
        standard: "<key><</key><key>=</key>",
      },
      {
        latex: "\\ge",
        standard: "<key>></key><key>=</key>",
      },
      {
        latex: "a'",
        standard: "<key>'</key>",
      },
      {
        latex: "\\frac{a}{b}",
        standard: "<key>f</key><key>r</key><key>a</key><key>c</key>",
      },
      {
        latex: "\\sqrt{a}",
        standard: "<key>s</key><key>q</key><key>r</key><key>t</key>",
      },
      {
        latex: "\\sqrt[3]{a}",
        standard: "<key>c</key><key>b</key><key>r</key><key>t</key>",
      },
      {
        latex: "\\sqrt[n]{a}",
        standard: "<key>n</key><key>t</key><key>h</key><key>r</key><key>o</key><key>o</key><key>t</key>",
      },
      {
        latex: "\\sum_{n=a}^b",
        standard: "<key>s</key><key>u</key><key>m</key>",
      },
    ],
  };
  tmp.shortcuts = [
    ...tmp.shortcuts,
    {
      latex: "\\int_a^b",
      standard: options.isGeometry
        ? "<key>i</key><key>n</key><key>t</key><key>e</key><key>g</key><key>r</key><key>a</key><key>l</key>"
        : "<key>i</key><key>n</key><key>t</key>",
    },
    {
      latex: "\\prod_{n=a}^b",
      standard: "<key>p</key><key>r</key><key>o</key><key>d</key>",
    },
    {
      latex: "\\pi",
      standard: "<key>p</key><key>i</key>",
    },
    {
      latex: "\\theta",
      standard: "<key>t</key><key>h</key><key>e</key><key>t</key><key>a</key>",
    },
    {
      latex: "\\to",
      standard: "<key>-</key><key>></key>",
    },
  ];
  return tmp;
}

// oxlint-disable-next-line eslint/max-lines-per-function
function getCommonActionsShortcuts(options: {
  notes: boolean;
  folders: boolean;
  images: boolean;
  authorFeatures: boolean;
}): Hotkeys {
  const tmp = {
    i18nSectionKey: "shared-calculator-heading-keyboard-shortcuts-common-actions",
    shortcuts: [
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-close-a-dialog",
        standard: "<key>ESC</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-show-or-hide-expression-list",
        standard: "<key>SHIFT</key> + <key>ALT</key> + <key>E</key>",
        apple: "<key>SHIFT</key> + <key>COMMAND</key> + <key>E</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-focus-expression-list",
        standard: "<key>CTRL</key> + <key>ALT</key> + <key>E</key>",
        apple: "<key>CTRL</key> + <key>COMMAND</key> + <key>E</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-open-expression-options",
        standard: "<key>CTRL</key> + <key>SHIFT</key> + <key>O</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-show-or-hide-expression",
        standard: "<key>SHIFT</key> + <key>ALT</key> + <key>H</key>",
        apple: "<key>SHIFT</key> + <key>COMMAND</key> + <key>H</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-delete-expression",
        standard: "<key>CTRL</key> + <key>SHIFT</key> + <key>D</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-degrees-toggle",
        standard: "<key>ALT</key> + <key>D</key>",
        apple: "<key>CTRL</key> + <key>D</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-keypad-toggle",
        standard: "<key>ALT</key> + <key>K</key>",
        apple: "<key>CTRL</key> + <key>K</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-mute-toggle",
        standard: "<key>ALT</key> + <key>M</key>",
        apple: "<key>CTRL</key> + <key>M</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-add-expression",
        standard: "<key>CTRL</key> + <key>ALT</key> + <key>X</key>",
        apple: "<key>CTRL</key> + <key>COMMAND</key> + <key>X</key>",
      },
    ],
  };
  if (options.notes) {
    tmp.shortcuts.push({
      i18nKey: "shared-calculator-text-keyboard-shortcut-add-note",
      standard: "<key>CTRL</key> + <key>ALT</key> + <key>O</key>",
      apple: "<key>CTRL</key> + <key>COMMAND</key> + <key>O</key>",
    });
  }
  if (options.folders) {
    tmp.shortcuts = tmp.shortcuts.concat([
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-add-folder",
        standard: "<key>CTRL</key> + <key>ALT</key> + <key>F</key>",
        apple: "<key>CTRL</key> + <key>COMMAND</key> + <key>F</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-collapse-folder",
        standard: "<key>ALT</key> + <key>UP ARROW</key>",
        apple: "<key>COMMAND</key> + <key>UP ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-expand-folder",
        standard: "<key>ALT</key> + <key>DOWN ARROW</key>",
        apple: "<key>COMMAND</key> + <key>DOWN ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-collapse-all-folders",
        standard: "<key>ALT</key> + <key>SHIFT</key> + <key>UP ARROW</key>",
        apple: "<key>COMMAND</key> + <key>SHIFT</key> + <key>UP ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-expand-all-folders",
        standard: "<key>ALT</key> + <key>SHIFT</key> + <key>DOWN ARROW</key>",
        apple: "<key>COMMAND</key> + <key>SHIFT</key> + <key>DOWN ARROW</key>",
      },
    ]);
  }
  if (options.images) {
    tmp.shortcuts.push({
      i18nKey: "shared-calculator-text-keyboard-shortcut-add-image",
      standard: "<key>CTRL</key> + <key>ALT</key> + <key>I</key>",
      apple: "<key>CTRL</key> + <key>COMMAND</key> + <key>I</key>",
    });
  }
  tmp.shortcuts = tmp.shortcuts.concat([
    {
      i18nKey: "shared-calculator-text-keyboard-shortcut-add-table",
      standard: "<key>CTRL</key> + <key>ALT</key> + <key>T</key>",
      apple: "<key>CTRL</key> + <key>COMMAND</key> + <key>T</key>",
    },
    {
      i18nKey: "shared-calculator-text-keyboard-shortcut-undo",
      standard: "<key>CTRL</key> + <key>Z</key>",
      apple: "<key>COMMAND</key> + <key>Z</key>",
    },
    {
      i18nKey: "shared-calculator-text-keyboard-shortcut-redo",
      standard: "<key>CTRL</key> + <key>SHIFT</key> + <key>Z</key>",
      apple: "<key>COMMAND</key> + <key>SHIFT</key> + <key>Z</key>",
    },
    {
      i18nKey: "shared-calculator-text-keyboard-shortcut-zoom-in",
      standard: "<key>ALT</key> + <key>+</key>",
      apple: "<key>CTRL</key> + <key>+</key>",
    },
    {
      i18nKey: "shared-calculator-text-keyboard-shortcut-zoom-out",
      standard: "<key>ALT</key> + <key>-</key>",
      apple: "<key>CTRL</key> + <key>-</key>",
    },
    {
      i18nKey: "shared-calculator-text-keyboard-shortcut-zoom-restore-default",
      standard: "<key>ALT</key> + <key>0</key>",
      apple: "<key>CTRL</key> + <key>0</key>",
    },
    {
      i18nKey: "shared-calculator-text-keyboard-shortcut-zoom-fit",
      standard: "<key>SHIFT</key> + <key>ALT</key> + <key>Z</key>",
      apple: "<key>SHIFT</key> + <key>OPTION</key> + <key>Z</key>",
    },
    {
      i18nKey: "shared-calculator-text-keyboard-shortcut-toggle-edit-list-mode",
      standard: "<key>CTRL</key> + <key>ALT</key> + <key>D</key>",
      apple: "<key>CTRL</key> + <key>OPTION</key> + <key>D</key>",
    },
    {
      i18nKey: "shared-calculator-text-keyboard-shortcut-toggle-graph-settings-menu",
      standard: "<key>CTRL</key> + <key>ALT</key> + <key>G</key>",
      apple: "<key>CTRL</key> + <key>COMMAND</key> + <key>G</key>",
    },
  ]);
  if (options.authorFeatures) {
    tmp.shortcuts.push({
      i18nKey: "shared-calculator-text-keyboard-shortcut-toggle-author-mode",
      standard: "<key>ALT</key> + <key>SHIFT</key> + <key>O</key>",
      apple: "<key>COMMAND</key> + <key>SHIFT</key> + <key>O</key>",
    });
  }
  return tmp;
}
const graphingShortcuts = getCalcShortcuts({
  isGeometry: false,
});

const geometryShortcuts: GeoShortcuts = {
  toolSelection: {
    i18nSectionKey: "shared-calculator-heading-keyboard-shortcuts-geometry-tool-selection",
    shortcuts: [
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-focus-toolbar",
        standard: "<key>CTRL</key> + <key>ALT</key> + <key>M</key>",
        apple: "<key>CTRL</key> + <key>COMMAND</key> + <key>M</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-move-between-toolbar-categories",
        standard: "<key>LEFT ARROW</key>, <key>RIGHT ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-move-between-toolbar-dropdown-items",
        standard: "<key>UP ARROW</key>, <key>DOWN ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-choose-toolbar-item-and-focus-graph",
        standard: "<key>ENTER</key>",
        apple: "<key>RETURN</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-cancel-active-tool",
        standard: "<key>ESC</key>",
      },
    ],
  },
  graphNavigation: {
    i18nSectionKey: "shared-calculator-heading-keyboard-shortcuts-geometry-graph-navigation-during-construction",
    shortcuts: [
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-focus-graph-paper",
        standard: "<key>CTRL</key> + <key>ALT</key> + <key>P</key>",
        apple: "<key>CTRL</key> + <key>COMMAND</key> + <key>P</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-navigate-graph",
        standard: "<key>UP ARROW</key>, <key>DOWN ARROW</key>, <key>LEFT ARROW</key>, <key>RIGHT ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-move-to-top-of-graph",
        standard: "<key>CTRL</key> + <key>UP ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-move-to-bottom-of-graph",
        standard: "<key>CTRL</key> + <key>DOWN ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-move-to-left-of-graph",
        standard: "<key>CTRL</key> + <key>LEFT ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-move-to-right-of-graph",
        standard: "<key>CTRL</key> + <key>RIGHT ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-next-object",
        standard: "<key>TAB</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-previous-object",
        standard: "<key>SHIFT</key> + <key>TAB</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-describe-object",
        standard: "<key>D</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-repeat-active-tool-prompt",
        standard: "<key>?</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-select-tool-by-number",
        standard: "<key>1</key>, <key>2</key>, <key>3</key>, ..., <key>6</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-select-next-category",
        standard: "<key>=</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-select-previous-category",
        standard: "<key>-</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-select-next-tool-within-category",
        standard: "<key>]</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-select-previous-tool-within-category",
        standard: "<key>[</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-add-object-to-selection",
        standard: "<key>ENTER</key>",
        apple: "<key>RETURN</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-drag-movable-objects",
        standard: "<key>UP ARROW</key>, <key>DOWN ARROW</key>, <key>LEFT ARROW</key>, <key>RIGHT ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-delete-selected-objects",
        standard: "<key>DELETE</key>, <key>BACKSPACE</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-focus-selected-objects-toolbar",
        standard: "<key>CTRL</key> + <key>ALT</key> + <key>M</key>",
        apple: "<key>CTRL</key> + <key>COMMAND</key> + <key>M</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-open-options",
        standard: "<key>CTRL</key> + <key>SHIFT</key> + <key>O</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-open-transformation-options",
        standard: "<key>CTRL</key> + <key>SHIFT</key> + <key>A</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-deselect-all-objects",
        standard: "<key>ESC</key>",
      },
    ],
  },
  expressionEdit: {
    i18nSectionKey: "shared-calculator-heading-keyboard-shortcuts-geometry-expression-edit",
    shortcuts: [
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-focus-graph-paper",
        standard: "<key>CTRL</key> + <key>ALT</key> + <key>P</key>",
        apple: "<key>CTRL</key> + <key>COMMAND</key> + <key>P</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-navigate-graph",
        standard: "<key>UP ARROW</key>, <key>DOWN ARROW</key>, <key>LEFT ARROW</key>, <key>RIGHT ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-move-to-top-of-graph",
        standard: "<key>CTRL</key> + <key>UP ARROW</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-expression-edit-next-object",
        standard: "<key>TAB</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-expression-edit-previous-object",
        standard: "<key>SHIFT</key> + <key>TAB</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-expression-edit-add-object",
        standard: "<key>ENTER</key>",
        apple: "<key>RETURN</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-expression-edit-complete",
        standard: "<key>ENTER</key>",
        apple: "<key>RETURN</key>",
      },
    ],
  },
  tokenNavigator: {
    i18nSectionKey: "shared-calculator-heading-keyboard-shortcuts-geometry-token-navigator",
    shortcuts: [
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-open-token-navigator",
        standard: "<key>CTRL</key> + <key>ALT</key> + <key>C</key>",
        apple: "<key>CTRL</key> + <key>COMMAND</key> + <key>C</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-close-token-navigator",
        standard: "<key>ESC</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-navigate-tokens-at-current-level",
        standard: "<key>LEFT ARROW</key>, <key>RIGHT ARROW</key",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-navigate-object-levels",
        standard: "<key>UP ARROW</key>, <key>DOWN ARROW</key",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-move-token-between-expression-list-and-navigator",
        standard: "<key>ALT</key> + <key>SHIFT</key> + <key>T</key>",
        apple: "<key>OPTION</key> + <key>SHIFT</key> + <key>T</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-select-single-object-token",
        standard: "<key>ENTER</key>",
        apple: "<key>RETURN</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-add-object-token-to-selection",
        standard: "<key>SHIFT</key> + <key>ENTER</key>",
        apple: "<key>SHIFT</key> + <key>RETURN</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-delete-selected-objects",
        standard: "<key>DELETE</key>, <key>BACKSPACE</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-focus-selected-objects-toolbar",
        standard: "<key>CTRL</key> + <key>ALT</key> + <key>M</key>",
        apple: "<key>CTRL</key> + <key>COMMAND</key> + <key>M</key>",
      },
      {
        i18nKey: "shared-calculator-text-keyboard-shortcut-geometry-open-options",
        standard: "<key>CTRL</key> + <key>SHIFT</key> + <key>O</key>",
      },
    ],
  },
  ...getCalcShortcuts({
    isGeometry: true,
  }),
};

export default {
  graphingShortcuts,
  geometryShortcuts,
};
