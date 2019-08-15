import React from "react";
import styles from "./AskModal.scss";
import classNames from "classnames/bind";
import ModalWrapper from "components/modal/ModalWrapper";

const cx = classNames.bind(styles);

const AskModal = ({ visible, message, handleOk, handleCancel }) => (
  <ModalWrapper visible={visible}>
    <div>
      <div className={cx("message")}>{message}</div>
      <div className={cx('btn-wrap','clear-fix')}>
        <div onClick={handleOk}>OK</div>
        <div onClick={handleCancel}>CANCEL</div>
      </div>
    </div>
  </ModalWrapper>
);

export default AskModal;
