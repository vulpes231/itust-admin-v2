import { useMutation } from "@tanstack/react-query";
import { capitalize } from "lodash";
import React, { useEffect, useState } from "react";
import {
  Card,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { ErrorToast, SuccessToast } from "../../Components";
import { closeTrade } from "../../services/trades";

const CloseTradeModal = ({ dataId, action, isOpen, onClose, rowData }) => {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: closeTrade,
    onError: (err) => setError(err.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rowData.status === "closed") {
      setError("Trade already closed!");
      return;
    }
    if (!dataId || !action || action !== "close") {
      setError("Invalid data!");
      return;
    }
    const formData = {
      tradeId: dataId,
    };
    // console.log(formData);
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
  return (
    <React.Fragment>
      <Card>
        <Modal toggle={onClose} isOpen={isOpen}>
          <ModalHeader toggle={onClose}>{capitalize(action)} Trade</ModalHeader>
          <ModalBody className="d-flex flex-column gap-4">
            <span className="d-flex flex-column gap-2">
              <span className="d-flex  gap-2">
                <Label>Asset: </Label>
                <span>{rowData?.asset?.name}</span>
              </span>
              <span className="d-flex  gap-2">
                <Label>Value: </Label>
                <span>${rowData?.performance?.currentValue.toFixed(2)}</span>
              </span>
              <span className="d-flex  gap-2">
                <Label>Profit: </Label>
                <span>${rowData?.performance?.totalReturn.toFixed(2)}</span>
              </span>
              <span className="d-flex  gap-2">
                <Label>ROI (%): </Label>
                <span>
                  ${rowData?.performance?.totalReturnPercent.toFixed(2)}
                </span>
              </span>
            </span>
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-info"
                type="button"
                onClick={handleSubmit}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <Spinner size="sm" className="me-2">
                    Loading...
                  </Spinner>
                ) : null}
                {capitalize(action)} Trade
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

export default CloseTradeModal;
