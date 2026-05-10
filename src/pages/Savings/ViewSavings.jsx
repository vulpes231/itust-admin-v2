import { useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import {
  Card,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { deleteAccount } from "../../services/users";
import ErrorToast from "../../Components/Common/ErrorToast";
import SuccessToast from "../../Components/Common/SuccessToast";

const ViewSavings = ({ onClose, isOpen, data, dataId }) => {
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

  //   console.log(data);
  return (
    <React.Fragment>
      <Card>
        <Modal toggle={onClose} isOpen={isOpen}>
          <ModalHeader toggle={onClose}>View Account</ModalHeader>
          <ModalBody className="d-flex flex-column gap-4">
            <div className="d-flex flex-column gap-2">
              <Label>
                Name:{" "}
                <span className="fw-normal text-muted text-capitalize">
                  {data?.name}
                </span>
              </Label>
              <Label>
                Title:{" "}
                <span className="fw-normal text-muted text-capitalize">
                  {data?.title}
                </span>
              </Label>
              <Label>
                Slug:{" "}
                <span className="fw-normal text-muted text-capitalize">
                  {data?.slug}
                </span>
              </Label>
              <Label>
                Tag:{" "}
                <span className="fw-normal text-muted text-capitalize">
                  {data?.tag}
                </span>
              </Label>
              <Label>
                Joint Maximum Selection:{" "}
                <span className="fw-normal text-muted text-capitalize">
                  {data?.tag}
                </span>
              </Label>
              <Label>
                <span className="d-flex align-items-center gap-2">
                  <span> Contribution Limits:</span>
                  <span className="fw-normal text-muted text-capitalize">
                    Min {data?.contributionLimits?.min}
                  </span>
                  <span className="fw-normal text-muted text-capitalize">
                    Max {data?.contributionLimits?.max}
                  </span>
                </span>
              </Label>
              <Label>
                <span className="d-flex align-items-center gap-2">
                  <span> Withdrawal Limits:</span>
                  <span className="fw-normal text-muted text-capitalize">
                    Min {data?.withdrawalLimits?.min}
                  </span>
                  <span className="fw-normal text-muted text-capitalize">
                    Max {data?.withdrawalLimits?.max}
                  </span>
                </span>
              </Label>
              <Label>
                <span className="d-flex align-items-center gap-2">
                  <span> Maximum Savings:</span>
                  <span className="fw-normal text-muted text-capitalize">
                    Yearly {data?.maxSavings?.yearly || 0}
                  </span>
                  <span className="fw-normal text-muted text-capitalize">
                    Total {data?.maxSavings?.total || 0}
                  </span>
                </span>
              </Label>
            </div>
            <div className="d-flex align-items-center gap-2">
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

export default ViewSavings;
