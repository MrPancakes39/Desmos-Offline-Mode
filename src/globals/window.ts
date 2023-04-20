// Ensures loading of Desmos API
import "../desmos/calc_debug.js";
// import "../desmos/calculator.js";

import type DesmosType from "./Desmos";
import CalcType from "./Calc";

interface windowConfig extends Window {
  IS_BROWSER: boolean;
  Desmos: DesmosType;
  Calc: CalcType;
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

// Creating Calc object
const graphContainer = document.getElementById("graph-container");
if (graphContainer === null) {
  throw new Error("Graph Container couldn't be found!");
}
export const Calc = window.Desmos.GraphingCalculator(graphContainer) as CalcType;
window.Calc = Calc;
