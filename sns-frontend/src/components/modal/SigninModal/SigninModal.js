import React from "react";
import ModalWrapper from "components/modal/ModalWrapper";
import Logo from "log_black.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowClose,
  faUser,
  faLock,
  faSignature,
  faEnvelope,
  faPhone
} from "@fortawesome/free-solid-svg-icons";
import ImageInput from "components/common/ImageInput";
import Input from 'components/common/Input';
const SigninModal = ({
  onCancel,
  onChange,
  onPostcodeModal,
  onSigninClick,
  handleCheckOverlap,
  visible,
  userid,
  name,
  password,
  passwordConfirm,
  email,
  phone,
  error,
  message,
  target
}) => {
  const keys = Object.keys(error);  
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
      <form onSubmit={onSigninClick}>
      <ImageInput />
      <div>
      <Input type='text' name='userid' value={userid} target={target} maxLength='20' placeholder='ID' onChange={onChange} onBlur={handleCheckOverlap} error={error[keys[0]]} message={message[keys[0]]} icon={faUser}/>
      <Input name='name' value={name} target={target}  placeholder="NAME" onChange={onChange} icon={faSignature}/>
      <Input type="password" name='password' value={password} target={target}  placeholder="PASSWORD" onChange={onChange} onBlur={handleCheckOverlap}  error={error[keys[1]]} message={message[keys[1]]} icon={faLock}/>
      <Input type="password" name='password_confirm' value={passwordConfirm} target={target}  placeholder="PASSWORD CONFIRM" onChange={onChange} onBlur={handleCheckOverlap}  error={error[keys[2]]} message={message[keys[2]]} icon={faLock}/>
      <Input name='phone' value={phone} target={target}   placeholder="010-0000-0000" onChange={onChange} onBlur={handleCheckOverlap} error={error[keys[3]]} message={message[keys[3]]} icon={faPhone}/>

      <Input name='email' value={email} target={target}  placeholder="E-MAIL ADDRESS" onChange={onChange} onBlur={handleCheckOverlap}  error={error[keys[4]]} message={message[keys[4]]} icon={faEnvelope}/>      
      </div>
      <Input type="submit" value="SIGN IN" theme="btn-input"/>
      </form>
    </div>
  </ModalWrapper>);
};

export default SigninModal;
/*
      <Input name='address' value={address} target={target}   placeholder="ADDRESS" onChange={onChange} icon={faMapMarkedAlt} readOnly={true}/>
      <div className="btn-login" onClick={onPostcodeModal}>
        주소검색
      </div>
<div className="btn-login" onClick={onSigninClick}>SIGN IN</div>
 */