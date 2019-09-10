import React from "react";
import PageTemplate from "components/common/pageTemplate";
import HeaderContainer from "../containers/common/HeaderContainer";
import UserInfoContainer from "containers/user/UserInfoContainer";
import LoginModalContainer from "containers/modal/LoginModalContainer";

import AskModalContainer from "containers/modal/AskModalContainer";

const UserPage = ({ history }) => {
  return (
    <PageTemplate>
      <HeaderContainer />
      <LoginModalContainer />
      <AskModalContainer />
      <UserInfoContainer history={history} />
    </PageTemplate>
  );
};

export default UserPage;
