import "./header.less";
import { Component, jsx } from "#DCGView";
import CenterContainer from "./center-container";
import LeftContainer from "./left-container";
import RightContainer from "./right-container";

import type DesmosOfflineMode from "#DSOM";

export class Header extends Component<{
  dsom: DesmosOfflineMode;
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
        <RightContainer dsom={this.dsom} />
      </div>
    );
  }
}
