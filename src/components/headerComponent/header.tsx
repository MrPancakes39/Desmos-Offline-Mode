import "./header.less";
import { Component, jsx } from "../../DCGView";
import CenterContainer from "./center-container";
import LeftContainer from "./left-container";

export default class Header extends Component<{}> {
  template() {
    return (
      <div class="dcg-header">
        <LeftContainer />
        <CenterContainer />
        <div class="left-container"></div>
      </div>
    );
  }
}
