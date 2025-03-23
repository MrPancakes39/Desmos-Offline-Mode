import "./header.less";
import { Component, jsx } from "#DCGView";
import CenterContainer from "./center-container";
import LeftContainer from "./left-container";
import RightContainer from "./right-container";

import type DesmosOfflineMode from "#DSOM";
import type { HeaderMenuProp } from "../../header/header.controller";

export class Header extends Component<{
  dsom: DesmosOfflineMode;
  menu: HeaderMenuProp;
}> {
  dsom!: DesmosOfflineMode;

  init() {
    this.dsom = this.props.dsom();
  }

  template() {
    return (
      <div class="dcg-header">
        <LeftContainer dsom={this.dsom} />
        <CenterContainer dsom={this.dsom} />
        <RightContainer dsom={this.dsom} menu={this.props.menu} />
      </div>
    );
  }
}
