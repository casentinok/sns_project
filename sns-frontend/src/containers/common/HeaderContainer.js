import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as modalActions from "store/modules/modal";
import * as userActions from "store/modules/user";
import Header from "components/common/Header";

class HeaderContainer extends Component {
  handleLoginClick = () => {
    const { ModalActions } = this.props;
    ModalActions.showModal("login");
  };
  handleLogoutClick = () => {
    const { ModalActions } = this.props;
    let message = "로그아웃 하시겠습니까?";
    ModalActions.message(message);
    ModalActions.showModal("ask");
  };
  handleSigninClick = () => {
    const { ModalActions } = this.props;
    ModalActions.showModal("signin");
  };
  initialize = () => {
    /*  const {UserActions, result} = this.props;    
    const user =  storage.get("loggedInfo"); */
    console.log(this.props.message);
  };

  componentDidMount() {
    console.log("HEADER Container MOUNTED");
    this.initialize();
  }
  render() {
    const { handleLoginClick, handleLogoutClick, handleSigninClick } = this;
    const { login, name, _id, profile } = this.props;
    
    return (
      <Header
        onLoginModal={handleLoginClick}
        onLogoutModal={handleLogoutClick}
        onSigninModal={handleSigninClick}
        login={login}
        name={name}
        profile={profile}
        uid={_id}
      />
    );
  }
}

export default connect(
  state => ({
    login: state.modal.get("login"),
    name: state.user.getIn(["result", "name"]),
    _id: state.user.getIn(["result", "_id"]),
    profile : state.user.getIn(['result','profile']),
    message: state.modal.get("message"),  
  }),
  dispatch => ({
    ModalActions: bindActionCreators(modalActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(HeaderContainer);
