// Reference: https://github.com/DesModder/DesModder/blob/main/localization/i18n-core.ts
import { FluentBundle, FluentResource } from "@fluent/bundle";

import enFTL from "./en.ftl?raw";

export const dsomLocales = new Map<string, FluentBundle>();

/**
 * Add locale based on ftl string. The locale must be the same as Desmos's
 * locale string as returned by `currentLanguage()`
 */
export function addLanguage(locales: Map<string, FluentBundle>, locale: string, ftl: string, isDesmos = false) {
  const resource = new FluentResource(ftl);
  const bundle = new FluentBundle(locale, { useIsolating: false });
  const errors = bundle.addResource(resource, { allowOverrides: isDesmos });
  if (errors.length > 0) {
    console.warn("FTL translation file errors for locale " + locale, errors);
  }
  locales.set(locale, bundle);
}

addLanguage(dsomLocales, "en", enFTL);
