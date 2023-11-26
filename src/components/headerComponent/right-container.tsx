import { Tooltip } from "..";
import { Component, jsx } from "../../DCGView";
import { DesmosOM } from "../../globals";

export default class RightContainer extends Component<{}> {
  template() {
    return (
      <div class="right-container">
        <Tooltip tooltip={DesmosOM.format("account-shell-label-help")}>
          <div class="center-container">
            <span class="dcg-icon-question-sign desom-icon-inline"></span>
          </div>
        </Tooltip>
      </div>
    );
  }
}
