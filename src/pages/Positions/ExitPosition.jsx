import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { exitFullPosition } from "../../services/positions";
import { SuccessToast } from "../../Components";

const ExitPosition = ({ handleToggle, positionId, isOpen }) => {
  const [error, setError] = useState("");
  const mutation = useMutation({
    mutationFn: exitFullPosition,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        handleToggle();
        window.location.reload();
      }, 3000);
    },
  });

  const handleSubmit = () => {
    if (!positionId) {
      setError("Invalid action!");
      return;
    }

    mutation.mutate(positionId);
  };

  return (
    <Modal toggle={handleToggle} isOpen={isOpen}>
      <ModalHeader toggle={handleToggle}>Exit Position</ModalHeader>
      <ModalBody>
        <div>Close {positionId}</div>
        <div className="d-flex gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-secondary d-flex gap-2 align-items-center"
          >
            {mutation.isPending && <Spinner size={"sm"} />} Close
          </button>
          <button
            type="button"
            onClick={handleToggle}
            className="btn btn-danger"
          >
            Cancel
          </button>
        </div>
      </ModalBody>
      {mutation.isSuccess && (
        <SuccessToast
          msg={"Full Position Closed"}
          onClose={() => mutation.reset()}
          isOpen={mutation.isSuccess}
        />
      )}
    </Modal>
  );
};

export default ExitPosition;
