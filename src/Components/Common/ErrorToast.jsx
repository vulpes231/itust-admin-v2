import React from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

const ErrorToast = ({ errMsg, onClose, isOpen }) => {
  return (
    <React.Fragment>
      <Toast className="text-danger" isOpen={isOpen} fade={false}>
        <ToastHeader toggle={onClose}>
          <span className="fs-20">Error</span>
        </ToastHeader>
        <ToastBody>{errMsg}</ToastBody>
      </Toast>
    </React.Fragment>
  );
};

export default ErrorToast;
