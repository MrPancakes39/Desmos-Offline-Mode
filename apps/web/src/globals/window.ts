import type { DesmosOfflineMode } from "~/app/app.controller";
import type { SUPPORTED_LANG_TYPE } from "~/controllers/language/language.controller";
import type { DesmosType as DesmosTypeWithoutLocales } from "~/types/Desmos";
import type { Calc } from "~/types/DSOM";

type DesmosType = DesmosTypeWithoutLocales & {
  locales: Record<Exclude<SUPPORTED_LANG_TYPE, "en" | "xx-XX">, string>;
};

interface windowConfig extends Window {
  Desmos: DesmosType;
  Calc: Calc;
  $: JQueryStatic;
  MathQuill: unknown;
  jQuery: JQueryStatic;
  DSOM: DesmosOfflineMode;
  readonly IS_BROWSER: boolean;
}

declare const window: windowConfig;
export default window;

// Re-exporting Desmos object
export const Desmos = window.Desmos;
export const Fragile = Desmos.Private.Fragile;

// Fix missing globals
// oxlint-disable-next-line typescript/no-unsafe-assignment -- Desmos' bundled jQuery type is incomplete
window.$ = window.Desmos.$;
// oxlint-disable-next-line typescript/no-unsafe-assignment -- Desmos' bundled jQuery type is incomplete
window.jQuery = window.Desmos.$; // Is this right?
window.MathQuill = window.Desmos.MathQuill;

export const DSOM = window.DSOM;

// Check if we're in a browser
Object.defineProperty(window, "IS_BROWSER", {
  value: true,
  configurable: false,
  enumerable: true,
  writable: false,
});
