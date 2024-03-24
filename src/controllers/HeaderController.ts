import { Fragile } from "#globals";
import { select } from "#utils";
import { Header } from "../components";
import type DesmosOfflineMode from "#DSOM";

class HeaderController implements TransparentController {
  unsub: (() => void) | undefined;
  divContainer: HTMLDivElement | undefined;
  showHelpMenu: boolean;
  listener: (ev: MouseEvent) => void;
  #helpBtn: HTMLElement | undefined;
  #helpMenu: HTMLElement | undefined;

  constructor(readonly dsom: DesmosOfflineMode) {
    this.dsom = dsom;
    this.showHelpMenu = false;
    this.listener = this.handleTap.bind(this);
  }

  init() {
    this.divContainer = select<HTMLDivElement>("#dcg-header-container");
    const view = Fragile.DCGView.mountToNode(Header, this.divContainer, {
      dsom: () => this.dsom,
      showHelpMenu: () => this.showHelpMenu,
      toggleHelpMenu: () => this.toggleHelpMenu(),
    });
    this.unsub = this.dsom.cc.subscribeToChanges(() => view.update());
  }

  destroy() {
    this.closeHelpMenu();
    this.unsub?.();
    if (this.divContainer) Fragile.DCGView.unmountFromNode(this.divContainer);
  }

  openHelpMenu() {
    if (!this.showHelpMenu) {
      this.showHelpMenu = true;
      this.dsom.cc.updateViews();
      this.#helpBtn = select<HTMLElement>(".dcg-icon-question-sign");
      this.#helpMenu = select<HTMLElement>(".dsm-help-container");
      document.addEventListener("click", this.listener);
      // Focus on keyboard dcg-link
      this.#helpMenu.querySelector<HTMLAnchorElement>(".dcg-link")?.focus();
    }
  }

  closeHelpMenu() {
    if (this.showHelpMenu) {
      this.showHelpMenu = false;
      this.#helpBtn = undefined;
      this.#helpMenu = undefined;
      document.removeEventListener("click", this.listener);
      this.dsom.cc.updateViews();
    }
  }

  toggleHelpMenu() {
    if (this.showHelpMenu) {
      this.closeHelpMenu();
    } else {
      this.openHelpMenu();
    }
  }

  handleTap(ev: MouseEvent) {
    const target = ev.target as Node | null;
    const clickIsInside = this.#helpMenu!.contains(target) || this.#helpBtn!.contains(target);
    if (!clickIsInside) {
      this.closeHelpMenu();
    }
  }
}

export default HeaderController;
