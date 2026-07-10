import { Fragile } from "~/globals/window";
import type { DesmosOfflineMode } from "~/types/DSOM";
import { select } from "~/utils";

import { type ModalType, validModals } from "./components/modal.component";
import { ModalContainer } from "./modal-container.component";

export class ModalController implements TransparentController {
  unsub: (() => void) | undefined;
  divContainer: HTMLDivElement | undefined;
  currentType: ModalType;
  listener: (ev: KeyboardEvent) => void;
  tabbable: HTMLElement[] | null;

  constructor(readonly dsom: DesmosOfflineMode) {
    this.currentType = "none";
    this.listener = this.handleKeyDown.bind(this);
    this.tabbable = null;
  }

  init() {
    this.divContainer = select<HTMLDivElement>("#dcg-modal-container");
    const view = Fragile.DCGView.mountToNode(ModalContainer, this.divContainer, {
      modalType: () => this.currentType,
      closeModal: () => this.closeModal(),
      dsom: () => this.dsom,
    });
    this.unsub = this.dsom.cc.subscribeToChanges(() => view.update());
  }

  destroy() {
    this.closeModal();
    this.unsub?.();
    if (this.divContainer !== undefined) {
      Fragile.DCGView.unmountFromNode(this.divContainer);
    }
  }

  showModal(modalType: ModalType) {
    // Guard
    if (!validModals.includes(modalType)) {
      console.warn(`${modalType} is not a valid modal type. Doing nothing.`);
      return;
    }
    this.currentType = modalType;
    this.dsom.cc.updateViews();

    if (modalType === "none") {
      this.tabbable = null;
      document.removeEventListener("keydown", this.listener);
    } else {
      const tabbable = this.divContainer?.querySelectorAll<HTMLElement>("[tabindex]");
      if (tabbable === undefined) return;
      this.tabbable = [...tabbable];
      this.tabbable[0]?.focus();
      document.addEventListener("keydown", this.listener);
    }
  }

  closeModal() {
    if (this.currentType !== "none") {
      this.showModal("none");
    }
  }

  handleKeyDown(ev: KeyboardEvent) {
    if (this.tabbable === null || ev.key !== "Tab") return;

    // If activeElement not in the modal
    if (this.tabbable.filter((e) => e === document.activeElement).length === 0) {
      this.tabbable[0]?.focus();
      ev.preventDefault();
    }

    if (ev.shiftKey) {
      /* shift + tab */ if (document.activeElement === this.tabbable[0]) {
        this.tabbable[this.tabbable.length - 1]?.focus();
        ev.preventDefault();
      }
    } /* tab */ else {
      if (document.activeElement === this.tabbable[this.tabbable.length - 1]) {
        this.tabbable[0]?.focus();
        ev.preventDefault();
      }
    }
  }
}
