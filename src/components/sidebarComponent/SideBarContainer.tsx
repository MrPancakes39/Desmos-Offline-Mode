import "./sidebar.less";
import { Component, jsx } from "#DCGView";
import DCGButton from "../Button";
import Fragment from "../Fragment";
import type DesmosOfflineMode from "#DSOM";

export class SideBarContainer extends Component<{
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
          <div class="app-name" tabindex="0">
            Desmos Offline Mode
          </div>
          <div class="new-blank-graph" tabindex="0">
            <span class="dcg-add-blank">
              <i class="dcg-icon-plus" aria-hidden="true"></i>
            </span>
            <span class="new-graph-title">{this.dsom.format("account-shell-text-mygraphs-new-blank-graph")}</span>
          </div>
          {/* <div>Placeholder</div> */}
          <div class="side-bar-item" tabindex="0">
            <span class="icon desom-icons-folder-open"></span>
            <span class="label">{this.dsom.format("account-shell-button-open-graph")}</span>
          </div>
          <div class="side-bar-item" tabindex="0">
            <span class="icon desom-icons-save"></span>
            <span class="label">{this.dsom.format("account-shell-button-mygraphs-save")}</span>
          </div>
          <div class="side-bar-item" tabindex="0">
            <span class="icon dcg-icon-share"></span>
            <span class="label">{"Import/Export Graph"}</span>
          </div>
          <div class="side-bar-item" tabindex="0">
            <span class="icon dcg-icon-export"></span>
            <span class="label">{this.dsom.format("account-shell-button-export-image")}</span>
          </div>
          <div class="side-bar-item" tabindex="0">
            <span class="icon dcg-icon-print"></span>
            <span class="label">{this.dsom.format("account-shell-button-print")}</span>
          </div>
          <div class="side-bar-item seperator" tabindex="0">
            <span class="icon dcg-icon-world"></span>
            <span class="label">{this.dsom.format("shared-title-language-menu")}</span>
          </div>
          <div class="side-bar-item" tabindex="0">
            <span class="icon desom-icons-calc"></span>
            <span class="label">{"Switch Calculators"}</span>
          </div>
          <div class="side-bar-item" tabindex="0">
            <span class="icon desom-icons-info"></span>
            <span class="label">{"About"}</span>
          </div>
        </div>

        <div class="side-bar-cover" onTap={this.props.closeSideBar}></div>
      </Fragment>
    );
  }
}
