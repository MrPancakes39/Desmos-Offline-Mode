import type { SelectedItem } from "~/utils";

import type { Calc as CalcType } from "./Calc";

type DesmosColorNames = keyof typeof Desmos.Colors;
type DesmosColorsValues = (typeof Desmos.Colors)[DesmosColorNames];

type CalcWithPatches = CalcType & {
  getSelectedItem: () => SelectedItem;
  setItemColor: (color?: string) => boolean;
  getNextColor: () => DesmosColorsValues;
  setNextColor: (color?: string) => boolean;
};

export type Calc = CalcWithPatches;
export type CalcController = Calc["controller"];
export type { DesmosOfflineMode } from "~/app/app.controller";
