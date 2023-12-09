import "./modal.less";
import { If } from ".";
import { Component, jsx } from "#DCGView";
import { DesmosOM } from "#globals";

export default class Modal extends Component<{
  title: string;
  showModal: boolean;
}> {
  template() {
    return (
      <If predicate={() => this.props.showModal()}>
        {() => (
          <div role="dialog" class="desom-modal-container">
            <div class="desom-modal-background" onTap=""></div>
            <div class="desom-modal">
              <span
                role="link"
                tabindex="0"
                aria-label={DesmosOM.format("shared-button-close-dialog")}
                class="close-modal"
                onTap=""
              >
                <i class="dcg-icon-remove"></i>
              </span>
              <div class="modal-dialog">
                <h1>{this.props.title()}</h1>
                <div class="modal-content">{this.children}</div>
              </div>
            </div>
          </div>
        )}
      </If>
    );
  }
}
