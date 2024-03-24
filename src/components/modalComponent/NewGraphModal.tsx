import { jsx } from "#DCGView";
import { Modal } from "./modal";
import GenericModal from "./GenericModal";
import DCGButton from "../common/Button";

export default class NewGraphModal extends Modal<{}> {
  template() {
    return (
      <GenericModal title="Create New Graph" close={this.props.close} class="new-graph-modal">
        <p>Are you sure you want to create a new graph? This graph will be lost</p>
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
