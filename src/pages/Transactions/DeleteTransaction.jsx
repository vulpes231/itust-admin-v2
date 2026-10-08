import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { removeTransaction } from "../../services/transactions";
import numeral from "numeral";
import { SuccessToast } from "../../Components";

const DeleteTransaction = ({ transactionId, handleToggle, isOpen, trnx }) => {
  const [error, setError] = useState("");

  const deleteMutation = useMutation({
    mutationFn: removeTransaction,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        deleteMutation.reset();
      }, 2000);
    },
  });

  return (
    <Modal isOpen={isOpen} toggle={handleToggle} centered>
      <ModalHeader toggle={handleToggle}>Delete Transaction</ModalHeader>
      <ModalBody>
        <p>
          Are you sure you want to delete{" "}
          <b className="text-capitalize">{trnx?.fullname}</b>{" "}
          <b className={"text-capitalize"}>{trnx?.type}</b> transaction of{" "}
          {numeral(trnx?.amount).format("$0,0.00")}
        </p>
        <div className="d-flex gap-2">
          <button
            type="button"
            onClick={() => {
              if (!transactionId) {
                setError("ID required!");
                return;
              }
              deleteMutation.mutate(transactionId);
            }}
            className="btn btn-secondary d-flex align-items-center justify-content-center gap-2"
          >
            {" "}
            {deleteMutation.isPending && <Spinner size={"sm"} />} Submit
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
      {deleteMutation.isSuccess && (
        <SuccessToast
          msg={"Transaction Deleted"}
          onClose={() => deleteMutation.reset()}
          isOpen={deleteMutation.isSuccess}
        />
      )}
    </Modal>
  );
};

export default DeleteTransaction;
