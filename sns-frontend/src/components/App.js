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
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
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
  null,
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(App);
