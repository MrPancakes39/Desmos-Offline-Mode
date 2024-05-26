import type DesmosOfflineMode from "#DSOM";

import { FluentBundle, type FluentVariable } from "@fluent/bundle";
import { dsomFluent } from "#i18n";

type FormatFunction = (key: string, args?: Record<string, FluentVariable> | null | undefined) => string;
type SUPPORTED_LANG_TYPE = (typeof SUPPORTED_LANGS)[number];

export default class LanguageController implements TransparentController {
  #currentLang: SUPPORTED_LANG_TYPE = "en";
  desmosEnglishFormat!: FormatFunction;
  desmosCurrentFormat: FormatFunction = () => "";
  cachedBundles = new Map<Exclude<SUPPORTED_LANG_TYPE, "en" | "xx-XX">, FluentBundle>();

  constructor(readonly dsom: DesmosOfflineMode) {
    this.dsom = dsom;
  }

  init(language: SUPPORTED_LANG_TYPE = "en") {
    this.#currentLang = language;
    this.desmosEnglishFormat = this.dsom.switcherController.selected!.calc.controller.s;
    this.fetchLanguage(this.#currentLang);

    const callsFormat = (...args: Parameters<LanguageController["format"]>) => {
      if (args[0] === "graphing-calculator-narration-audio-trace-traceable-curves") {
        // @ts-ignore
        args[1].sketchCount = args[1].sketchCount.value;
      }
      return this.format(...args);
    };
    this.dsom.switcherController.calculators.forEach((calc) => {
      calc.calc.controller.s = callsFormat;
    });
  }

  destroy() {
    this.dsom.switcherController.calculators.forEach((calc) => {
      calc.calc.controller.s = this.desmosEnglishFormat;
    });
  }

  currentLanguage() {
    return this.#currentLang;
  }

  async fetchLanguage(lang: SUPPORTED_LANG_TYPE) {
    if (!this.validateLanguage(lang)) {
      throw new Error(`Invalid language: ${lang}`);
    }
    if (lang === "en" || lang === "xx-XX") {
      this.desmosCurrentFormat = this.desmosEnglishFormat;
      this.#currentLang = lang;
      return;
    }
    if (!this.cachedBundles.has(lang)) {
      const langJSON: Record<typeof lang, string> = JSON.parse(
        await fetch(`/desmos/lang/${lang}.ftl`).then((res) => res.text())
      );
      dsomFluent.addLanguage(this.cachedBundles, lang, langJSON[lang]);
    }
    const bundle = this.cachedBundles.get(lang)!;
    this.desmosCurrentFormat = (key: string, args?: Record<string, FluentVariable> | null | undefined) => {
      const message = bundle.getMessage(key);
      if (message?.value != null) {
        return bundle.formatPattern(message.value, args);
      }
      return "";
    };
    this.#currentLang = lang;
  }

  validateLanguage(lang: unknown): lang is SUPPORTED_LANG_TYPE {
    return typeof lang === "string" && SUPPORTED_LANGS.includes(lang as SUPPORTED_LANG_TYPE);
  }

  format(key: string, args: Record<string, FluentVariable> | null | undefined = null): string {
    const result = this.dsomFormat(key, args) ?? this.desmosCurrentFormat(key, args);
    return this.#currentLang === "xx-XX" ? result.replace(/[a-z]/gi, "\u2666") : result;
  }

  dsomFormat(key: string, args?: Record<string, FluentVariable> | null | undefined) {
    const lang = this.currentLanguage();
    let bundle = dsomFluent.dsomLocales.get(lang);
    if (!bundle) {
      bundle = dsomFluent.dsomLocales.get("en")!;
    }
    const message = bundle.getMessage(key);
    if (message?.value != null) {
      return bundle.formatPattern(message.value, args);
    }
    return null;
  }
}

const LTR_LANGS = [
  "en",
  "es",
  "et",
  "ru",
  "da",
  "de",
  "pt-BR",
  "pt-PT",
  "ca",
  "fr",
  "fr-CA",
  "it",
  "is",
  "nl",
  "no",
  "sv-SE",
  "hu",
  "cs",
  "pl",
  "id",
  "vi",
  "el",
  "uk",
  "ka",
  "th",
  "tr",
  "zh-CN",
  "zh-TW",
  "ko",
  "ja",
] as const;
const RTL_LANGS = ["ar", "hy-AM", "hi", "tr"] as const;
const SUPPORTED_LANGS = [...LTR_LANGS, ...RTL_LANGS, "xx-XX"] as const;
