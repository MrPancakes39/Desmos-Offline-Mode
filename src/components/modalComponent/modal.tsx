import "./modal.less";
import { Component, jsx } from "#DCGView";
import window from "#globals";

export default class Modal extends Component<{
  title: string;
  close: () => void;
}> {
  template() {
    return (
      <div role="dialog" class="desom-modal-container">
        <div class="desom-modal-background" onTap={() => this.props.close()}></div>
        <div class="desom-modal">
          <span
            role="link"
            tabindex="0"
            aria-label={window.DSOM.format("shared-button-close-dialog")}
            class="close-modal"
            onTap={() => this.props.close()}
          >
            <i class="dcg-icon-remove"></i>
          </span>
          <div class="modal-dialog">
            <h1>{this.props.title()}</h1>
            <div class="modal-content">{this.children}</div>
          </div>
        </div>
      </div>
    );
  }
}
