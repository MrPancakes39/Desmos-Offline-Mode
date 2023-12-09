import window, { Calc } from "#globals";
import DSOM from "#DSOM";

console.log(Calc); // Sanity Check

// Init the app
const dsom = new DSOM(Calc);
window.DSOM = dsom;
dsom.init();

// Last in loading
Calc.focusFirstExpression();
document.querySelector<HTMLDivElement>(".dcg-loading-div-container")!.style.display = "none";
