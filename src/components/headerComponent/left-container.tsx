import { Tooltip } from "..";
import { Component, jsx } from "../../DCGView";
import { DesmosOM } from "../../globals";

export default class LeftContainer extends Component<{}> {
  template() {
    return (
      <div class="left-container">
        <Tooltip tooltip={DesmosOM.format("account-shell-text-mygraphs-new-blank-graph")} gravity="s">
          <button class="desom-icons-file-plus desom-new-file"></button>
        </Tooltip>
        <h1 class="graph-title">Untitled Graph</h1>
        <Tooltip tooltip={DesmosOM.format("account-shell-button-open-graph")} gravity="s">
          <button class="dcg-btn-primary desom-icon-btn desom-icons-folder-open"></button>
        </Tooltip>
        <Tooltip tooltip={DesmosOM.format("account-shell-button-mygraphs-save")} gravity="s">
          <button class="dcg-btn-primary desom-icon-btn desom-icons-save"></button>
        </Tooltip>
      </div>
    );
  }
}
