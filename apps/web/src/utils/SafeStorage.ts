import type { SUPPORTED_LANG_TYPE } from "~/controllers/language/language.controller";

// Register a local storage item here
interface LocalItems {
  saveLangPrefs: {
    lang: SUPPORTED_LANG_TYPE;
    toggleState: boolean;
  };
}

class SafeStorage {
  getItem<TSelected extends keyof LocalItems, TDefault extends LocalItems[TSelected]>(
    key: TSelected,
    defaultValue: TDefault
  ): LocalItems[TSelected] {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    // oxlint-disable-next-line typescript/no-unnecessary-type-assertion, typescript/no-unsafe-type-assertion
    return JSON.parse(item) as unknown as LocalItems[TSelected];
  }

  setItem<TSelected extends keyof LocalItems>(key: TSelected, value: LocalItems[TSelected]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: keyof LocalItems): void {
    localStorage.removeItem(key);
  }

  clearAll(): void {
    localStorage.clear();
  }
}

export const safeStorage = new SafeStorage();
