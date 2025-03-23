import "./header.style.less";
import { Component, jsx } from "~/globals/DCGView";
import type { DesmosOfflineMode } from "~/types/DSOM";

import { CenterContainer } from "./components/center-container";
import { LeftContainer } from "./components/left-container";
import { RightContainer } from "./components/right-container";
import type { HeaderMenuProp } from "./header.controller";

export class Header extends Component<{
  dsom: DesmosOfflineMode;
  menu: HeaderMenuProp;
}> {
  dsom!: DesmosOfflineMode;

  override init() {
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
