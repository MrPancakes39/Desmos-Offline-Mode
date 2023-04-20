const graphContainer = document.getElementById("graph-container");
if (graphContainer === null) {
  throw new Error("Graph Container couldn't be found!");
}

const Calc = (window as any).Desmos.GraphingCalculator(graphContainer);
export default Calc;
