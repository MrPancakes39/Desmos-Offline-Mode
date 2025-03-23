import { Fragile } from "#globals";
import { select } from "#utils";
import Header from "./headerComponent";
import type DesmosOfflineMode from "#DSOM";

const VALID_HEADER_MENUS = ["help", "lang"] as const;
const POPOVER_TRIGGER_SELECTORS = {
  help: ".dcg-icon-question-sign",
  lang: ".dcg-icon-world",
} as const satisfies Record<HeaderPopoverMenu, string>;

export type HeaderPopoverMenu = (typeof VALID_HEADER_MENUS)[number];
export type HeaderMenuProp = {
  current: () => HeaderPopoverMenu | "closed";
  open: (menu: HeaderPopoverMenu) => void;
  close: () => void;
};

class HeaderController implements TransparentController {
  unsub: (() => void) | undefined;
  divContainer: HTMLDivElement | undefined;
  #currentMenu: HeaderPopoverMenu | "closed";
  listener: (ev: PointerEvent) => void;
  popoverMenu: HTMLElement | undefined;
  popoverTrigger: HTMLElement | undefined;

  constructor(readonly dsom: DesmosOfflineMode) {
    this.dsom = dsom;
    this.#currentMenu = "closed";
    this.listener = this.handleTap.bind(this);
  }

  init() {
    this.divContainer = select<HTMLDivElement>("#dcg-header-container");
    const view = Fragile.DCGView.mountToNode(Header, this.divContainer, {
      dsom: () => this.dsom,
      menu: () => ({
        current: () => this.currentMenu(),
        open: (menu: HeaderPopoverMenu) => this.openMenu(menu),
        close: () => this.closeMenu(),
      }),
    });
    this.unsub = this.dsom.cc.subscribeToChanges(() => view.update());
  }

  destroy() {
    this.closeMenu();
    this.unsub?.();
    if (this.divContainer) Fragile.DCGView.unmountFromNode(this.divContainer);
  }

  openMenu(menu: HeaderPopoverMenu) {
    if (!VALID_HEADER_MENUS.includes(menu)) {
      throw new Error(`Invalid header menu: ${menu}`);
    }
    if (this.#currentMenu === menu) return;
    // Just in case
    document.removeEventListener("pointerdown", this.listener);

    this.#currentMenu = menu;
    this.dsom.cc.updateViews();

    document.addEventListener("pointerdown", this.listener);
    this.popoverTrigger =
      this.divContainer!.querySelector<HTMLElement>(POPOVER_TRIGGER_SELECTORS[this.#currentMenu]) ?? undefined;
    this.popoverMenu = select<HTMLElement>(".desom-popover-container");
    this.popoverMenu.querySelector<HTMLAnchorElement>(".dcg-link")?.focus();
    //   ^^^ Focus on first selectable element
  }

  closeMenu() {
    if (this.#currentMenu === "closed") return;

    this.#currentMenu = "closed";
    this.dsom.cc.updateViews();

    this.popoverMenu = undefined;
    document.removeEventListener("pointerdown", this.listener);
  }

  currentMenu() {
    return this.#currentMenu;
  }

  handleTap(ev: PointerEvent) {
    const target = ev.target as Node | null;
    const clickIsInside = this.popoverMenu!.contains(target) || this.popoverTrigger?.contains(target);
    if (!clickIsInside) {
      this.closeMenu();
    }
  }
}

export default HeaderController;
