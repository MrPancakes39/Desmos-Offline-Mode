import { type Calc, Fragile } from "#globals";
import Header from "./components/headerComponent";
import { select } from "#utils";
import { ModalController } from "./components";

function createElt<T extends HTMLElement>(html: string): T {
  let tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.firstElementChild as T;
}

// Desmos Offline Mode
export default class DesmosOfflineMode {
  cc;
  modalController;

  constructor(readonly calc: Calc) {
    this.calc = calc;
    this.cc = calc._calc.controller;
    this.modalController = new ModalController(this.cc);
  }

  init() {
    this.initHeader();
    this.modalController.init();
  }

  private initHeader() {
    const HeaderContainer = select<HTMLDivElement>("#dcg-header-container");
    Fragile.DCGView.mountToNode(Header, HeaderContainer, {});
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
