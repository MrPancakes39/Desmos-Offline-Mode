import "./modal.less";
import { jsx } from "#DCGView";
import window from "#globals";
import { Modal } from "./modal";
import { mergeClass, MaybeClassDict } from "#utils";

export default class GenericModal extends Modal<{
  title: string;
  class?: MaybeClassDict;
}> {
  template() {
    return (
      <div role="dialog" aria-modal="true" class={mergeClass("desom-modal-container", this.props.class?.())}>
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
