import { Fragile } from "~/globals/window";
import type { DesmosOfflineMode } from "~/types/DSOM";
import { select } from "~/utils";

import { SideBarContainer } from "./sidebar.component";

export class SideBarController implements TransparentController {
  readonly dsom: DesmosOfflineMode;

  unsub: (() => void) | undefined;
  #removeExtras: (() => void) | undefined;
  divContainer: HTMLDivElement | undefined;
  #slidingInterior: HTMLDivElement | undefined;
  #hamburgerBtn: HTMLElement | undefined;
  #appnameItem: HTMLElement | undefined;
  shouldShow: boolean;

  constructor(dsom: DesmosOfflineMode) {
    this.dsom = dsom;
    this.shouldShow = false;
  }

  init() {
    this.divContainer = select<HTMLDivElement>("#side-bar-container");
    this.#slidingInterior = select<HTMLDivElement>(".dcg-sliding-interior");
    const view = Fragile.DCGView.mountToNode(SideBarContainer, this.divContainer, {
      dsom: () => this.dsom,
      closeSideBar: this.hideSideBar.bind(this),
      toggleSideBar: this.toggleSideBar.bind(this),
    });
    this.unsub = this.dsom.cc.subscribeToChanges(() => view.update());

    // Adds an empty div as first child of expressionTopBar.
    // This is so when the screen width is 450px the hamburger menu looks like it's in the expression bar.
    const expressionTopBar = select<HTMLDivElement>(".dcg-expression-top-bar");
    const emptySpaceDiv = document.createElement("div");
    emptySpaceDiv.className = "side-bar-empty-space";
    expressionTopBar.prepend(emptySpaceDiv);

    this.#removeExtras = () => {
      expressionTopBar.removeChild(emptySpaceDiv);
    };

    this.#hamburgerBtn = select<HTMLElement>(":has(>.dcg-icon-hamburger)");
    this.#appnameItem = select<HTMLElement>(".side-bar-content .app-name");
  }

  destroy() {
    this.hideSideBar();
    this.#removeExtras?.();
    this.unsub?.();
    if (this.divContainer !== undefined) {
      Fragile.DCGView.unmountFromNode(this.divContainer);
    }
  }

  showSideBar() {
    if (!this.shouldShow) {
      this.shouldShow = true;
      this.divContainer?.classList.add("open-side-bar");
      this.#slidingInterior?.classList.add("open-side-bar");
      this.#appnameItem?.focus();
    }
  }

  hideSideBar() {
    if (this.shouldShow) {
      this.shouldShow = false;
      this.divContainer?.classList.remove("open-side-bar");
      this.#slidingInterior?.classList.remove("open-side-bar");
      this.#hamburgerBtn?.focus();
    }
  }

  toggleSideBar() {
    this.shouldShow ? this.hideSideBar() : this.showSideBar();
  }
}
