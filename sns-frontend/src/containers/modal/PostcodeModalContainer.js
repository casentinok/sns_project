import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "store/modules/user";
import * as modalActions from "store/modules/modal";
import PostcodeModal from "components/modal/PostModal/PostcodeModal";

class PostcodeModalContainer extends Component{
    handleAddress = data => {
        let fullAddress = data.address;
        let extraAddress = "";
        if (data.addressType === "R") {
          if (data.bname !== "") {
            extraAddress += data.bname;
          }
          if (data.buildingName !== "") {
            extraAddress +=
              extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
          }
          fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
        console.log(extraAddress);
        if(fullAddress) {
            const { ModalActions, UserActions } = this.props;
            UserActions.setPostcode(fullAddress);
            ModalActions.hideModal("postcode");
        }
        console.log(fullAddress);
      };
    render(){
        const { handleAddress } = this;
        const { visible } = this.props;
        return(
            <PostcodeModal handleAddress={handleAddress} visible={visible}/>
        );
    }
}

export default connect(
    state=>({
        visible : state.modal.get('postcode')
    }),
    dispatch=>({
        UserActions : bindActionCreators(userActions, dispatch),
        ModalActions : bindActionCreators(modalActions , dispatch)
    })
)(PostcodeModalContainer)