import { type Calc, Fragile } from "#globals";
import Header from "./components/headerComponent";
import { select } from "#utils";
import { ModalController } from "./components";

// Desmos Offline Mode
export default class DesmosOfflineMode {
  cc;
  modalController;

  constructor(readonly calc: Calc) {
    this.calc = calc;
    this.cc = calc._calc.controller;
    this.modalController = new ModalController(this.cc);
  }

  init() {
    this.initHeader();
    this.modalController.init();
  }

  private initHeader() {
    const HeaderContainer = select<HTMLDivElement>("#dcg-header-container");
    Fragile.DCGView.mountToNode(Header, HeaderContainer, {});
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
