import { Component, jsx } from "#DCGView";
import { If } from "..";
import Modal from "./modal";
import { type ModalType } from "./ModalController";

export default class ModalContainer extends Component<{
  modalType: ModalType;
  closeModal: () => void;
}> {
  template() {
    return (
      <If predicate={() => this.props.modalType() !== "none"}>
        {() => {
          return <Modal title={"Test Title"} close={this.props.closeModal} />;
        }}
      </If>
    );
  }
}
