import React, { useEffect, useState } from "react";
import { Card, Modal, ModalBody, ModalHeader } from "reactstrap";
import TradeModal from "./TradeForm";

const CreateTrade = ({ isOpen, onClose, action }) => {
  return (
    <React.Fragment>
      <Card>
        <Modal toggle={onClose} isOpen={isOpen}>
          <ModalHeader toggle={onClose}>Create trade</ModalHeader>
          <ModalBody className="d-flex flex-column gap-4">
            <TradeModal onClose={onClose} action={action} />
          </ModalBody>
        </Modal>
      </Card>
    </React.Fragment>
  );
};

export default CreateTrade;
