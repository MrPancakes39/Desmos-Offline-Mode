import "./styles.less";
import { Component, jsx } from "~/globals/DCGView";
import { mergeClass, type MaybeClassDict } from "~/utils";

type BtnColor =
  | "primary"
  | "secondary"
  | "blue"
  | "red"
  | "pink"
  | "green" // Added back myself
  | "white-outline"
  | "invisible";
// might have more but these are what I'm willing to support

export class DCGButton extends Component<{
  color: BtnColor;
  class?: MaybeClassDict;
  onTap: (e: Event) => void;
  disabled?: boolean;
  "aria-label"?: string;
}> {
  template() {
    return (
      <span
        role="button"
        tabindex="0"
        class={() =>
          mergeClass(
            {
              ["dcg-btn-" + this.props.color()]: true,
              "dcg-disabled": this.props.disabled?.() ?? false,
            },
            this.props.class?.()
          )
        }
        {...(this.props["aria-label"] !== undefined ? { "aria-label": this.props["aria-label"]() } : null)}
        onTap={(e: Event) => !(this.props.disabled?.() ?? false) && this.props.onTap(e)}
      >
        {this.props.children}
      </span>
    );
  }
}
