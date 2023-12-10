import { Component, jsx } from "#DCGView";
import { If } from "..";
import GenericModal from "./GenericModal";
import { type ModalType } from "./modal";

export default class ModalContainer extends Component<{
  modalType: ModalType;
  closeModal: () => void;
}> {
  template() {
    return (
      <If predicate={() => this.props.modalType() !== "none"}>
        {() => {
          return <GenericModal title={"Test Title"} close={this.props.closeModal} />;
        }}
      </If>
    );
  }
}
