import type DesmosTypeWithoutLocales from "./Desmos";
import { type CalcWithPatches } from "./patches";
import type DesmosOfflineMode from "#DSOM";
import type { SUPPORTED_LANG_TYPE } from "#DSOM";
import { z } from "zod";

type DesmosType = DesmosTypeWithoutLocales & {
  locales: Record<Exclude<SUPPORTED_LANG_TYPE, "en" | "xx-XX">, string>;
};

interface windowConfig extends Window {
  Desmos: DesmosType;
  Calc: CalcWithPatches;
  $: JQueryStatic;
  MathQuill: unknown;
  jQuery: JQueryStatic;
  DSOM: DesmosOfflineMode;
  readonly IS_BROWSER: boolean;
}

declare const window: windowConfig;
export default window;

// Ensure Desmos API is available
// ===============================================================================================
const DesmosApiSchema = z.object(
  {
    GraphingCalculator: z.function(),
    Geometry: z.function(),
    Private: z.object({
      Fragile: z.object({}),
    }),
    locales: z.object({}),
  },
  { message: "Couldn't find Desmos in the window object or it's not an object." }
);

const checkDesmosSchema = DesmosApiSchema.safeParse(window.Desmos);
if (!checkDesmosSchema.success) {
  let htmlString =
    "<div id='desmos_load_errors'><h1>Couldn't Load Desmos.</h1><h2>We Ran Into The Following Errors:</h2>";
  htmlString += "<code><ul>";
  htmlString += checkDesmosSchema.error.issues
    .map((issue) =>
      issue.path.length === 0
        ? `<li>${issue.message}</li>`
        : `<li>Desmos.${issue.path.join(".")} is ${issue.message}</li>`
    )
    .join("");
  htmlString += "</ul></code></div>";

  document.body.innerHTML = htmlString;
  throw new Error("Couldn't load Desmos");
}
// ===============================================================================================

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

// Check if we're in a browser
Object.defineProperty(window, "IS_BROWSER", {
  value: import.meta.env.VITE_DESMOS_PROTOCOL !== "desmos:/",
  configurable: false,
  enumerable: true,
  writable: false,
});
