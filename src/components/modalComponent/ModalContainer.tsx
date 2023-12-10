import { Component, jsx } from "#DCGView";
import { Switch } from "..";
import GenericModal from "./GenericModal";
import { type ModalType } from "./modal";

export default class ModalContainer extends Component<{
  modalType: ModalType;
  closeModal: () => void;
}> {
  template() {
    return (
      <Switch key={() => this.props.modalType()}>
        {(type: ModalType) => {
          switch (type) {
            case "show":
              return <GenericModal title={"Test Title"} close={this.props.closeModal} />;
            case "none":
              return null;
          }
        }}
      </Switch>
    );
  }
}
