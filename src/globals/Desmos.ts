import "desmos";
import { DCGViewModule } from "#DCGView";
import { ItemModel } from "./models";
import {
  CheckboxComponent,
  DStaticMathquillViewComponent,
  InlineMathInputViewComponent,
  MathQuillField,
  MathQuillViewComponent,
  SegmentedControlComponent,
  TooltipComponent,
} from "../components/desmosComponents";
import _ from "underscore";

type DesmosType = typeof Desmos & {
  version: string;
  $: JQueryStatic;
  _: typeof _;
  MathQuill: unknown;
  Private: {
    Fragile: FragileType;
  };
  Graphing3DCalculator: (typeof Desmos)["GraphingCalculator"];
};

type FragileType = {
  DCGView: DCGViewModule;
  PromptSliderView: any;
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
  evaluateLatex: (s: string, isDegreeMode: boolean) => number;
  Keys: {
    lookup: (e: KeyboardEvent) => string;
    lookupChar: (e: KeyboardEvent) => string;
    isUndo: (e: KeyboardEvent) => boolean;
    isRedo: (e: KeyboardEvent) => boolean;
    isHelp: (e: KeyboardEvent) => boolean;
  };
  getQueryParams: () => Record<string, string | true>;
  getReconciledExpressionProps: (
    type: string,
    model?: ItemModel
  ) => {
    points: boolean;
    lines: boolean;
    fill: boolean;
  };
  List: {
    removeItemById: (listModel: any, id: string) => void;
    moveItemsTo: (listModel: any, from: number, to: number, n: number) => void;
  };
  currentLanguage: () => string;
};

type Section = "colors-only" | "lines" | "points" | "fill" | "label" | "drag";

export default DesmosType;
