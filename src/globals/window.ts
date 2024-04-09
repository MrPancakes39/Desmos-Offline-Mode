// Ensure Desmos API is loaded first
import "../desmos/preload_desmos";
import "../desmos/calculator_api";

import type DesmosType from "./Desmos";
import { CalcWithPatches, applyPatches } from "./patches";
import type DesmosOfflineMode from "#DSOM";

interface windowConfig extends Window {
  Desmos: DesmosType;
  Calc: CalcWithPatches;
  $: JQueryStatic;
  MathQuill: unknown;
  jQuery: JQueryStatic;
  DSOM: DesmosOfflineMode;
}

declare const window: windowConfig;
export default window;

// Re-exporting Desmos object
export const Desmos = window.Desmos;
export const Fragile = Desmos.Private.Fragile;

// Fix missing globals
window.$ = window.Desmos.$;
window.jQuery = window.Desmos.$; // Is this right?
window.MathQuill = window.Desmos.MathQuill;

export type Calc = CalcWithPatches;
export type CalcController = Calc["controller"];

export const DSOM = window.DSOM;
