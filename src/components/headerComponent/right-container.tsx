import { Tooltip } from "..";
import { Component, jsx } from "../../DCGView";
import window from "../../globals";
import DCGAppIcon from "../DCGAppIcon";

export default class RightContainer extends Component<{}> {
  template() {
    return (
      <div class="right-container">
        <Tooltip tooltip={window.DSOM.format("account-shell-label-help")}>
          <div class="center-div">
            <span class="dcg-icon-question-sign desom-icon-inline" onTap={() => console.log("help")}></span>
          </div>
        </Tooltip>
        <span style="margin-left: 30px;"></span>
        <DCGAppIcon product="graphing" size="40px" />
        <DCGAppIcon product="scientific" />
        <DCGAppIcon product="four-function" />
        <DCGAppIcon product="test-mode" />
        <DCGAppIcon product="matrix" />
        <DCGAppIcon product="geometry" />
        <DCGAppIcon product="3d" />
      </div>
    );
  }
}
