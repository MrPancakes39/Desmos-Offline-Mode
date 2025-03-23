import { DCGAppIcon, type DCGProduct } from "~/components";
import { Component, jsx } from "~/globals/DCGView";
import type { DesmosOfflineMode } from "~/types/DSOM";

import { GenericModal } from "./GenericModal";
import { Modal } from "./modal.component";

type SwitcherProduct = Extract<DCGProduct, "graphing" | "geometry" | "3d">;

export class SwitcherModal extends Modal<{
  switcher: DesmosOfflineMode["switcherController"];
  format: DesmosOfflineMode["format"];
  currentLanguage: DesmosOfflineMode["currentLanguage"];
}> {
  switcher!: DesmosOfflineMode["switcherController"];

  override init() {
    this.switcher = this.props.switcher();
  }

  template(): unknown {
    return (
      <GenericModal
        title={() => this.props.format("dsom-modal-switcher-title")}
        close={this.props.close}
        class="switcher-modal"
        format={this.props.format}
      >
        <CalculatorButton
          product="graphing"
          label={() =>
            this.props.currentLanguage() === "en"
              ? "Graphing Calculator"
              : this.props.format("frontpage-link-shared-graphing-calculator")
          }
          selected={() => this.switcher.selected?.type === "graphing"}
          onTap={() => {
            this.switcher.selectCalculator("graphing");
            this.props.close();
          }}
        />
        <CalculatorButton
          product="geometry"
          label={() =>
            this.props.currentLanguage() === "en"
              ? "Geometry Tool"
              : this.props.format("frontpage-link-shared-geometry-tool")
          }
          selected={() => this.switcher.selected?.type === "geometry"}
          onTap={() => {
            this.switcher.selectCalculator("geometry");
            this.props.close();
          }}
        />
        <CalculatorButton
          product="3d"
          label={() =>
            this.props.currentLanguage() === "en"
              ? "3D Calculator"
              : this.props.format("frontpage-link-shared-3d-calculator")
          }
          selected={() => this.switcher.selected?.type === "3d"}
          onTap={() => {
            this.switcher.selectCalculator("3d");
            this.props.close();
          }}
        />
      </GenericModal>
    );
  }
}

class CalculatorButton extends Component<{
  product: SwitcherProduct;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onTap?: (e: Event) => void;
}> {
  product!: SwitcherProduct;
  selected!: boolean;
  disabled!: boolean;
  onTap!: (e: Event) => void;

  override init() {
    this.product = this.props.product();
    this.selected = this.props.selected?.() ?? false;
    this.disabled = this.props.disabled?.() ?? false;
    this.onTap =
      this.props.onTap ??
      (() => {
        // Do nothing
      });
  }

  template() {
    return (
      <span
        role="button"
        tabindex="0"
        class={`desom-calc-btn${this.selected ? " selected" : ""}`}
        {...(this.disabled ? { "aria-disabled": true } : {})}
        onTap={(e: Event) => !(this.props.disabled?.() ?? false) && this.onTap(e)}
      >
        <span class="product-icon">
          <DCGAppIcon product={this.props.product()} size="90px" />
        </span>
        <span class="product-label">{this.props.label}</span>
      </span>
    );
  }
}
