import React, { Component } from "react";
import LoginModal from "components/modal/LoginModal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "store/modules/user";
import * as modalActions from "store/modules/modal";
import storage from "lib/storage";

class LoginModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      message:"아이디가 존재하지 않거나 비밀번호가 일치하지 않습니다."
    };
  }
  handleLogin = async () => {
    const { UserActions, ModalActions, logininfo } = this.props;
    const { userid, password } = logininfo.toJS();
    
    try {
      await UserActions.login({ userid, password });
      const { error } = this.props;
      if(error){       
        return;
      }
      const {_id,name,profile} = this.props.result.toJS();      
      const loggedInfo = {_id,name,profile};
      storage.set("loggedInfo", loggedInfo);
      ModalActions.hideModal("login");
    } catch (e) {
      console.log(e);
    }
  };
  handleCancel = () => {
    const { ModalActions } = this.props;
    ModalActions.hideModal("login");
  };
  handleChange = e => {
    const { name, value } = e.target;
    const { UserActions, error } = this.props;    
    let type = "logininfo";    
    if(error){
      UserActions.setError({type , error : false});
    }
    UserActions.changeUserInput({ type, name, value });    
  };
  handleKeyPress = e => {
    if (e.key === "Enter") {
      const { userid, password } = this.state;
      if (!userid && !password) {
        return;
      }
      this.handleLogin();
    }
  };
  componentDidMount() {
    console.log("componentDidMount");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
  render() {
    const {
      handleLogin,
      handleKeyPress,
      handleCancel,
      handleChange
    } = this;
    const { visible } = this.props;
    const { message } = this.state;
    const { userid, password, error } = this.props.logininfo.toJS();
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
        message={message}
      />
    );
  }
}

//export default LoginModalContainer;
export default connect(
  state => ({
    logininfo: state.user.get("logininfo"),
    error : state.user.getIn(["logininfo","error"]),
    visible: state.modal.get("login"),
    result: state.user.get("result")
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
    ModalActions: bindActionCreators(modalActions, dispatch)
  })
)(LoginModalContainer);
