import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "store/modules/user";
import styles from "./ImageInput.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Img from "sampleimg.jpg";
const cx = classNames.bind(styles);

class ImageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      imgSrc: "",
      bigwidth: {
        width: "initial",
        height: "100%"
      },
      bigheight: {
        width: "100%",
        height: "auto"
      },
      resize: false,
      imgObj : null
    };
  }
  handleChange = e => {
    const { UserActions } = this.props;

    const reader = new FileReader();
    this.setState({
        imgObj : e.target.files[0]
    })
    
    let file = e.target.files[0];    
    
    
    this.makeThumbnailUrl(file, reader)
      .then(url => {
        this.setState({
          imgSrc: url
        });
      })
      .then(() => {
        let imgHeight = this.profileImg.height;
        let imgWidth = this.profileImg.width;
        if (imgHeight < imgWidth) {
          this.setState({
            resize: true
          });
        } else if (imgHeight > imgWidth) {
          this.setState({
            resize: false
          });
        } else if (imgHeight === imgWidth) {
          return;
        }
      })
      .catch(e => console.log(e));
      
    UserActions.setFile(file);
  };

  makeThumbnailUrl = (file, reader) => {
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  render() {
    const { handleChange } = this;
    const { imgSrc, resize, bigwidth, bigHeight } = this.state;
    const{ file } = this.props;
    console.log(file);
    let src = imgSrc || Img;
    return (
      <div className={cx("profile-wrap")}>
        <div className={cx("image-wrap")}>
          <img
            src={src}
            style={resize ? bigwidth : bigHeight}
            alt="sampleImage"
            ref={el => {
              this.profileImg = el;
            }}
          />
        </div>
        <label className={cx("btn-upload")}>
          <FontAwesomeIcon icon={faPlusCircle} />
          <input type="file" name="profile" onChange={handleChange} />
        </label>
      </div>
    );
  }
}

export default connect(
  state => ({
    file: state.user.getIn(["signininfo", "file"])
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(ImageInput);
