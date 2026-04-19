import { useMutation } from "@tanstack/react-query";
import { capitalize } from "lodash";
import React, { useEffect, useState } from "react";
import { Card, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { updateTransaction } from "../../services/transactions";
import { ErrorToast, SuccessToast } from "../../Components";
import { liveServer } from "../../config";

const TransactionModal = ({ dataId, action, isOpen, onClose, data }) => {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: updateTransaction,
    onError: (err) => setError(err.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dataId || !action) {
      setError("ID and Action required!");
      return;
    }
    const formData = {
      transactionId: dataId,
      action: action,
    };
    mutation.mutate(formData);
  };

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

  // console.log(data);
  return (
    <React.Fragment>
      <Card>
        <Modal toggle={onClose} isOpen={isOpen}>
          <ModalHeader toggle={onClose}>
            {capitalize(action)} Transaction
          </ModalHeader>
          <ModalBody className="d-flex flex-column gap-4">
            {action === "view" && (
              <div className="d-flex flex-column gap-2">
                <span className="text-capitalize fw-bold">
                  method:{" "}
                  <span className="text-muted fw-normal">
                    {data?.method?.mode}
                  </span>
                </span>
                <span className="text-capitalize fw-bold">
                  amount:{" "}
                  <span className="text-muted fw-normal">${data?.amount}</span>
                </span>
                <span className="text-capitalize fw-bold">
                  status:{" "}
                  <span className="text-muted fw-normal">{data?.status}</span>
                </span>
                <span className="d-flex flex-column gap-2 fw-bold text-capitalize">
                  proof:{" "}
                  <span>
                    <img
                      className="border p-2 rounded-2"
                      style={{ width: "100px" }}
                      src={`${liveServer}${data?.proof}`}
                      alt=""
                    />
                  </span>{" "}
                </span>
              </div>
            )}
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-info"
                type="button"
                onClick={handleSubmit}
                disabled={mutation.isPending || data?.status === "processed"}
              >
                {mutation.isPending ? (
                  <Spinner size="sm" className="me-2">
                    Loading...
                  </Spinner>
                ) : null}
                {action === "view" ? "Approve" : capitalize(action)}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </div>
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
          msg={"Transaction updated successfully."}
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
        />
      )}
    </React.Fragment>
  );
};

export default TransactionModal;
