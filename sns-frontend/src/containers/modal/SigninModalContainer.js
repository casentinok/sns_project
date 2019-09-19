import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "store/modules/user";
import * as modalActions from "store/modules/modal";
import SigninModal from "components/modal/SigninModal";

class SiginModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target: "",
      error: {
        userid: false,
        password: false,
        password_confirm: false,
        phone: false,
        email: false
      },
      message: {
        userid: "",
        password: "",
        password_confirm: "",
        phone: "",
        email: ""
      }
    };
  }
  handleSigninClick = async e => {
    e.preventDefault();
    const { signininfo, UserActions, ModalActions } = this.props;
    const { error } = this.state;
    const keys = Object.keys(error);
    await keys.forEach(k => {
      if (error[k]) {
        console.log('returned');
        return;
      }
    });
    try {
      await UserActions.join(signininfo.toJS());
      ModalActions.hideModal('signin');
    } catch (e) {
      console.log(e);
    }
  };
  handleCancel = () => {
    const { ModalActions } = this.props;
    ModalActions.hideModal("signin");
  };
  handleChange = async e => {
    const IdRegex = /^[A-Za-z0-9+]*$/;
    const EmailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    const PhoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
    const PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    const { name, value } = e.target;
    const { UserActions } = this.props;
    const { changeState } = this;

    //const {error} = signinfo.toJS();
    let type = "signininfo";
    let message = "";
    UserActions.changeUserInput({ type, name, value });
    //id check
    if (name === "userid") {
      if (value.length < 5 || value.length > 20) {
        await UserActions.setError({type, error : true});
        message = "5글자이상 20글자이하만 작성가능합니다";
        console.log(message);
      } else if (!IdRegex.test(value)) {
        await UserActions.setError({type, error : true});
        message = "영문과 숫자 조합만 사용가능합니다.";
      } else {
        await UserActions.setError({type, error :false});
      }
      changeState(name, message);
    }
    // email check
    if (name === "email") {
      if (!EmailRegex.test(value)) {
        await UserActions.setError({type, error :true});
        message = "잘못된 이메일 형식입니다.";
      } else {
        await UserActions.setError({type, error :false});
      }
      changeState(name, message);
    }
    // phone check
    if (name === "phone") {
      if (!PhoneRegex.test(value)) {
        console.log("phone validated");
        await UserActions.setError({type, error :true});
        message = "잘못된 형식입니다.";
      } else {
        await UserActions.setError({type, error :false});
      }
      changeState(name, message);
    }
    // password check
    if(name === "password"){
      if(!PasswordRegex.test(value)){
        await UserActions.setError({type, error :true});
        message ="비밀번호는 최소 8자리, 숫자, 문자, 특수문자 각각 1개 이상 포함해야 합니다.";
      }else {
        await UserActions.setError({type, error :false});
      }
      changeState(name , message);
    }

    if(name === "password_confirm"){
      const { password } = this.props.signininfo.toJS();
      if(password !== value){
        await UserActions.setError({type, error :true});
        message = "비밀번호가 일치하지 않습니다.";
      }else{
        await UserActions.setError({type, error :false});
      }
      changeState(name,message);
    }
  };

  changeState = (name, message) => {
    const { error } = this.props;
    console.log(error);
    this.setState({
      target: name,
      error: {
        ...this.state.error,
        [name]: error
      },
      message: {
        ...this.state.message,
        [name]: message
      }
    });
  };
  handlePostcodeinModal = () => {
    const { ModalActions } = this.props;
    ModalActions.showModal("postcode");
  };
  handleCheckOverlap = async e => {
    const { name, value } = e.target;
    const { UserActions } = this.props;
    const { error } = this.state;
    const { changeState } = this;
    let message = "";
    console.log("call blur");
    if (value.length === 0) {
      return;
    }
    try {
      if (name.indexOf("password") === -1) {
        if (!error[name]) {
          await UserActions.checkOverlap({ name, value });
          const { error } = this.props;
          if (error) {
            message = "존재하는 아이디 입니다.";
            changeState(name, message);
          } else {
            message = "";
            changeState(name, message);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const {
      handleChange,
      handleSigninClick,
      handlePostcodeinModal,
      handleCheckOverlap,
      handleCancel
    } = this;
    const { visible } = this.props;
    const {
      userid,
      name,
      password,
      password_confirm,
      email,
      phone
    } = this.props.signininfo.toJS();
    const { target, message, error } = this.state;
    return (
      <SigninModal
        visible={visible}
        userid={userid}
        name={name}
        password={password}
        passwordConfirm={password_confirm}
        email={email}
        error={error}
        target={target}
        message={message}
        phone={phone}
        onChange={handleChange}
        onCancel={handleCancel}
        onSigninClick={handleSigninClick}
        onPostcodeModal={handlePostcodeinModal}
        handleCheckOverlap={handleCheckOverlap}
      />
    );
  }
}

export default connect(
  state => ({
    visible: state.modal.get("signin"),
    postcode: state.modal.get("postcode"),
    signininfo: state.user.get("signininfo"),
    error: state.user.getIn(["signininfo", "error"])
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
    ModalActions: bindActionCreators(modalActions, dispatch)
  })
)(SiginModalContainer);
