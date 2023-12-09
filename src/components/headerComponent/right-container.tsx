import { Tooltip } from "..";
import { Component, jsx } from "../../DCGView";
import window from "../../globals";

export default class RightContainer extends Component<{}> {
  template() {
    return (
      <div class="right-container">
        <Tooltip tooltip={window.DSOM.format("account-shell-label-help")}>
          <div class="center-container">
            <span class="dcg-icon-question-sign desom-icon-inline"></span>
          </div>
        </Tooltip>
      </div>
    );
  }
}
