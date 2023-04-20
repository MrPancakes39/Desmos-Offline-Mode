import "desmos";
import { DCGViewModule } from "../DCGView";
import { ItemModel } from "./models";

type DesmosType = typeof Desmos & {
  version: string;
  Private: {
    Fragile: FragileType;
  };
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
  jQuery: any;
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
