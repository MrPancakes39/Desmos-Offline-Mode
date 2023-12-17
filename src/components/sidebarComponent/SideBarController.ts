import { Fragile } from "#globals";
import { select } from "#utils";
import type DesmosOfflineMode from "#DSOM";
import SideBarContainer from "./SideBarContainer";

export class SideBarController {
  unsub: (() => void) | undefined;
  removeEmptySpaceDiv: (() => void) | undefined;
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

    const expressionTopBar = select<HTMLDivElement>(".dcg-expression-top-bar");
    const emptySpaceDiv = document.createElement("div");
    emptySpaceDiv.className = "side-bar-empty-space";
    expressionTopBar.prepend(emptySpaceDiv);
    this.removeEmptySpaceDiv = () => expressionTopBar.removeChild(emptySpaceDiv);
  }

  destroy() {
    this.unsub?.();
    this.removeEmptySpaceDiv?.();
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
