import { Component, jsx } from "#DCGView";
import { Switch } from "..";
import NewGraphModal from "./NewGraphModal";
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
            case "none":
              return null;
            case "new-graph":
              return <NewGraphModal close={this.props.closeModal} />;
          }
        }}
      </Switch>
    );
  }
}
