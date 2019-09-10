import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { MainPage, UserPage } from "pages";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "store/modules/user";

import storage from "lib/storage";

class App extends Component {
  handleCheckLogin = async () => {
    const user = storage.get("loggedInfo");
    if (!user) return;

    const { UserActions } = this.props;

    try {
      await UserActions.check();
      const { result } = this.props;
      const { logout } = result.toJS();

      if (logout) {
        storage.remove("loggedInfo");
      }
      
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    console.log("Appmounted");
    this.handleCheckLogin();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/uinfo" component={UserPage} />
        </Switch>
      </div>
    );
  }
}
export default connect(
  state => ({
    result: state.user.get("result")
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(App);
