import { Component, jsx } from "#DCGView";
import { Modal } from "./modal";
import GenericModal from "./GenericModal";
import DCGAppIcon, { type DCGProduct } from "../common/DCGAppIcon";

type SwitcherProduct = Extract<DCGProduct, "graphing" | "geometry" | "3d">;

const ProductName: Record<SwitcherProduct, string> = {
  graphing: "Graphing Calculator",
  geometry: "Geometry Tool",
  "3d": "3D Calculator",
};

export default class SwitcherModal extends Modal<{}> {
  template(): unknown {
    return (
      <GenericModal title={"Choose Desmos Calculator"} close={this.props.close} class="switcher-modal">
        <CalculatorButton product="graphing" selected={true} onTap={() => console.log("Graphing")} />
        <CalculatorButton product="geometry" onTap={() => console.log("Geometry")} />
        <CalculatorButton product="3d" disabled={true} onTap={() => console.log("3d")} />
      </GenericModal>
    );
  }
}

class CalculatorButton extends Component<{
  product: SwitcherProduct;
  selected?: boolean;
  disabled?: boolean;
  onTap?: (e: Event) => void;
}> {
  product!: SwitcherProduct;
  selected!: boolean;
  disabled!: boolean;
  onTap!: (e: Event) => void;

  init() {
    this.product = this.props.product();
    this.selected = this.props.selected?.() ?? false;
    this.disabled = this.props.disabled?.() ?? false;
    this.onTap = this.props.onTap ? this.props.onTap : () => {};
  }

  template() {
    return (
      <span
        role="button"
        tabindex="0"
        class={`desom-calc-btn${this.selected ? " selected" : ""}`}
        {...(this.disabled ? { "aria-disabled": true } : {})}
        onTap={(e: Event) => !this.props.disabled?.() && this.onTap(e)}
      >
        <span class="product-icon">
          <DCGAppIcon product={this.props.product()} size="90px" />
        </span>
        <span class="product-label">{ProductName[this.props.product()]}</span>
      </span>
    );
  }
}
