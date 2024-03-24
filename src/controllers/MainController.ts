import { type Calc } from "#globals";

import ModalController from "./ModalController";
import SideBarController from "./SideBarController";
import HotkeysController from "./HotkeysController";
import HeaderController from "./HeaderController";

function createElt<T extends HTMLElement>(html: string): T {
  let tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.firstElementChild as T;
}

// Desmos Offline Mode
export default class DesmosOfflineMode implements TransparentController {
  cc;
  modalController;
  sidebarController;
  hotkeysController;
  headerController;

  constructor(readonly calc: Calc) {
    this.calc = calc;
    this.cc = calc._calc.controller;
    this.modalController = new ModalController(this);
    this.sidebarController = new SideBarController(this);
    this.hotkeysController = new HotkeysController(this);
    this.headerController = new HeaderController(this);
  }

  init() {
    this.headerController.init();
    this.modalController.init();
    this.sidebarController.init();
    this.hotkeysController.init();
  }

  destroy() {
    this.headerController.destroy();
    this.modalController.destroy();
    this.sidebarController.destroy();
    this.hotkeysController.destroy();
  }

  /**
   * Returns a formatted string from the desmos's own fluent bundle.
   *
   * @param id The identifier of the message to format.
   * @param args An object to resolve references to variables passed as arguments to the translation.
   * @returns A formatted string.
   */
  format(id: string, args: Record<string, any> | null = null): string {
    return this.cc.s(id, args);
  }

  async openOnWeb() {
    const calc = this.calc._calc;
    const state = JSON.stringify(calc.getState()),
      thumbnail = calc.grapher.screenshot({ width: 100, height: 100 }),
      url = "https://www.desmos.com/api/v1/calculator/cross_origin_save";

    const state_input = createElt<HTMLInputElement>('<input type="text" name="calc_state" />');
    const thumb_input = createElt<HTMLInputElement>('<input type="text" name="thumb_data" />');
    const form_submit = createElt<HTMLFormElement>(`
    <form name="open_graph_on_web" target="_blank" method="POST" action="${url}" style="display: none">
      <input type="text" name="is_open_on_web" value="true" />
      <input type="text" name="my_graphs" value="false" />
      <input type="text" name="is_update" value="false" />
    </form>`);
    state_input.value = state;
    thumb_input.value = thumbnail;
    form_submit.append(state_input, thumb_input);

    const web_url = await fetch(url, {
      method: "POST",
      // @ts-expect-error
      body: new URLSearchParams(new FormData(form_submit)),
      headers: {
        Accept: "application/json, text/plain, */*",
      },
    })
      .then((res) => (res.ok ? res.url : null))
      .catch(() => null);
    return web_url;
  }
}
