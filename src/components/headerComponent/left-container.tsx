import { Tooltip } from "..";
import { Component, jsx } from "../../DCGView";
import { DesmosOM } from "../../globals";

export default class LeftContainer extends Component<{}> {
  template() {
    return (
      <div class="left-container">
        <Tooltip tooltip={DesmosOM.format("account-shell-text-mygraphs-new-blank-graph")} gravity="s">
          <div class="center-container">
            <button class="desom-icons-file-plus desom-icon-inline"></button>
          </div>
        </Tooltip>
        <h1 class="graph-title">Untitled Graph</h1>
        <Tooltip tooltip={DesmosOM.format("account-shell-button-open-graph")} gravity="s">
          <div class="center-container">
            <button class="dcg-btn-primary desom-icon-btn desom-icons-folder-open"></button>
          </div>
        </Tooltip>
        <Tooltip tooltip={DesmosOM.format("account-shell-button-mygraphs-save")} gravity="s">
          <div class="center-container">
            <button class="dcg-btn-primary desom-icon-btn desom-icons-save"></button>
          </div>
        </Tooltip>
      </div>
    );
  }
}
