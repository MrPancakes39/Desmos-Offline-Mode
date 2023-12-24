// Ensure Desmos API is loaded first
import "../desmos/preload_desmos";
import "../desmos/calculator_api";

import type DesmosType from "./Desmos";
import { CalcWithPatches, applyPatches } from "./patches";
import type DesmosOfflineMode from "#DSOM";

interface windowConfig extends Window {
  IS_BROWSER: boolean;
  Desmos: DesmosType;
  Calc: CalcWithPatches;
  $: JQueryStatic;
  MathQuill: unknown;
  jQuery: JQueryStatic;
  DSOM: DesmosOfflineMode;
}

declare const window: windowConfig;
export default window;

// defines window.IS_BROWSER constant
Object.defineProperty(window, "IS_BROWSER", {
  value: !("__TAURI__" in window),
  writable: false,
});
export const IS_BROWSER = window.IS_BROWSER;

// Re-exporting Desmos object
export const Desmos = window.Desmos;
export const Fragile = Desmos.Private.Fragile;

// Creating Calc object
const graphContainer = document.getElementById("graph-container");
if (graphContainer === null) {
  throw new Error("Graph Container couldn't be found!");
}
// export const Calc = window.Desmos.GraphingCalculator(graphContainer) as CalcWithPatches;
export const Calc = window.Desmos.Graphing3DCalculator(graphContainer) as CalcWithPatches;
applyPatches(Calc);
window.Calc = Calc;

// Fix missing globals
window.$ = window.Desmos.$;
window.jQuery = window.Desmos.$; // Is this right?
window.MathQuill = window.Desmos.MathQuill;

export type Calc = CalcWithPatches;
export type CalcController = Calc["controller"];

export const DSOM = window.DSOM;
