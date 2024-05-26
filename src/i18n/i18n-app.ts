// Reference: https://github.com/DesModder/DesModder/blob/main/localization/i18n-core.ts
import enFTL from "./en.ftl?raw";
import { FluentBundle, FluentResource } from "@fluent/bundle";

export const locales = new Map<string, FluentBundle>();

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
