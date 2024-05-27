import { Component, jsx } from "#DCGView";
import { Switch } from "..";
import HotkeysModal from "./HotKeysModal/HotkeysModal";
import NewGraphModal from "./NewGraphModal";
import SwitcherModal from "./SwitcherModal";

import { type ModalType } from "./modal";
import type DesmosOfflineMode from "#DSOM";

export class ModalContainer extends Component<{
  modalType: ModalType;
  closeModal: () => void;
  dsom: DesmosOfflineMode;
}> {
  dsom!: DesmosOfflineMode;

  init() {
    this.dsom = this.props.dsom();
  }

  template() {
    return (
      <Switch key={() => this.props.modalType()}>
        {(type: ModalType) => {
          switch (type) {
            case "none":
              return null;
            case "new-graph":
              return <NewGraphModal close={this.props.closeModal} format={(...args) => this.dsom.format(...args)} />;
            case "hotkeys":
              return (
                <HotkeysModal
                  close={this.props.closeModal}
                  format={(...args) => this.dsom.format(...args)}
                  updateViews={() => this.dsom.cc.updateViews()}
                  product={() => this.dsom.switcherController.selected!.type}
                />
              );
            case "switcher":
              return (
                <SwitcherModal
                  close={this.props.closeModal}
                  switcher={this.dsom.switcherController}
                  format={(...args) => this.dsom.format(...args)}
                  currentLanguage={() => this.dsom.currentLanguage()}
                />
              );
          }
        }}
      </Switch>
    );
  }
}
