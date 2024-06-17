import window from "#globals";
import DSOM from "#DSOM";

// Init the app
const dsom = new DSOM();
dsom
  .init()
  .then(() => {
    // Last in loading
    window.DSOM = dsom;
    dsom.switcherController.selected!.calc.focusFirstExpression();
    document.querySelector<HTMLDivElement>(".dcg-loading-div-container")!.style.display = "none";
  })
  .catch(() => {
    alert("Error initializing DSOM");
  });
