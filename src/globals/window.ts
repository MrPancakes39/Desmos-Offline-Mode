import type DesmosType from "./Desmos";
import CalcType from "./Calc";
import CalcObj from "../main/loadApi";

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

window.Calc = CalcObj;
export const Calc = window.Calc;
