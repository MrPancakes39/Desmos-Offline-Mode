import "./print-preview.style.less";
import { Component, jsx } from "#DCGView";
import Fragment from "../components/common/Fragment";
import type DesmosOfflineMode from "#DSOM";

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
