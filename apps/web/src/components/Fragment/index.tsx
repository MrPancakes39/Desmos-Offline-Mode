import { Component, jsx } from "~/globals/DCGView";

export class Fragment extends Component {
  template() {
    return <div>{this.props.children}</div>;
  }

  didMount() {
    const wrapperNode = this._element._domNode;
    const childNodes = wrapperNode?.childNodes;
    if (childNodes !== undefined) wrapperNode?.replaceWith(...childNodes);
  }
}
