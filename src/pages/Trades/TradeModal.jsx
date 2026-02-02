import { useMutation } from "@tanstack/react-query";
import { capitalize } from "lodash";
import React, { useEffect, useState } from "react";
import { Card, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { ErrorToast, SuccessToast } from "../../Components";
import EditTradeForm from "./EditTradeForm";
import { updateTrade } from "../../services/trades";

const TradeModal = ({ dataId, action, isOpen, onClose, rowData }) => {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: updateTrade,
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
          <ModalHeader toggle={onClose}>Update Trade</ModalHeader>
          <ModalBody className="d-flex flex-column gap-4">
            <div>
              <img src={rowData?.asset?.img} alt="" width={30} />
              <span className="fs-22 text-semibold">
                {rowData?.asset?.name}
              </span>
            </div>
            <EditTradeForm tradeData={rowData} mutation={mutation} />
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
          msg={"Trade updated successfully."}
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
        />
      )}
    </React.Fragment>
  );
};

export default TradeModal;
