import { Fragile } from "#globals";
import { select } from "#utils";
import { ModalContainer } from "../components";
import { type ModalType, validModals } from "../components/modalComponent/modal";
import type DesmosOfflineMode from "#DSOM";

class ModalController implements TransparentController {
  unsub: (() => void) | undefined;
  divContainer: HTMLDivElement | undefined;
  currentType: ModalType;
  listener: (ev: KeyboardEvent) => void;
  accElts: { first: HTMLElement; last: HTMLElement } | null;

  constructor(readonly dsom: DesmosOfflineMode) {
    this.dsom = dsom;
    this.currentType = "none";
    this.listener = this.handleKeyDown.bind(this);
    this.accElts = null;
  }

  init() {
    this.divContainer = select<HTMLDivElement>("#dcg-modal-container");
    const view = Fragile.DCGView.mountToNode(ModalContainer, this.divContainer, {
      modalType: () => this.currentType,
      closeModal: () => this.closeModal(),
    });
    this.unsub = this.dsom.cc.subscribeToChanges(() => view.update());
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
    this.dsom.cc.updateViews();

    if (modalType == "none") {
      this.accElts = null;
      document.removeEventListener("keydown", this.listener);
    } else {
      const spans = this.divContainer?.querySelectorAll<HTMLSpanElement>("span");
      if (!spans) return;
      this.accElts = {
        first: spans[0],
        last: spans[spans.length - 1],
      };
      this.accElts.first.focus();
      document.addEventListener("keydown", this.listener);
    }
  }

  closeModal() {
    this.showModal("none");
  }

  handleKeyDown(ev: KeyboardEvent) {
    if (!this.accElts) return;
    if (ev.key === "Tab" || ev.keyCode === 9) {
      if (ev.shiftKey) {
        /* shift + tab */ if (document.activeElement === this.accElts.first) {
          this.accElts.last.focus();
          ev.preventDefault();
        }
      } /* tab */ else {
        if (document.activeElement === this.accElts.last) {
          this.accElts.first.focus();
          ev.preventDefault();
        }
      }
    }
  }
}

export default ModalController;
