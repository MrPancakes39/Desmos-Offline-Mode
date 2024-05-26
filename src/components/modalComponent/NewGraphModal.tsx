import { jsx } from "#DCGView";
import { Modal } from "./modal";
import GenericModal from "./GenericModal";
import DCGButton from "../common/Button";

import type DesmosOfflineMode from "#DSOM";

export default class NewGraphModal extends Modal<{
  format: DesmosOfflineMode["format"];
}> {
  template() {
    return (
      <GenericModal
        title={() => this.props.format("dsom-modal-new-graph-title")}
        close={this.props.close}
        class="new-graph-modal"
      >
        <p>{() => this.props.format("dsom-modal-new-graph-message")}</p>
        <div class="btn-container">
          <DCGButton color="invisible" class="dcg-dark-gray-link" onTap={() => ""}>
            Cancel
          </DCGButton>
          <DCGButton color="red" onTap={() => ""}>
            New
          </DCGButton>
        </div>
      </GenericModal>
    );
  }
}
