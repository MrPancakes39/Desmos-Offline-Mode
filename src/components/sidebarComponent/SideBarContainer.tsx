import "./sidebar.less";
import { Component, jsx } from "#DCGView";
import DCGButton from "../Button";
import Fragment from "../Fragment";
import type DesmosOfflineMode from "#DSOM";

export default class SideBarContainer extends Component<{
  dsom: DesmosOfflineMode;
  toggleSideBar: () => void;
  closeSideBar: () => void;
}> {
  dsom!: DesmosOfflineMode;

  init() {
    this.dsom = this.props.dsom();
  }

  template() {
    return (
      <Fragment>
        <DCGButton color="invisible" onTap={this.props.toggleSideBar} class="desom-icon-btn sidebar-menu-btn">
          <i class="dcg-icon-hamburger" aria-hidden="true"></i>
        </DCGButton>

        <div class="side-bar-content">
          <div class="app-name">Desmos Offline Mode</div>
          <div class="new-blank-graph">
            <span class="dcg-add-blank">
              <i class="dcg-icon-plus" aria-hidden="true"></i>
            </span>
            <span class="new-graph-title">{this.dsom.format("account-shell-text-mygraphs-new-blank-graph")}</span>
          </div>
          {/* <div>Placeholder</div> */}
          <div class="side-bar-item">
            <span class="icon desom-icons-folder-open"></span>
            <span class="label">{this.dsom.format("account-shell-button-open-graph")}</span>
          </div>
          <div class="side-bar-item">
            <span class="icon desom-icons-save"></span>
            <span class="label">{this.dsom.format("account-shell-button-mygraphs-save")}</span>
          </div>
        </div>

        <div class="side-bar-cover" onTap={this.props.closeSideBar}></div>
      </Fragment>
    );
  }
}
