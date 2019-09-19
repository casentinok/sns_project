import React from "react";
import ModalWrapper from "components/modal/ModalWrapper";
import Logo from "log_black.svg";
import Input from 'components/common/Input';
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
  error,
  message}) => {
  return(
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
      <Input type="text" name="userid" value={userid} placeholder="You're ID" onChange={onChange} onKeyPress={onKeyPress} icon={faUser}/>
      <Input type="password" name="password" value={password} error={error} message={message}placeholder="You're PASSWORD" onChange={onChange} onKeyPress={onKeyPress} icon={faLock}/>
      </div>
  {/*error && message*/}
      <div className="btn-login" onClick={onLogin}>LOGIN</div>
    </div>
    </ModalWrapper>
  );
};

export default LoginModal;