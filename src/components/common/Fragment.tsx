import { Component, jsx } from "#DCGView";

export default class Fragment extends Component {
  template() {
    return <div>{this.props.children}</div>;
  }

  didMount() {
    const wrapperNode = this._element._domNode;
    const childNodes = wrapperNode?.childNodes;
    if (childNodes) wrapperNode?.replaceWith(...childNodes);
  }
}
