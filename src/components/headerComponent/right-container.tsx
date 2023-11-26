import { Tooltip } from "..";
import { Component, jsx } from "../../DCGView";
import { DesmosOM } from "../../globals";

export default class RightContainer extends Component<{}> {
  template() {
    return (
      <div class="right-container">
        <Tooltip tooltip={DesmosOM.format("account-shell-label-help")}>
          <span class="dcg-icon-question-sign desom-icon-inline"></span>
        </Tooltip>
      </div>
    );
  }
}
