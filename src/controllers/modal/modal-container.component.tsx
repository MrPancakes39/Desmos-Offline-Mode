import "./modal.style.less";
import { Switch } from "~/components";
import { Component, jsx } from "~/globals/DCGView";
import type { DesmosOfflineMode } from "~/types/DSOM";

import { HotkeysModal } from "./components/HotKeysModal/HotkeysModal";
import type { ModalType } from "./components/modal.component";
import { SwitcherModal } from "./components/SwitcherModal";

export class ModalContainer extends Component<{
  modalType: ModalType;
  closeModal: () => void;
  dsom: DesmosOfflineMode;
}> {
  dsom!: DesmosOfflineMode;

  override init() {
    this.dsom = this.props.dsom();
  }

  template() {
    return (
      <Switch key={() => this.props.modalType()}>
        {(type: ModalType) => {
          switch (type) {
            case "none":
              return null;
            case "hotkeys":
              return (
                <HotkeysModal
                  close={this.props.closeModal}
                  format={this.dsom.format.bind(this.dsom)}
                  updateViews={() => this.dsom.cc.updateViews()}
                  product={() => this.dsom.switcherController.selected?.type ?? "graphing"}
                />
              );
            case "switcher":
              return (
                <SwitcherModal
                  close={this.props.closeModal}
                  switcher={this.dsom.switcherController}
                  format={this.dsom.format.bind(this.dsom)}
                  currentLanguage={() => this.dsom.currentLanguage()}
                />
              );
          }
        }}
      </Switch>
    );
  }
}
