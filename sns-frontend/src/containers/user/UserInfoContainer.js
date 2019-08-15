import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "store/modules/user";
import UserInfo from "components/user/UserInfo";
import storage from "lib/storage";

class UserInfoContainer extends Component {
  initializeUserInfo = async () => {
    const { UserActions } = this.props;
    const user = storage.get("loggedInfo");
    if (!user) return;

    //console.log("userinfocontainer >>>>>>>>>>"+userid);
    try {
      await UserActions.uinfo(user._id);
    } catch (e) {
      console.log(e);
    }
  };

  handleChange = (e)=>{
    const { name, value } = e.target;
    const { UserActions } = this.props;
    let type = "userinfoinput";
    UserActions.changeUserInput({type,name,value});
  }
  componentDidMount() {
    this.initializeUserInfo();
  }

  render() {
    const { handleChange } = this;
    const { userinfo : info } = this.props;
    const { password , password_confirm } = this.props.userinfoinput.toJS();
    console.dir(info);
    const userinfo = info.toJS();
    console.log(userinfo);
    return <UserInfo userinfo={userinfo} handleChange={handleChange} password={password} password_confirm={password_confirm} />;
  }
}

export default connect(
  state => ({
    userinfo: state.user.get("userinfo"),
    userinfoinput : state.user.get("userinfoinput")
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(UserInfoContainer);
