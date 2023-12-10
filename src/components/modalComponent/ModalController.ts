import { type Calc, Fragile } from "#globals";
import { select } from "#utils";
import ModalContainer from "./ModalContainer";

const validModals = ["none", "show"] as const;
export type ModalType = (typeof validModals)[number];

export class ModalController {
  unsub: (() => void) | undefined;
  divContainer: HTMLDivElement | undefined;
  currentType: ModalType;

  constructor(readonly cc: Calc["controller"]) {
    this.cc = cc;
    this.currentType = "none";
  }

  init() {
    this.divContainer = select<HTMLDivElement>("#dcg-modal-container");
    const view = Fragile.DCGView.mountToNode(ModalContainer, this.divContainer, {
      modalType: () => this.currentType,
      closeModal: () => this.closeModal(),
    });
    this.unsub = this.cc.subscribeToChanges(() => view.update());
  }

  destroy() {
    this.unsub?.();
    if (this.divContainer) Fragile.DCGView.unmountFromNode(this.divContainer);
  }

  showModal(modalType: ModalType) {
    // Guard
    if (!validModals.includes(modalType)) {
      console.warn(`${modalType} is not a valid modal type. Doing nothing.`);
      return;
    }
    this.currentType = modalType;
    this.cc.updateViews();
  }

  closeModal() {
    this.showModal("none");
  }
}
