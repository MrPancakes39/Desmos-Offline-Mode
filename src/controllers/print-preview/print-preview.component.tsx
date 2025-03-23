import "./print-preview.style.less";
import { Fragment } from "~/components";
import { Component, jsx } from "~/globals/DCGView";
import type { DesmosOfflineMode } from "~/types/DSOM";

export class PPreviewContainer extends Component<{
  dsom: DesmosOfflineMode;
}> {
  dsom!: DesmosOfflineMode;

  override init() {
    this.dsom = this.props.dsom();
  }

  template() {
    return (
      <Fragment>
        <div class="dsom-pprint-header">
          <button
            type="button"
            role="link"
            tabindex="0"
            class="dcg-link dsom-pprint-close"
            onTap={() => this.dsom.ppreviewController.close()}
          >
            « Close preview
          </button>
        </div>
        <div class="dsom-pprint-content"></div>
      </Fragment>
    );
  }
}
