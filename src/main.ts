import { Calc, Fragile } from "./globals/window";
import Header from "./components/headerComponent";
import Modal from "./components/modal";

function select<E extends Element>(selector: string): E {
  const tmp = document.querySelector<E>(selector);
  if (tmp == null) {
    throw new Error(`'${selector}' couldn't be found.`);
  }
  return tmp;
}

(function App() {
  console.log(Calc); // Sanity Check

  let foo = false;

  setTimeout(() => {
    foo = true;
    console.log("It's set");
    Calc.controller.updateViews();
  }, 3000);

  const HeaderContainer = select<HTMLDivElement>("#dcg-header-container");
  Fragile.DCGView.mountToNode(Header, HeaderContainer, {});
  const view = Fragile.DCGView.mountToNode(Modal, select<HTMLDivElement>("#dcg-modal-container"), {
    title: () => "Title Here",
    showModal: () => foo,
  });
  Calc.controller.subscribeToChanges(() => view.update());

  // Last in loading
  Calc.focusFirstExpression();
  document.querySelector<HTMLDivElement>(".dcg-loading-div-container")!.style.display = "none";
})();
