import "./modal.less";
import { jsx } from "#DCGView";
import { Modal } from "./modal";
import { mergeClass, type MaybeClassDict } from "#utils";

import type DesmosOfflineMode from "#DSOM";

export default class GenericModal extends Modal<{
  title: string;
  class?: MaybeClassDict;
  useWrapper?: boolean;
  format: DesmosOfflineMode["format"];
}> {
  useWrapper!: boolean;

  override init() {
    this.useWrapper = this.props.useWrapper?.() ?? true;
  }

  template() {
    return (
      <div role="dialog" aria-modal="true" class={mergeClass("desom-modal-container", this.props.class?.())}>
        <div class="desom-modal-background" onTap={() => this.props.close()}></div>
        <div class="desom-modal">
          <span
            role="link"
            tabindex="0"
            aria-label={() => this.props.format("shared-button-close-dialog")}
            class="close-modal"
            onTap={() => this.props.close()}
          >
            <i class="dcg-icon-remove"></i>
          </span>
          <div class="modal-dialog">
            <h1>{this.props.title()}</h1>
            {this.useWrapper ? <div class="modal-content">{this.props.children}</div> : this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
