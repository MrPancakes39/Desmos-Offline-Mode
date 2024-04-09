import window from "#globals";
import DSOM from "#DSOM";

// Init the app
const dsom = new DSOM();
window.DSOM = dsom;
dsom.init();

// Last in loading
dsom.switcherController.selected?.focusFirstExpression();
document.querySelector<HTMLDivElement>(".dcg-loading-div-container")!.style.display = "none";
