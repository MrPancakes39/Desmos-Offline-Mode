import { Tooltip } from "..";
import DCGButton from "../Button";
import { Component, jsx } from "#DCGView";
import type DesmosOfflineMode from "#DSOM";

export default class LeftContainer extends Component<{
  dsom: DesmosOfflineMode;
}> {
  dsom!: DesmosOfflineMode;

  init() {
    this.dsom = this.props.dsom();
  }

  template() {
    return (
      <div class="left-container">
        <Tooltip tooltip={""} gravity="s">
          <div class="center-div sidebar-fix">
            <DCGButton
              color="invisible"
              onTap={() => this.dsom.sidebarController.toggleSideBar()}
              class="desom-icon-btn sidebar-menu-btn"
            >
              <i class="dcg-icon-hamburger" aria-hidden="true"></i>
            </DCGButton>
          </div>
        </Tooltip>
        <h1 class="graph-title">{this.dsom.format("account-shell-text-untitled-graph")}</h1>
      </div>
    );
  }
}
