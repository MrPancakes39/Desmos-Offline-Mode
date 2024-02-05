import { Tooltip } from "..";
import { Component, jsx } from "#DCGView";
import window from "#globals";
import DCGButton from "../Button";

export default class LeftContainer extends Component<{}> {
  template() {
    return (
      <div class="left-container">
        <Tooltip tooltip={""} gravity="s">
          <div class="center-div sidebar-fix">
            <DCGButton
              color="invisible"
              onTap={() => window.DSOM.sidebarController.toggleSideBar()}
              class="desom-icon-btn sidebar-menu-btn"
            >
              <i class="dcg-icon-hamburger" aria-hidden="true"></i>
            </DCGButton>
          </div>
        </Tooltip>
        <h1 class="graph-title">Untitled Graph</h1>
      </div>
    );
  }
}
