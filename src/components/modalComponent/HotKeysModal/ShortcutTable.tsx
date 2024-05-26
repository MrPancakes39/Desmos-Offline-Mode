import { Component, jsx } from "#DCGView";
import { DStaticMathquillView, For, If } from "../..";

import { type shortcutOS } from "./HotkeysModal";
import { type Shortcut } from "./shortcuts";
import type DesmosOfflineMode from "#DSOM";

export default class ShortcutTable extends Component<{
  shortcutList: Shortcut[];
  os: shortcutOS;
  format: DesmosOfflineMode["format"];
}> {
  shortcutList!: Shortcut[];

  init() {
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
          {(shortcut: Shortcut) => (
            <tbody>
              <tr>
                <For each={() => this.getCols(this.props.os())} key={(col) => col}>
                  {(col: "heading" | shortcutOS) => (
                    <td didMount={(e: HTMLElement) => this.populateContent(e, col, shortcut)}>
                      <If predicate={() => "latex" in shortcut && col === "heading"}>
                        {/* @ts-expect-error */}
                        {() => <DStaticMathquillView latex={() => shortcut.latex} config={{}} />}
                      </If>
                    </td>
                  )}
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
    let shortcutString;
    if (col !== "mac") {
      shortcutString = shortcut.standard;
    } else {
      shortcutString = "apple" in shortcut ? (shortcut.apple as string) : shortcut.standard;
    }
    elem.innerHTML = this.replaceKey(shortcutString);
  }

  replaceKey(shortcutString: string) {
    return shortcutString.replace(/\<key\>/g, "<span class='dcg-key-command'>").replace(/\<\/key\>/g, "</span>");
  }
}
