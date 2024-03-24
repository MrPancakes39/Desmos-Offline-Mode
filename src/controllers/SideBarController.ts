import { Fragile } from "#globals";
import { select } from "#utils";
import type DesmosOfflineMode from "#DSOM";
import { SideBarContainer } from "../components";

class SideBarController implements TransparentController {
  #removeExtras: (() => void) | undefined;
  divContainer: HTMLDivElement | undefined;
  #slidingInterior: HTMLDivElement | undefined;
  #hamburgerBtn: HTMLElement | undefined;
  #appnameItem: HTMLElement | undefined;
  shouldShow: boolean;

  constructor(readonly dsom: DesmosOfflineMode) {
    this.dsom = dsom;
    this.shouldShow = false;
  }

  init() {
    this.divContainer = select<HTMLDivElement>("#side-bar-container");
    this.#slidingInterior = select<HTMLDivElement>(".dcg-sliding-interior");
    Fragile.DCGView.mountToNode(SideBarContainer, this.divContainer, {
      dsom: () => this.dsom,
      closeSideBar: this.hideSideBar.bind(this),
      toggleSideBar: this.toggleSideBar.bind(this),
    });

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
    if (this.divContainer) Fragile.DCGView.unmountFromNode(this.divContainer);
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

export default SideBarController;
