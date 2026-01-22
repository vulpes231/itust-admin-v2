import React from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

const SuccessToast = ({ msg, onClose, isOpen }) => {
  return (
    <React.Fragment>
      <Toast
        style={{ position: "fixed", top: "50px", right: "30px" }}
        className="text-success"
        isOpen={isOpen}
        fade={false}
      >
        <ToastHeader toggle={onClose}>
          <span className="fs-20 text-success">Success</span>
        </ToastHeader>
        <ToastBody>{msg}</ToastBody>
      </Toast>
    </React.Fragment>
  );
};

export default SuccessToast;
