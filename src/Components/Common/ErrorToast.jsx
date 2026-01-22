import React from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

const ErrorToast = ({ errMsg, onClose, isOpen }) => {
  return (
    <React.Fragment>
      <Toast
        style={{ position: "fixed", top: "50px", right: "30px", zIndex: "10" }}
        className="text-danger"
        isOpen={isOpen}
        fade={false}
      >
        <ToastHeader toggle={onClose}>
          <span className="fs-20 text-danger">Error</span>
        </ToastHeader>
        <ToastBody>{errMsg}</ToastBody>
      </Toast>
    </React.Fragment>
  );
};

export default ErrorToast;
