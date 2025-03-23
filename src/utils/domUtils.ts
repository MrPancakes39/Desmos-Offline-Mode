/**
 * Selects the first element matching the given selector.
 * Throws an error if no element matches the selector.
 */
export function select<E extends Element>(selector: string): E {
  const tmp = document.querySelector<E>(selector);
  if (tmp == null) {
    throw new Error(`'${selector}' couldn't be found.`);
  }
  return tmp;
}

export function createElt<T extends HTMLElement>(html: string): T {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.firstElementChild as T; // eslint-disable-line @typescript-eslint/no-unsafe-type-assertion -- Ignore
}
