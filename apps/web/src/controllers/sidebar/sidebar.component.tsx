import "./sidebar.style.less";
import { DCGButton, Fragment } from "~/components";
import { Component, jsx } from "~/globals/DCGView";
import type { DesmosOfflineMode } from "~/types/DSOM";

export class SideBarContainer extends Component<{
  dsom: DesmosOfflineMode;
  toggleSideBar: () => void;
  closeSideBar: () => void;
}> {
  dsom!: DesmosOfflineMode;

  override init() {
    this.dsom = this.props.dsom();
  }

  template() {
    return (
      <Fragment>
        <DCGButton color="invisible" onTap={this.props.toggleSideBar} class="desom-icon-btn sidebar-menu-btn">
          <i class="dcg-icon-hamburger" aria-hidden="true"></i>
        </DCGButton>

        <div class="side-bar-content" role="menu">
          {/* not a menu item, but needed to make the sidebar focusable */}
          <div class="app-name" tabindex="0" role="menuitem">
            {() => this.dsom.format("dsom-app-name")}
          </div>
          <div class="new-blank-graph" tabindex="0" role="menuitem" onTap="">
            <span class="dcg-add-blank">
              <i class="dcg-icon-plus" aria-hidden="true"></i>
            </span>
            <span class="new-graph-title">{() => this.dsom.format("account-shell-button-mygraphs-new-graph")}</span>
          </div>
          {/* <div>Placeholder</div> */}
          <div class="side-bar-item" tabindex="0" role="menuitem">
            <span class="icon desom-icons-folder-open"></span>
            <span class="label">{() => this.dsom.format("account-shell-button-open-graph")}</span>
          </div>
          <div class="side-bar-item" tabindex="0" role="menuitem">
            <span class="icon desom-icons-save"></span>
            <span class="label">{() => this.dsom.format("account-shell-button-save")}</span>
          </div>
          <div class="side-bar-item" tabindex="0" role="menuitem">
            <span class="icon dcg-icon-share"></span>
            <span class="label">{() => this.dsom.format("dsom-sidebar-import-export-graph")}</span>
          </div>
          <div class="side-bar-item" tabindex="0" role="menuitem">
            <span class="icon dcg-icon-export"></span>
            <span class="label">{() => this.dsom.format("account-shell-button-export-image")}</span>
          </div>
          <div class="side-bar-item" tabindex="0" role="menuitem">
            <span class="icon dcg-icon-print"></span>
            <span class="label">{() => this.dsom.format("account-shell-button-print")}</span>
          </div>
          <div
            class="side-bar-item seperator"
            tabindex="0"
            role="menuitem"
            onTap={() => {
              this.dsom.modalController.showModal("switcher");
              this.dsom.sidebarController.hideSideBar();
            }}
          >
            <span class="icon desom-icons-calc"></span>
            <span class="label">{() => this.dsom.format("dsom-sidebar-switch-calculators")}</span>
          </div>
          <div class="side-bar-item" tabindex="0" role="menuitem">
            <span class="icon desom-icons-info"></span>
            <span class="label">{() => this.dsom.format("dsom-sidebar-about")}</span>
          </div>
        </div>

        <div class="side-bar-cover" onTap={this.props.closeSideBar}></div>
      </Fragment>
    );
  }
}
