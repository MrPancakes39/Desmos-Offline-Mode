import "./main.less";
import { DesmosOfflineMode } from "./app/app.controller";
import window from "./globals/window";
import { select } from "./utils";

// Init the app
const dsom = new DesmosOfflineMode();
try {
  dsom.init();
  if (import.meta.env.DEV) {
    window.DSOM = dsom;
  }
  dsom.switcherController.selected?.calc.focusFirstExpression();
  select<HTMLDivElement>(".dcg-loading-div-container").style.display = "none";
} catch (e) {
  console.error(e);
  setTimeout(() => alert("Error initializing DSOM"), 1000);
}
