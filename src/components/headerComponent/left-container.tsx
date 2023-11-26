import { Tooltip } from "..";
import { Component, jsx } from "../../DCGView";
import { DesmosOM } from "../../globals";

export default class LeftContainer extends Component<{}> {
  template() {
    return (
      <div class="left-container">
        <h1 class="graph-title">Untitled Graph</h1>
        <Tooltip tooltip={DesmosOM.format("account-shell-button-open-graph")} gravity="s">
          <button
            class="dcg-btn-primary desom-save-btn desom-icons-folder-open"
            style="padding: 0 10px; height: 32px; line-height: 32px;"
          ></button>
        </Tooltip>
        <Tooltip tooltip={DesmosOM.format("account-shell-button-mygraphs-save")} gravity="s">
          <button
            class="dcg-btn-primary desom-save-btn desom-icons-save"
            style="padding: 0 10px; height: 32px; line-height: 32px;"
          ></button>
        </Tooltip>
      </div>
    );
  }
}
