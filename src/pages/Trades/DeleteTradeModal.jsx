import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { deleteTrade } from "../../services/trades";

const DeleteTradeModal = ({ isOpen, onClose, tradeId }) => {
  const [error, setError] = useState("");

  const deleteTradeOrder = useMutation({
    mutationFn: () => deleteTrade(tradeId),
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        onClose();
        window.location.reload();
        deleteTradeOrder.reset();
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
      <Modal isOpen={isOpen} toggle={onClose}>
        <ModalHeader>Delete Trade {tradeId}</ModalHeader>
        <ModalBody>
          <div className="d-flex align-items-center gap-2">
            <button
              onClick={() => {
                deleteTradeOrder.mutate();
              }}
              type="button"
              className="btn btn-secondary d-flex align-items-center gap-2 justify-content-center"
              disabled={deleteTradeOrder.isPending}
            >
              {deleteTradeOrder.isPending && <Spinner size={"sm"} />} Delete
            </button>
            <button onClick={onClose} type="button" className="btn btn-danger">
              Cancel
            </button>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteTradeModal;
