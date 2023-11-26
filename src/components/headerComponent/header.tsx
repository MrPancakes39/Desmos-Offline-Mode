import "./header.less";
import { Component, jsx } from "../../DCGView";
import type { CalcController } from "../../globals";
import CenterContainer from "./center-container";

export default class Header extends Component<{ controller: CalcController }> {
  template() {
    return (
      <div class="dcg-header">
        <div class="left-container"></div>
        <CenterContainer controller={this.props.controller} />
        <div class="left-container"></div>
      </div>
    );
  }
}
