import { Component, jsx } from "#DCGView";
import { Switch } from "..";
import HotkeysModal from "./HotKeysModal/HotkeysModal";
import NewGraphModal from "./NewGraphModal";
import { type ModalType } from "./modal";
import type DesmosOfflineMode from "#DSOM";

export class ModalContainer extends Component<{
  modalType: ModalType;
  closeModal: () => void;
  format: DesmosOfflineMode["format"];
  updateViews: () => void;
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
            case "hotkeys":
              return (
                <HotkeysModal
                  close={this.props.closeModal}
                  format={this.props.format}
                  updateViews={this.props.updateViews}
                  product={"graphing"}
                />
              );
          }
        }}
      </Switch>
    );
  }
}
