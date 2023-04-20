// Ensures loading of Desmos API
import "../desmos/calc_debug.js";
// import "../desmos/calculator.js";

import CalcType from "../globals/Calc";

const graphContainer = document.getElementById("graph-container");
if (graphContainer === null) {
  throw new Error("Graph Container couldn't be found!");
}

const Calc: CalcType = (window as any).Desmos.GraphingCalculator(graphContainer);
export default Calc;
