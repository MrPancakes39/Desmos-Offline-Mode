import window from "../globals/window";
import CalcType from "../globals/Calc";
const { Desmos } = window;

const graphContainer = document.getElementById("graph-container");
if (graphContainer === null) {
  throw new Error("Graph Container couldn't be found!");
}

const Calc = Desmos.GraphingCalculator(graphContainer);
window.Calc = Calc as CalcType;
export default Calc;
