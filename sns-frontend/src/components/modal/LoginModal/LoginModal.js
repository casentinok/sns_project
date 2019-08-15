import React from "react";
import ModalWrapper from "components/modal/ModalWrapper";
import Logo from "log_black.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
const LoginModal = ({
  onLogin,
  onCancel,
  onChange,
  onKeyPress,
  visible,
  userid,
  password,
  error
}) => (
  <ModalWrapper visible={visible}>
    <div>
      <div className="btn-close" onClick={onCancel}>
        <FontAwesomeIcon icon={faWindowClose} />
      </div>
      <div>
        <div className="modal-logo">
          <img src={Logo} alt="social n space" />
        </div>
      </div>
      <div>
        <div className="input-style">
          <div>
            <FontAwesomeIcon icon={faUser} />
          </div>
          <input
            type="text"
            placeholder="You're ID"
            value={userid}
            onChange={onChange}
            onKeyPress={onKeyPress}
            name="userid"
          />
        </div>
        <div className="input-style">
          <div>
            <FontAwesomeIcon icon={faLock} />
          </div>
          <input
            type="password"
            placeholder="You're PASSWORD"
            value={password}
            onChange={onChange}
            onKeyPress={onKeyPress}
            name="password"
          />
        </div>
      </div>
      {error && "error"}
      <div className="btn-login" onClick={onLogin}>LOGIN</div>
    </div>
  </ModalWrapper>
);

export default LoginModal;
