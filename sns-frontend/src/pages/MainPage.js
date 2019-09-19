import React from 'react';
import PageTemplate from 'components/common/pageTemplate';
import HeaderContainer from '../containers/common/HeaderContainer';
import LoginModalContainer from "containers/modal/LoginModalContainer";
import AskModalContainer from "containers/modal/AskModalContainer";
import SigninModalContainer from 'containers/modal/SigninModalContainer';
import PostcodeModalContainer from '../containers/modal/PostcodeModalContainer';

const MainPage = ({history}) =>(
    <PageTemplate>
        <HeaderContainer/>
        <LoginModalContainer />
        <AskModalContainer history={history}/>
        <SigninModalContainer/>
        <PostcodeModalContainer/>
    </PageTemplate>
)

export default MainPage;