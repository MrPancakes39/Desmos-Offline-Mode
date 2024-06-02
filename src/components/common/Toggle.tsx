// Reference: https://github.com/DesModder/DesModder/blob/main/src/components/Toggle.tsx
import "./Toggle.less";
import { Component, jsx } from "#DCGView";

export default class Toggle extends Component<{
  toggled: () => boolean;
  disabled: () => boolean;
  onChange: () => void;
}> {
  template() {
    return (
      <div
        class={() => ({
          "dcg-toggle-view": true,
          "dcg-toggled": this.props.toggled(),
          "desom-disabled-toggle": this.props.disabled(),
        })}
        onTap={() => this.props.onChange()}
      >
        <div class="dcg-toggle-switch" />
      </div>
    );
  }
}
