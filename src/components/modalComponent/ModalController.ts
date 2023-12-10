import { type Calc, Fragile } from "#globals";
import { select } from "#utils";
import ModalContainer from "./ModalContainer";

export class ModalController {
  unsub: (() => void) | undefined;
  divContainer: HTMLDivElement | undefined;
  showShould: boolean;

  constructor(readonly cc: Calc["controller"]) {
    this.cc = cc;
    this.showShould = false;
  }

  init() {
    this.divContainer = select<HTMLDivElement>("#dcg-modal-container");
    const view = Fragile.DCGView.mountToNode(ModalContainer, this.divContainer, {
      shouldShow: () => this.showShould,
      closeModal: () => this.closeModal(),
    });
    this.unsub = this.cc.subscribeToChanges(() => view.update());
  }

  destroy() {
    this.unsub?.();
    if (this.divContainer) Fragile.DCGView.unmountFromNode(this.divContainer);
  }

  showModal() {
    this.showShould = true;
    this.cc.updateViews();
  }

  closeModal() {
    this.showShould = false;
    this.cc.updateViews();
  }
}
