import React from "react";
import SellForm from "./SellForm";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const ClosePositionForm = ({ isOpen, handleClose, rowData }) => {
  return (
    <Modal toggle={handleClose} isOpen={isOpen}>
      <ModalHeader toggle={handleClose}>
        <h3>Close Position</h3>
      </ModalHeader>
      <ModalBody>
        <SellForm rowData={rowData} />
      </ModalBody>
    </Modal>
  );
};

export default ClosePositionForm;
