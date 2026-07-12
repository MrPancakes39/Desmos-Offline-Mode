import { DStaticMathquillView, For, If } from "~/components";
import { Component, jsx } from "~/globals/DCGView";
import type { DesmosOfflineMode } from "~/types/DSOM";

import type { shortcutOS } from "./HotkeysModal";
import type { Shortcut } from "./shortcuts";

export class ShortcutTable extends Component<{
  shortcutList: Shortcut[];
  os: shortcutOS;
  format: DesmosOfflineMode["format"];
}> {
  shortcutList!: Shortcut[];

  override init() {
    this.shortcutList = this.props.shortcutList();
  }

  template() {
    return (
      <table class="dcg-shortcuts-table">
        <thead>
          <tr>
            <th>{() => this.props.format("shared-calculator-heading-function-table-column-header")}</th>
            <th>
              {() =>
                this.props.format(
                  `shared-calculator-heading-${
                    this.props.os() === "mac" ? "mac" : "windows-chrome"
                  }-table-column-header`
                )
              }
            </th>
          </tr>
        </thead>
        <For each={() => this.shortcutList} key={(s) => ("latex" in s ? s.latex : s.i18nKey)}>
          {(getShortcut: () => Shortcut) => (
            <tbody>
              <tr>
                <For each={() => this.getCols(this.props.os())} key={(col) => col}>
                  {(getCol: () => "heading" | shortcutOS) => {
                    const col = getCol();
                    const shortcut = getShortcut();

                    return <td didMount={(e: HTMLElement) => this.populateContent(e, col, shortcut)}>
                      <If predicate={() => "latex" in shortcut && col === "heading"}>
                        {/* oxlint-disable typescript/no-unsafe-return */}
                        {/* @ts-expect-error If enter here it means that the shortcut has a latex property */}
                        {() => <DStaticMathquillView latex={() => shortcut.latex} config={{}} />}
                        {/* oxlint-enable typescript/no-unsafe-return */}
                      </If>
                    </td>
                  }}
                </For>
              </tr>
            </tbody>
          )}
        </For>
      </table>
    );
  }

  getCols(os: shortcutOS) {
    return ["heading", os];
  }

  populateContent(elem: HTMLElement, col: "heading" | shortcutOS, shortcut: Shortcut) {
    if (col === "heading") {
      if ("latex" in shortcut) return;
      elem.innerHTML = this.props.format(shortcut.i18nKey);
      return;
    }
    elem.innerHTML = this.replaceKey(getShortcutString(shortcut, col));
  }

  replaceKey(shortcutString: string) {
    return shortcutString.replace(/<key>/g, "<span class='dcg-key-command'>").replace(/<\/key>/g, "</span>");
  }
}

const getShortcutString = (shortcut: Shortcut, col: "heading" | shortcutOS) => {
  if (col !== "mac") return shortcut.standard;
  if ("apple" in shortcut) return shortcut.apple;
  return shortcut.standard;
};
