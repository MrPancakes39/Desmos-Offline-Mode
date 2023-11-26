import "./fonts/style.css";
import { Calc, Fragile } from "./globals/window";
import Header from "./components/headerComponent";

function select<E extends Element>(selector: string): E {
  const tmp = document.querySelector<E>(selector);
  if (tmp == null) {
    throw new Error(`'${selector}' couldn't be found.`);
  }
  return tmp;
}

(function App() {
  console.log(Calc); // Sanity Check

  const HeaderContainer = select<HTMLDivElement>("#dcg-header-container");
  Fragile.DCGView.mountToNode(Header, HeaderContainer, {});
})();
