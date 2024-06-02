import { If, Tooltip } from "..";
import { Component, jsx } from "#DCGView";
import type DesmosOfflineMode from "#DSOM";
import type { HeaderMenuProp } from "../../controllers/HeaderController";

export default class RightContainer extends Component<{
  dsom: DesmosOfflineMode;
  menu: HeaderMenuProp;
}> {
  dsom!: DesmosOfflineMode;
  menu!: HeaderMenuProp;
  toggleHelp!: () => void;

  init() {
    this.dsom = this.props.dsom();
    this.menu = this.props.menu();

    this.toggleHelp = () => {
      if (this.menu.current() === "help") {
        this.menu.close();
      } else {
        this.menu.open("help");
      }
    };
  }

  template() {
    return (
      <div class="right-container">
        <Tooltip tooltip={() => this.dsom.format("account-shell-label-help")}>
          <div class="center-div">
            <span class="dcg-icon-question-sign desom-icon-inline" tabindex="0" onTap={() => this.toggleHelp()}></span>
          </div>
        </Tooltip>
        <If predicate={() => this.menu.current() === "help"}>
          {() => (
            <div class="desom-popover-container dcg-popover dcg-bottom">
              <div class="dcg-popover-interior">{HelpMenu(this.dsom)}</div>
              <span class="dcg-arrow"></span>
            </div>
          )}
        </If>
      </div>
    );
  }
}

function HelpMenu(dsom: DesmosOfflineMode) {
  return (
    <div class="desom-help-menu">
      <div class="message-container">
        <div class="message">{() => dsom.format("dsom-shell-help-message")}</div>
      </div>
      <a role="link" tabindex="0" class="dcg-link" onTap={() => dsom.modalController.showModal("hotkeys")}>
        <i class="dcg-icon-keyboard"></i>
        <span class="dcg-link-text">{() => dsom.format("account-shell-link-keyboard-shortcuts")}</span>
      </a>
    </div>
  );
}
