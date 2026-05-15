import React from "react";
import { Col, Modal, ModalBody, ModalHeader } from "reactstrap";

const EditPosition = ({ rowData, handleClose, isOpen }) => {
  return (
    <Modal toggle={handleClose} isOpen={isOpen}>
      <ModalHeader toggle={handleClose}>Edit Position</ModalHeader>
      <ModalBody>
        <Col>
          <span>{rowData?.userId}</span>
        </Col>
      </ModalBody>
    </Modal>
  );
};

export default EditPosition;
