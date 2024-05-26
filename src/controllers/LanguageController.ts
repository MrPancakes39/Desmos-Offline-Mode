import type DesmosOfflineMode from "#DSOM";

import { type FluentVariable } from "@fluent/bundle";
import { dsomLocales } from "#i18n";

type FormatFunction = (key: string, options?: Record<string, FluentVariable> | null | undefined) => string;

export default class LanguageController implements TransparentController {
  #currentLang = "en";
  desmosEnglishBundle!: FormatFunction;

  constructor(readonly dsom: DesmosOfflineMode) {
    this.dsom = dsom;
  }

  init(language = "en") {
    this.#currentLang = language;
    this.desmosEnglishBundle = this.dsom.switcherController.selected!.calc.controller.s;
  }

  destroy() {}

  currentLanguage(): string {
    return this.#currentLang;
  }

  format(key: string, args: Record<string, FluentVariable> | null | undefined = null): string {
    const result = this.dsomFormat(key, args) ?? this.desmosEnglishBundle(key, args);
    return this.#currentLang === "xx-XX" ? result.replace(/[a-z]/gi, "\u2666") : result;
  }

  dsomFormat(key: string, args?: Record<string, FluentVariable> | null | undefined) {
    const lang = this.currentLanguage();
    let bundle = dsomLocales.get(lang);
    if (!bundle) {
      bundle = dsomLocales.get("en")!;
    }
    const message = bundle.getMessage(key);
    if (message?.value != null) {
      return bundle.formatPattern(message.value, args);
    }
    return null;
  }
}
