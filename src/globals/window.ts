// Ensure Desmos API is available
// ===============================================================================================
import * as v from "valibot";

const DesmosApiSchema = v.object(
  {
    GraphingCalculator: v.instance(Function, "Desmos.GraphingCalculator is not available"),
    Geometry: v.instance(Function, "Desmos.Geometry is not available"),
    Graphing3DCalculator: v.instance(Function, "Desmos.Graphing3DCalculator is not available"),
    Private: v.object(
      {
        Fragile: v.unknown(),
      },
      "Desmos.Private is not available"
    ),
  },
  "Couldn't find Desmos in the window object or it's not an object."
);

const checkDesmosSchema = v.safeParse(DesmosApiSchema, window.Desmos);
if (!checkDesmosSchema.success) {
  console.log(checkDesmosSchema);

  let htmlString =
    "<div id='desmos_load_errors'><h1>Couldn't Load Desmos.</h1><h2>We Ran Into The Following Errors:</h2>";
  htmlString += "<code><ul>";
  htmlString += checkDesmosSchema.issues.map((issue) => `<li>${issue.message}</li>`).join("");
  htmlString += "</ul></code></div>";

  document.body.innerHTML = htmlString;
  throw new Error();
}
// ===============================================================================================

import type DesmosType from "./Desmos";
import { type CalcWithPatches } from "./patches";
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
