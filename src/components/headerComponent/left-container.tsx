import { Tooltip } from "..";
import { Component, jsx } from "#DCGView";
import window from "#globals";
import DCGButton from "../Button";

export default class LeftContainer extends Component<{}> {
  template() {
    return (
      <div class="left-container">
        <Tooltip tooltip={window.DSOM.format("account-shell-text-mygraphs-new-blank-graph")} gravity="s">
          <div class="center-div">
            <DCGButton
              color="invisible"
              onTap={() => window.DSOM.modalController.showModal("new-graph")}
              class="desom-icons-file-plus desom-icon-inline"
              aria-label={window.DSOM.format("account-shell-text-mygraphs-new-blank-graph")}
            ></DCGButton>
          </div>
        </Tooltip>
        <h1 class="graph-title">Untitled Graph</h1>
        <Tooltip tooltip={window.DSOM.format("account-shell-button-open-graph")} gravity="s">
          <div class="center-div">
            <DCGButton
              color="primary"
              onTap={() => console.log("open")}
              class="dcg-btn-primary desom-icon-btn desom-icons-folder-open"
              aria-label={window.DSOM.format("account-shell-button-open-graph")}
            ></DCGButton>
          </div>
        </Tooltip>
        <Tooltip tooltip={window.DSOM.format("account-shell-button-mygraphs-save")} gravity="s">
          <div class="center-div">
            <DCGButton
              color="primary"
              onTap={() => console.log("save")}
              class="desom-icon-btn desom-icons-save"
              aria-label={window.DSOM.format("account-shell-button-mygraphs-save")}
            ></DCGButton>
          </div>
        </Tooltip>
      </div>
    );
  }
}
