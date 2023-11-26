import "./header.less";
import { Component, jsx } from "../../DCGView";
import CenterContainer from "./center-container";
import LeftContainer from "./left-container";
import RightContainer from "./right-container";

export default class Header extends Component<{}> {
  template() {
    return (
      <div class="dcg-header">
        <LeftContainer />
        <CenterContainer />
        <RightContainer />
      </div>
    );
  }
}
