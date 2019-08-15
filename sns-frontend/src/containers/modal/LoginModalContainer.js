import React, { Component } from "react";
import LoginModal from "components/modal/LoginModal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "store/modules/user";
import * as modalActions from "store/modules/modal";
import storage from 'lib/storage';

class LoginModalContainer extends Component {
  handleLogin = async () => {
    const { UserActions, ModalActions, logininfo } = this.props;
    const { userid, password } = logininfo.toJS();
    try {
      await UserActions.login({ userid, password });
      const loggedInfo = this.props.result.toJS();
      
      storage.set('loggedInfo',loggedInfo);
      ModalActions.hideModal("login");
    } catch (e) {
      console.log(e);
      //this.setError("잘못된 계정정보입니다.");
    }
  };
  handleCancel = () => {
    const { ModalActions } = this.props;
    ModalActions.hideModal("login");
  };
  handleChange = e => {
    const { name, value } = e.target;
    const { UserActions } = this.props;
    let type = "logininfo";
    UserActions.changeUserInput({type, name, value });
  };
  handleKeyPress = e => {
    if (e.key === "Enter") {
      const { userid, password } = this.state;
      if (!userid && !password) {
        return null;
      }
      this.handleLogin();
    }
  };
  componentDidMount(){
    console.log("componentDidMount");
  }
  componentWillUnmount(){
    console.log("componentWillUnmount");
  }
  render() {
    const { handleLogin, handleKeyPress, handleCancel, handleChange } = this;
    const { visible } = this.props;
    const { userid, password ,error} = this.props.logininfo.toJS();
    return (
      <LoginModal
        onLogin={handleLogin}
        onCancel={handleCancel}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        visible={visible}
        userid={userid}
        password={password}
        error={error}
      />
    );
  }
}

//export default LoginModalContainer;
export default connect(
  state => ({
    logininfo: state.user.get("logininfo"),
    visible: state.modal.get("login"),
    result : state.user.get('result')
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
    ModalActions: bindActionCreators(modalActions, dispatch)
  })
)(LoginModalContainer);
