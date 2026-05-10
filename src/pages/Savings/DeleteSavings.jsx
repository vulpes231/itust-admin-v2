import { useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { Card, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { deleteAccount } from "../../services/users";
import ErrorToast from "../../Components/Common/ErrorToast";
import SuccessToast from "../../Components/Common/SuccessToast";

const DeleteSavings = ({ onClose, isOpen, data, dataId }) => {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: deleteAccount,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 3000);
    },
  });

  const handleDelete = (e) => {
    e.preventDefault();
    if (!dataId) {
      setError("Account ID required!");
      return;
    }
    const accountId = dataId;
    mutation.mutate(accountId);
  };

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
      <Card>
        <Modal toggle={onClose} isOpen={isOpen}>
          <ModalHeader toggle={onClose}>Delete Account</ModalHeader>
          <ModalBody className="d-flex flex-column gap-4">
            <div>
              <span className="text-capitalize">
                Are you sure you want to delete <b> {data?.name}</b> account?
              </span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-info"
                type="button"
                onClick={handleDelete}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <Spinner size="sm" className="me-2">
                    Loading...
                  </Spinner>
                ) : null}
                Delete
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
          msg={"Account deleted successfully."}
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
        />
      )}
    </React.Fragment>
  );
};

export default DeleteSavings;
