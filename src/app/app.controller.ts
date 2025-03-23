import type { FluentVariable } from "@fluent/bundle";

import { HeaderController } from "~/controllers/header/header.controller";
import HotkeysController from "~/controllers/hotkeys/hotkeys.controller";
import { LanguageController } from "~/controllers/language/language.controller";
import { ModalController } from "~/controllers/modal/modal.controller";
import PrintPreviewController from "~/controllers/print-preview/print-preview.controller";
import { SideBarController } from "~/controllers/sidebar/sidebar.controller";
import { SwitcherController } from "~/controllers/switcher/switcher.controller";
import { DesktopFileHandler, type FileHandler, WebFileHandler } from "~/file-handler";
import window from "~/globals/window";
import type { CalcController } from "~/types/DSOM";
import { createElt } from "~/utils";

// Desmos Offline Mode
export class DesmosOfflineMode implements TransparentController {
  cc!: CalcController;
  switcherController;
  languageController;
  modalController;
  sidebarController;
  headerController;
  hotkeysController;
  ppreviewController;
  fileHandler: FileHandler;

  constructor() {
    this.switcherController = new SwitcherController();
    this.languageController = new LanguageController(this);
    this.modalController = new ModalController(this);
    this.sidebarController = new SideBarController(this);
    this.headerController = new HeaderController(this);
    this.ppreviewController = new PrintPreviewController(this);
    this.hotkeysController = new HotkeysController(this);

    this.fileHandler = window.IS_BROWSER ? new WebFileHandler() : new DesktopFileHandler();
  }

  init() {
    this.switcherController.init();
    if (typeof this.switcherController.calculators[0] === "undefined") {
      throw new Error("SwitcherController should not have calculators at init");
    }
    this.cc = this.switcherController.calculators[0].calc._calc.controller;
    this.languageController.init();
    this.modalController.init();
    this.sidebarController.init();
    this.headerController.init();
    this.ppreviewController.init();
    this.hotkeysController.init();
  }

  destroy() {
    this.hotkeysController.destroy();
    this.ppreviewController.destroy();
    this.headerController.destroy();
    this.sidebarController.destroy();
    this.modalController.destroy();
    this.languageController.destroy();
    this.switcherController.destroy();
  }

  /**
   * Returns a formatted string from the desmos's own fluent bundle.
   *
   * @param id The identifier of the message to format.
   * @param args An object to resolve references to variables passed as arguments to the translation.
   * @returns A formatted string.
   */
  format(key: string, args: Record<string, FluentVariable> | null | undefined = null): string {
    return this.languageController.format(key, args);
  }

  /** Returns the current language. */
  currentLanguage() {
    return this.languageController.currentLanguage();
  }

  async openOnWeb() {
    const calc = this.switcherController.calculators[0]?.calc._calc;
    if (calc === undefined) return;
    const state = JSON.stringify(calc.getState());
    const thumbnail = calc.grapher.screenshot({ width: 100, height: 100 });
    const url = "https://www.desmos.com/api/v1/calculator/cross_origin_save";

    const stateInput = createElt<HTMLInputElement>('<input type="text" name="calc_state" />');
    const thumbInput = createElt<HTMLInputElement>('<input type="text" name="thumb_data" />');
    const formSubmit = createElt<HTMLFormElement>(`
      <form name="open_graph_on_web" target="_blank" method="POST" action="${url}" style="display: none">
        <input type="text" name="is_open_on_web" value="true" />
        <input type="text" name="my_graphs" value="false" />
        <input type="text" name="is_update" value="false" />
      </form>`);
    stateInput.value = state;
    thumbInput.value = thumbnail;
    formSubmit.append(stateInput, thumbInput);

    const webUrl = await fetch(url, {
      method: "POST",
      // @ts-expect-error Conversion to FormData works
      body: new URLSearchParams(new FormData(formSubmit)),
      headers: {
        Accept: "application/json, text/plain, */*",
      },
    })
      .then((res) => (res.ok ? res.url : null))
      .catch(() => null);
    return webUrl;
  }
}
