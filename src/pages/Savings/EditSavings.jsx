import { useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { Card, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { deleteAccount } from "../../services/users";
import ErrorToast from "../../Components/Common/ErrorToast";
import SuccessToast from "../../Components/Common/SuccessToast";
import EditForm from "./EditForm";

const EditSavings = ({ onClose, isOpen, data, dataId }) => {
  return (
    <React.Fragment>
      <Card>
        <Modal toggle={onClose} isOpen={isOpen}>
          <ModalHeader toggle={onClose}>Edit Account</ModalHeader>
          <ModalBody className="d-flex flex-column gap-4">
            <div className="d-flex flex-column gap-2">
              <EditForm onClose={onClose} data={data} />
            </div>
          </ModalBody>
        </Modal>
      </Card>
    </React.Fragment>
  );
};

export default EditSavings;
