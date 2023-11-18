// Ensures loading of Desmos API
import "../desmos/calc_debug.js";
// import "../desmos/calculator.js";

import type DesmosType from "./Desmos";
import { CalcWithPatches, applyPatches } from "../main/patches";

interface windowConfig extends Window {
  IS_BROWSER: boolean;
  Desmos: DesmosType;
  Calc: CalcWithPatches;
  $: JQueryStatic;
  MathQuill: unknown;
  jQuery: JQueryStatic;
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
export const Calc = window.Desmos.GraphingCalculator(graphContainer) as CalcWithPatches;
applyPatches(Calc);
window.Calc = Calc;

// Fix missing globals
window.$ = window.Desmos.$;
window.jQuery = window.Desmos.Private.Fragile.jQuery;
window.MathQuill = window.Desmos.MathQuill;

export type Calc = CalcWithPatches;
export type CalcController = Calc["controller"];
