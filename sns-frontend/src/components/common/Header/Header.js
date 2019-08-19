import React from "react";
import styles from "./Header.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Logo from "log_text_20190530.svg";
const cx = classNames.bind(styles);

const Header = ({ onLoginModal, onLogoutModal,onSigninModal, name, profile, uid}) => {  
  const LI = name ? (
    <ul>
      <li>
        {/*<FontAwesomeIcon icon={faUser} />*/}
        <img className={cx("profile_img")} src={`/img/${profile}`} alt="user's profile"/>
        <span>
          <Link to={`/uinfo/${uid}`}>{name} 님</Link>
        </span>
      </li>
      <li>
      <FontAwesomeIcon icon={faSignOutAlt} />
      <span onClick={onLogoutModal}>Logout</span>
    </li>
    </ul>
  ) : ( 
    <ul>
      <li>
        <FontAwesomeIcon icon={faUser} />
        <span onClick={onLoginModal}>Login</span>
      </li>
      <li>
        <FontAwesomeIcon icon={faSignInAlt} />
        <span onClick={onSigninModal}>Sign in</span>
      </li>
    </ul>
  );
  
  return (
    <header className={cx("header")}>
      <div className={cx("header-content clear-fix")}>
        <h1 className={cx("logo")}>
          <Link to="/">
            <img src={Logo} alt="sosial n space" />
          </Link>
        </h1>
        <div className={cx("member clear-fix")}>{LI}</div>
      </div>
    </header>
  );
};

export default Header;
/*
 <ul>
            <li>
              <FontAwesomeIcon icon={faUser} />
              {name ? (
                <span>
                  <Link to={`/info/${uid}`}>{name} 님</Link>
                </span>
              ) : (
                <span onClick={onLoginModal}>Login</span>
              )}
            </li>
            {name ? null : (
              <li>
                <FontAwesomeIcon icon={faSignInAlt} />
                <span>Sign in</span>
              </li>
            )}
          </ul>
*/
