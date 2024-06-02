import { Fragile } from "#globals";
import { select } from "#utils";
import { Header } from "../components";
import type DesmosOfflineMode from "#DSOM";

const VALID_HEADER_MENUS = ["help"] as const;
type HeaderPopoverMenu = (typeof VALID_HEADER_MENUS)[number];
export type HeaderMenuProp = {
  current: () => HeaderPopoverMenu | "closed";
  open: (menu: HeaderPopoverMenu, selector?: string) => void;
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
        open: (menu: HeaderPopoverMenu, selector?: string) => this.openMenu(menu, selector),
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

  openMenu(menu: unknown, selector?: string) {
    if (!VALID_HEADER_MENUS.includes(menu as Exclude<HeaderPopoverMenu, "closed">)) {
      throw new Error(`Invalid header menu: ${menu}`);
    }
    if (this.#currentMenu === menu) return;

    this.#currentMenu = menu as HeaderPopoverMenu;
    this.dsom.cc.updateViews();

    document.addEventListener("pointerdown", this.listener);
    if (selector) {
      this.popoverTrigger = this.divContainer!.querySelector<HTMLElement>(selector) ?? undefined;
    }
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
