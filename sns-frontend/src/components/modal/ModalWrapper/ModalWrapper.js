import React, { Component } from "react";
import styles from "./ModalWrapper.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class ModalWrapper extends Component {
  _isMounted = false;
  state = {
    animate: false
  };
  startAnimation() {
    this.setState({
      animate: true
    });

    setTimeout(() => {
      this.setState({
        animate: false
      });
    }, 200);
  }
  componentDiMount() {
    this._isMounted = true;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.visible !== this.props.visible) {
      if (this._isMounted) {
        this.startAnimation();
      }
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { children, visible } = this.props;
    const { animate } = this.state;
    if (!visible && !animate) return null;
    const animation = animate && (visible ? "enter" : "leave");
    return (
      <div>
        <div className={cx("gray-background", animation)} />
        <div className={cx("modal-wrapper")}>
          <div className={cx("modal", animation)}>{children}</div>
        </div>
      </div>
    );
  }
}

export default ModalWrapper;
