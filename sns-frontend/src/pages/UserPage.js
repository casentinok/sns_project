import React,{StrictMode} from "react";
import PageTemplate from "components/common/pageTemplate";
import HeaderContainer from "../containers/common/HeaderContainer";
import UserInfoContainer from "containers/user/UserInfoContainer";
import LoginModalContainer from "containers/modal/LoginModalContainer";

import AskModalContainer from "containers/modal/AskModalContainer";

const UserPage = ({ history }) => {
  return (
    <PageTemplate>
    <StrictMode>
      <HeaderContainer />
      <LoginModalContainer />
      <AskModalContainer history={history}/>
      <UserInfoContainer history={history} />
      </StrictMode>
    </PageTemplate>
  );
};

export default UserPage;
