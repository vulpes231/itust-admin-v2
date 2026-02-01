import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Card, Modal, ModalBody, ModalHeader } from "reactstrap";
import { ErrorToast, SuccessToast } from "../../Components";
import SavingsForm from "./SavingsForm";
import { createSavingsAccount } from "../../services/savings";

const CreateSavings = ({ isOpen, onClose }) => {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: createSavingsAccount,
    onError: (err) => setError(err.message),
  });

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(tmt);
    }
  }, [error]);

  useEffect(() => {
    if (mutation.isSuccess) {
      const tmt = setTimeout(() => {
        mutation.reset();
        onClose();
        window.location.reload();
      }, 3000);

      return () => clearTimeout(tmt);
    }
  }, [mutation.isSuccess]);
  return (
    <React.Fragment>
      <Card>
        <Modal toggle={onClose} isOpen={isOpen}>
          <ModalHeader toggle={onClose}>Create Savings Account</ModalHeader>
          <ModalBody className="d-flex flex-column gap-4">
            <SavingsForm mutation={mutation} onClose={onClose} />
          </ModalBody>
        </Modal>
      </Card>
      {error && (
        <ErrorToast
          errMsg={error}
          isOpen={error !== undefined}
          onClose={() => setError("")}
        />
      )}
      {mutation.isSuccess && (
        <SuccessToast
          msg={"Savings account created successfully."}
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
        />
      )}
    </React.Fragment>
  );
};

export default CreateSavings;
