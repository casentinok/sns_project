import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "store/modules/user";
import * as modalActions from "store/modules/modal";
import AskModal from "components/modal/AskModal";
import storage from "lib/storage";

class AskModalContainer extends Component {
  handleOk = async () => {
    const { UserActions, ModalActions } = this.props;
    try {
      await UserActions.logout();
      storage.remove("loggedInfo");
      ModalActions.hideModal("ask");
    } catch (e) {
      console.log(e);
    }
  };
  handleCancel = () => {
    const { ModalActions } = this.props;
    ModalActions.hideModal("ask");
  };
  
  render() {
    const { handleOk, handleCancel } = this;
    const { visible, message } = this.props;
    return (
      <AskModal
        visible={visible}
        message={message}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    );
  }
}

export default connect(
  state => ({
    visible: state.modal.get("ask"),
    message: state.modal.get("message")
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
    ModalActions: bindActionCreators(modalActions, dispatch)
  })
)(AskModalContainer);
