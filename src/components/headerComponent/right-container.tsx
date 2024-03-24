import { If, Tooltip } from "..";
import { Component, jsx } from "#DCGView";
import type DesmosOfflineMode from "#DSOM";

export default class RightContainer extends Component<{
  dsom: DesmosOfflineMode;
  showHelpMenu: boolean;
  toggleHelpMenu: () => void;
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
            <span
              class="dcg-icon-question-sign desom-icon-inline"
              tabindex="0"
              onTap={this.props.toggleHelpMenu}
            ></span>
          </div>
        </Tooltip>
        <If predicate={() => this.props.showHelpMenu()}>
          {() => (
            <div class="dsm-help-container dcg-popover dcg-bottom">
              <div class="dcg-popover-interior">
                <div class="message-container">
                  <div class="message">
                    You are using Desmos Offline Mode. As a result, some features may be missing. To use online version,
                    visit www.desmos.com/calculator
                  </div>
                </div>
                <a role="link" tabindex="0" class="dcg-link">
                  <i class="dcg-icon-keyboard"></i>
                  <span class="dcg-link-text">Keyboard Shortcuts</span>
                </a>
              </div>
              <span class="dcg-arrow"></span>
            </div>
          )}
        </If>
      </div>
    );
  }
}
