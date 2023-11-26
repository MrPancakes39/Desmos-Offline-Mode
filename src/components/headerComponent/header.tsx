import "./header.less";
import { Component, jsx } from "../../DCGView";
import CenterContainer from "./center-container";

export default class Header extends Component<{}> {
  template() {
    return (
      <div class="dcg-header">
        <div class="left-container"></div>
        <CenterContainer />
        <div class="left-container"></div>
      </div>
    );
  }
}
