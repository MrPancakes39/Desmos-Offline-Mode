import "./button.css";
import { Component, jsx } from "../DCGView";
import { mergeClass, MaybeClassDict } from "../utils";

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

export default class DCGButton extends Component<{
  color: BtnColor;
  class?: MaybeClassDict;
  onTap: (e: Event) => void;
  disabled?: boolean;
}> {
  template() {
    return (
      <span
        role="button"
        class={() =>
          mergeClass(
            {
              ["dcg-btn-" + this.props.color()]: true,
              "dcg-disabled": this.props.disabled?.() ?? false,
            },
            this.props.class?.()
          )
        }
        onTap={(e: Event) => !this.props.disabled?.() && this.props.onTap(e)}
      >
        {this.children}
      </span>
    );
  }
}
