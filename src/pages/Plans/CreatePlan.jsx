import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Card, Modal, ModalBody, ModalHeader } from "reactstrap";
import PlanForm from "./PlanForm";

const CreatePlan = ({ isOpen, onClose }) => {
  return (
    <React.Fragment>
      <Card>
        <Modal toggle={onClose} isOpen={isOpen}>
          <ModalHeader toggle={onClose}>Create Investing Plan</ModalHeader>
          <ModalBody className="d-flex flex-column gap-4">
            <PlanForm onClose={onClose} />
          </ModalBody>
        </Modal>
      </Card>
    </React.Fragment>
  );
};

export default CreatePlan;
