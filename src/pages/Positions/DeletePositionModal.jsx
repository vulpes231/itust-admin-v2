import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";

import { deletePosition } from "../../services/positions";

const DeletePositionModal = ({ isOpen, handleToggle, positionId }) => {
  const [error, setError] = useState("");

  const deletePositionOrder = useMutation({
    mutationFn: () => deletePosition(positionId),
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        handleToggle();
        window.location.reload();
        deletePositionOrder.reset();
      }, 3000);
    },
  });

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [error]);
  return (
    <React.Fragment>
      <Modal isOpen={isOpen} toggle={handleToggle}>
        <ModalHeader>Delete Position {positionId}</ModalHeader>
        <ModalBody>
          <div className="d-flex align-items-center gap-2">
            <button
              onClick={() => {
                deletePositionOrder.mutate();
              }}
              type="button"
              className="btn btn-secondary d-flex align-items-center gap-2 justify-content-center"
              disabled={deletePositionOrder.isPending}
            >
              {deletePositionOrder.isPending && <Spinner size={"sm"} />} Delete
            </button>
            <button
              onClick={handleToggle}
              type="button"
              className="btn btn-danger"
            >
              Cancel
            </button>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default DeletePositionModal;
