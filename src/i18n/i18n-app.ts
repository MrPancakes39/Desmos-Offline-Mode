// Reference: https://github.com/DesModder/DesModder/blob/main/localization/i18n-core.ts
import window from "#globals";
import enFTL from "./en.ftl?raw";
import { FluentBundle, FluentResource, FluentVariable } from "@fluent/bundle";

function currentLanguage(): string {
  return window.DSOM.currentLanguage();
}

export const locales = new Map<string, FluentBundle>();

export function format(key: string, args?: Record<string, FluentVariable> | null | undefined) {
  const lang = currentLanguage();
  let bundle = locales.get(lang);
  if (!bundle) {
    bundle = locales.get("en")!;
  }
  const message = bundle.getMessage(key);
  if (message?.value != null) {
    return bundle.formatPattern(message.value, args);
  }
  //   console.warn("[DSOM] Error formatting key", key, "in locale", lang);
  return null;
}

/**
 * Add locale based on ftl string. The locale must be the same as Desmos's
 * locale string as returned by `currentLanguage()`
 */
function addLanguage(locale: string, ftl: string) {
  const resource = new FluentResource(ftl);
  const bundle = new FluentBundle(locale, { useIsolating: false });
  const errors = bundle.addResource(resource);
  if (errors.length) {
    console.warn("FTL translation file errors for locale " + locale, errors);
  }
  locales.set(locale, bundle);
}

addLanguage("en", enFTL);
