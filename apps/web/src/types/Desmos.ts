import "desmos";
import type _ from "underscore";

import type {
  CheckboxComponent,
  DStaticMathquillViewComponent,
  ImageIconViewComponent,
  ExpressionIconViewComponent,
  ExpressionFooterViewComponent,
  InlineMathInputViewComponent,
  MathQuillField,
  MathQuillViewComponent,
  SegmentedControlComponent,
  TooltipComponent,
  DropdownPopoverComponent,
} from "~/components";
import type { DCGViewModule } from "~/globals/DCGView";

import type { ItemModel, ValueType, ValueTypeMap } from "./models";
import type { GraphState } from "@desmodder/graph-state";

type DesmosPublic = typeof Desmos;
export type DesmosType = DesmosPublic & {
  version: string;
  $: JQueryStatic;
  _: typeof _;
  Private: {
    Fragile: FragileType;
    Mathtools: Mathtools;
    Parser: Parser;
    MathquillConfig: MathquillConfig;
  };
  MathQuill: {
    getApiInstanceForElement: (el: Element) => null | MathQuillApi;
  };
};

export interface ShaderFunctions {
  scalarFxns: unknown;
  variadicFxns: unknown;
  intervalFxns: unknown;
}

export interface LabelOptionsBase {
  zeroCutoff?: number;
  smallCutoff?: number;
  bigCutoff?: number;
  digits?: number;
  displayAsFraction?: boolean;
  addEllipses?: boolean;
  spaceConstrained?: boolean;
  scientificNotationDigits?: number;
}

type ComponentEmitType = "decimalString" | "latex" | (string & {});

interface FragileType {
  DCGView: DCGViewModule;
  PromptSliderView: unknown;
  Checkbox: typeof CheckboxComponent;
  SegmentedControl: typeof SegmentedControlComponent;
  MathquillView: typeof MathQuillViewComponent & {
    // static abstract getFocusedMathquill()
    getFocusedMathquill: () => MathQuillField;
  };
  InlineMathInputView: typeof InlineMathInputViewComponent;
  StaticMathquillView: typeof DStaticMathquillViewComponent;
  Tooltip: typeof TooltipComponent;
  ExpressionOptionsMenuView: {
    prototype: {
      getSections: {
        apply: (m: { model: ItemModel }) => Section[];
      };
    };
  };
  ImageIconView: typeof ImageIconViewComponent;
  ExpressionIconView: typeof ExpressionIconViewComponent;
  ExpressionFooterView: typeof ExpressionFooterViewComponent;
  DropdownPopoverWithAnchorShim: typeof DropdownPopoverComponent;
  evaluateLatex: (s: string, getDegreeMode: boolean) => number;
  Keys: {
    lookup: (e: KeyboardEvent) => string;
    lookupChar: (e: KeyboardEvent) => string;
    isUndo: (e: KeyboardEvent) => boolean;
    isRedo: (e: KeyboardEvent) => boolean;
    isHelp: (e: KeyboardEvent) => boolean;
  };
  List: {
    removeItemById: (listModel: unknown, id: string) => void;
    moveItemsTo: (listModel: unknown, from: number, to: number, n: number) => void;
  };
  currentLanguage: () => string;
  joinShaderFunctions: (shaderFunctionsList: ShaderFunctions[]) => string;
  glslHeader: string;
};

interface Mathtools {
  Label: {
    truncatedLatexLabel: (
      label: ValueTypeMap[ValueType["Number"]],
      labelOptions?: LabelOptionsBase
    ) => string;
    pointLabel: (
      label: ValueTypeMap[ValueType["Point"]],
      labelOptions?: LabelOptionsBase,
      emitComponentsAs?: ComponentEmitType
    ) => string;
    point3dLabel: (
      label: ValueTypeMap[ValueType["Point3D"]],
      labelOptions?: LabelOptionsBase,
      emitComponentsAs?: ComponentEmitType
    ) => string;
    complexNumberLabel: (
      label: ValueTypeMap[ValueType["Complex"]],
      labelOptions?: LabelOptionsBase & {
        alwaysEmitImaginary?: boolean;
      },
      emitComponentsAs?: ComponentEmitType
    ) => string;
  };
  migrateToLatest: (s: GraphState) => GraphState;
}

export interface Parser {
  parse: (
    s: string,
    config?: {
      allowDt?: boolean;
      allowIndex?: boolean;
      disallowFrac?: boolean;
      trailingComma?: boolean;
      seedPrefix?: string;
      allowIntervalComprehensions?: boolean;
      disableParentheses?: boolean;
      disabledFeatures?: string[];
    }
  ) => Node;
}

interface MathquillConfig {
  getAutoCommands: (options?: {
    disallowAns?: boolean;
    disallowFrac?: boolean;
    additionalCommands?: string[];
  }) => string;
  getAutoOperators: (options?: {
    additionalOperators?: string[];
    includeGeometryFunctions?: boolean;
    include3DFunctions?: boolean;
    newStats?: boolean;
  }) => string;
}


interface MathQuillApi {
  latex: () => string;
}

type Section = "colors-only" | "lines" | "points" | "fill" | "label" | "drag";
