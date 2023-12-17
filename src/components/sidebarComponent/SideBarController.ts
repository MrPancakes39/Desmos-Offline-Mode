import { Fragile } from "#globals";
import { select } from "#utils";
import type DesmosOfflineMode from "#DSOM";
import SideBarContainer from "./SideBarContainer";

export class SideBarController {
  unsub: (() => void) | undefined;
  removeEmptySpaceDiv: (() => void) | undefined;
  removeResizeListener: (() => void) | undefined;
  divContainer: HTMLDivElement | undefined;
  slidingInterior: HTMLDivElement | undefined;
  emptySpaceDiv: HTMLDivElement | undefined;
  shouldShow: boolean;

  constructor(readonly dsom: DesmosOfflineMode) {
    this.dsom = dsom;
    this.shouldShow = false;
  }

  init() {
    this.divContainer = select<HTMLDivElement>("#side-bar-container");
    this.slidingInterior = select<HTMLDivElement>(".dcg-sliding-interior");
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
    this.removeEmptySpaceDiv = () => expressionTopBar.removeChild(emptySpaceDiv);

    // If the hamburger menu goes away (screen width > 450px) then we should hide the sidebar.
    const handleResize = () => {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (windowWidth > 450 && this.shouldShow) this.hideSideBar();
    };
    window.addEventListener("resize", handleResize);
    this.removeResizeListener = () => window.removeEventListener("resize", handleResize);
  }

  destroy() {
    this.unsub?.();
    this.removeEmptySpaceDiv?.();
    this.removeResizeListener?.();
    if (this.divContainer) Fragile.DCGView.unmountFromNode(this.divContainer);
  }

  showSideBar() {
    this.shouldShow = true;
    this.dsom.cc.updateViews();
    this.divContainer?.classList.add("open-side-bar");
    this.slidingInterior?.classList.add("open-side-bar");
  }

  hideSideBar() {
    this.shouldShow = false;
    this.dsom.cc.updateViews();
    this.divContainer?.classList.remove("open-side-bar");
    this.slidingInterior?.classList.remove("open-side-bar");
  }

  toggleSideBar() {
    this.shouldShow ? this.hideSideBar() : this.showSideBar();
  }
}