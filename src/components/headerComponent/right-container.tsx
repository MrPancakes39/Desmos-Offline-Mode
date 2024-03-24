import { Tooltip } from "..";
import { Component, jsx } from "#DCGView";
import type DesmosOfflineMode from "#DSOM";

export default class RightContainer extends Component<{
  dsom: DesmosOfflineMode;
}> {
  dsom!: DesmosOfflineMode;

  init() {
    this.dsom = this.props.dsom();
  }

  template() {
    return (
      <div class="right-container">
        <Tooltip tooltip={this.dsom.format("account-shell-label-help")}>
          <div class="center-div">
            <span class="dcg-icon-question-sign desom-icon-inline" onTap={() => console.log("help")}></span>
          </div>
        </Tooltip>
      </div>
    );
  }
}
