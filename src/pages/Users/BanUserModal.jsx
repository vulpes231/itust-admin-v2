import { useMutation } from "@tanstack/react-query";
import { capitalize } from "lodash";
import React, { useEffect, useState } from "react";
import { Card, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { ErrorToast, SuccessToast } from "../../Components";
import { banUser } from "../../services/userSettings";

const BanUserModal = ({ dataId, isOpen, onClose, data }) => {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: banUser,
    onError: (err) => setError(err.message),
  });

  const handleBan = (e) => {
    e.preventDefault();
    if (!dataId) {
      setError("User ID required!");
      return;
    }
    const userId = dataId;
    mutation.mutate(userId);
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
        window.location.reload();
      }, 1000);
      return () => clearTimeout(tmt);
    }
  }, [mutation.isSuccess]);
  return (
    <React.Fragment>
      <Card>
        <Modal toggle={onClose} isOpen={isOpen}>
          <ModalHeader toggle={onClose}>Ban User</ModalHeader>
          <ModalBody className="d-flex flex-column gap-4">
            <div>
              <span>
                Are you sure you want to suspend user{" "}
                {capitalize(data?.credentials?.username)}?
              </span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-info"
                type="button"
                onClick={handleBan}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <Spinner size="sm" className="me-2">
                    Loading...
                  </Spinner>
                ) : null}
                Ban
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
          msg={"Ban status updated successfully."}
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
        />
      )}
    </React.Fragment>
  );
};

export default BanUserModal;
