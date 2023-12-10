import { Component, jsx } from "#DCGView";
import { If } from "..";
import Modal from "./modal";

export default class ModalContainer extends Component<{
  shouldShow: () => boolean;
  closeModal: () => void;
}> {
  template() {
    return (
      <If predicate={() => this.props.shouldShow()}>
        {() => {
          return <Modal title={"Test Title"} close={this.props.closeModal} />;
        }}
      </If>
    );
  }
}
