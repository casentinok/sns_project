import React from "react";
import ModalWrapper from "components/modal/ModalWrapper";
import DaumPostcode from "react-daum-postcode";

const PostcodeModal =({handleAddress, visible})=>(
  <ModalWrapper visible={visible}>
    <DaumPostcode onComplete={handleAddress}/>
  </ModalWrapper>
)
export default PostcodeModal;
