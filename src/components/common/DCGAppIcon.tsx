import "./dcgappicon.css";
import { Component, jsx } from "#DCGView";

type DCGProduct = "graphing" | "geometry" | "3d" | "scientific" | "four-function" | "test-mode" | "matrix";

export default class DCGAppIcon extends Component<{
  product: DCGProduct;
  size?: string;
}> {
  template() {
    return (
      <span class="dsm-dcg-product" {...(this.props.size ? { style: "--icon-size:" + this.props.size() } : null)}>
        <i class={() => "dcg-icon-" + this.props.product()}></i>
      </span>
    );
  }
}
