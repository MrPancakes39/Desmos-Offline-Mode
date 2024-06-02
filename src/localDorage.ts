import type { SUPPORTED_LANG_TYPE } from "#DSOM";

// Registers a local storage item here
interface LocalDorage {
  saveLangPrefs: {
    lang: SUPPORTED_LANG_TYPE;
    toggleState: boolean;
  };
}

function getItem<TSelected extends keyof LocalDorage, TDefault extends LocalDorage[TSelected]>(
  key: TSelected,
  defaultValue: TDefault
): LocalDorage[TSelected] {
  const item = localStorage.getItem(key);
  if (item === null) {
    return defaultValue;
  }
  return JSON.parse(item);
}

function setItem<TSelected extends keyof LocalDorage>(key: TSelected, value: LocalDorage[TSelected]): void {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeItem(key: keyof LocalDorage): void {
  localStorage.removeItem(key);
}

function clearAll(): void {
  localStorage.clear();
}

export const localDorage = {
  getItem,
  setItem,
  removeItem,
  clearAll,
};
