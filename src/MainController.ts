import { type Calc, Fragile } from "#globals";
import Header from "./components/headerComponent";
import Modal from "./components/modal";

function select<E extends Element>(selector: string): E {
  const tmp = document.querySelector<E>(selector);
  if (tmp == null) {
    throw new Error(`'${selector}' couldn't be found.`);
  }
  return tmp;
}

// Desmos Offline Mode
export default class DesmosOfflineMode {
  cc: Calc["controller"];
  private DCGView = Fragile.DCGView;

  constructor(readonly calc: Calc) {
    this.calc = calc;
    this.cc = calc._calc.controller;
  }

  init() {
    this.initHeader();
    this.initModelContainer();
  }

  private initHeader() {
    const HeaderContainer = select<HTMLDivElement>("#dcg-header-container");
    this.DCGView.mountToNode(Header, HeaderContainer, {});
  }

  private initModelContainer() {
    let foo = false;

    setTimeout(() => {
      foo = true;
      console.log("It's set");
      this.cc.updateViews();
    }, 3000);

    const view = Fragile.DCGView.mountToNode(Modal, select<HTMLDivElement>("#dcg-modal-container"), {
      title: () => "Title Here",
      showModal: () => foo,
    });
    this.cc.subscribeToChanges(() => view.update());
  }

  /**
   * Returns a formatted string from the desmos's own fluent bundle.
   *
   * @param id The identifier of the message to format.
   * @param args An object to resolve references to variables passed as arguments to the translation.
   * @returns A formatted string.
   */
  format(id: string, args: Record<string, any> | null = null): string {
    return this.cc.s(id, args);
  }
}

//
// export const DesmosOM = window.DesmosOM;
