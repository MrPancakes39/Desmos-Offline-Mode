import { jsx } from "#DCGView";
import { Modal } from "../modal";
import GenericModal from "../GenericModal";

import { If } from "../..";
import SegmentedControl from "../../common/SegmentedControl";
import Fragment from "../../common/Fragment";

import ShortcutTable from "./ShortcutTable";
import DesmosShortcuts from "./shortcuts";

import type DesmosOfflineMode from "#DSOM";
import type { Hotkeys, GraphingShortcuts, GeoShortcuts } from "./shortcuts";

export type shortcutOS = "pc" | "mac";

type Product = "graphing" | "geometry" | "3d";

export default class HotkeysModal extends Modal<{
  format: DesmosOfflineMode["format"];
  updateViews: () => void;
  product: Product;
}> {
  showShortcuts!: shortcutOS;
  currentShortcuts!: GraphingShortcuts | GeoShortcuts;

  init() {
    const IS_MAC = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) !== null;
    this.showShortcuts = IS_MAC ? "mac" : "pc";
    this.currentShortcuts =
      this.props.product() === "geometry" ? DesmosShortcuts.geometryShortcuts : DesmosShortcuts.graphingShortcuts;
  }

  template() {
    return (
      <GenericModal
        title={() => this.props.format("account-shell-link-keyboard-shortcuts")}
        close={this.props.close}
        class="hotkeys-modal"
        useWrapper={false}
        format={this.props.format}
      >
        <div class="dcg-hotkeys-toggle-container">
          <SegmentedControl
            names={() => [
              this.props.format("shared-calculator-button-windows-chrome"),
              this.props.format("shared-calculator-button-mac"),
            ]}
            selectedIndex={() => +(this.showShortcuts == "mac")}
            ariaGroupLabel={() => this.props.format("shared-calculator-label-os")}
            setSelectedIndex={(selected) => {
              this.showShortcuts = selected ? "mac" : "pc";
              this.props.updateViews();
            }}
          />
        </div>
        <div class="dcg-hotkey-container" tabindex="0">
          <div class="dcg-hotkey-section">
            <If predicate={() => this.showGeoShortcuts()}>
              {() => (
                <Fragment>
                  {[
                    this.HotKeysSection(DesmosShortcuts.geometryShortcuts.toolSelection),
                    this.HotKeysSection(DesmosShortcuts.geometryShortcuts.expressionEdit),
                    this.HotKeysSection(DesmosShortcuts.geometryShortcuts.tokenNavigator),
                  ]}
                </Fragment>
              )}
            </If>
            {[
              this.HotKeysSection(this.currentShortcuts.commonactions),
              this.HotKeysSection(this.currentShortcuts.desmoscomonly),
              this.HotKeysSection(this.currentShortcuts.mathquill),
              this.HotKeysSection(this.currentShortcuts.interactivepoints),
            ]}
          </div>
          <div class="dcg-hotkey-section">
            <If predicate={() => this.showGeoShortcuts()}>
              {() => <Fragment>{this.HotKeysSection(DesmosShortcuts.geometryShortcuts.graphNavigation)}</Fragment>}
            </If>
            {[
              this.HotKeysSection(
                this.currentShortcuts.commonsymbols,
                "shared-calculator-heading-keyboard-shortcuts-symbols"
              ),
              this.HotKeysSection(this.currentShortcuts.audiotrace),
              this.HotKeysSection(this.currentShortcuts.slidertrace),
              this.HotKeysSection(this.currentShortcuts.sliders),
              this.HotKeysSection(this.currentShortcuts.tables),
              this.HotKeysSection(this.currentShortcuts.braille),
            ]}
          </div>
        </div>
      </GenericModal>
    );
  }

  HotKeysSection(hotkeys: Hotkeys, header?: string) {
    return [
      <h2 class="dcg-hotkey-section-header">{() => this.props.format(header ?? hotkeys.i18nSectionKey)}</h2>,
      <ShortcutTable shortcutList={hotkeys.shortcuts} os={() => this.showShortcuts} format={this.props.format} />,
    ];
  }

  showGeoShortcuts() {
    return this.props.product() === "geometry";
  }

  show3dShortcuts() {
    return this.props.product() === "3d";
  }
}
