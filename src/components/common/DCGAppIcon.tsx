import "./dcgappicon.less";
import { Component, jsx } from "#DCGView";

export type DCGProduct = "graphing" | "geometry" | "3d" | "scientific" | "four-function" | "test-mode" | "matrix";

export default class DCGAppIcon extends Component<{
  product: DCGProduct;
  size?: string;
}> {
  template() {
    return (
      <span class="desom-dcg-product" {...(this.props.size ? { style: "--icon-size:" + this.props.size() } : null)}>
        <i class={() => "dcg-icon-" + this.props.product()}></i>
      </span>
    );
  }
}
