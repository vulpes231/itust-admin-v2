import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { updateTransactionStatus } from "../../services/transactions";
import { ErrorToast, SuccessToast } from "../../Components";

const UpdateStatus = ({ trx, isOpen, toggle }) => {
  const [status, setStatus] = useState(() => {
    return trx ? trx.status : "";
  });

  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: updateTransactionStatus,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    },
  });

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 30000);

      return () => clearTimeout(tmt);
    }
  }, [error]);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Status</ModalHeader>
      <ModalBody>
        <div>
          <Label>Current Status: {trx?.status}</Label>
          <Input
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            type="select"
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="in process">In Process</option>
            {/* <option value="cancelled">Cancelled</option>
            <option value="rejec">Pending</option> */}
          </Input>
        </div>

        <div className="mt-3">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (!trx) {
                return;
              }
              const data = { status, transactionId: trx?._id };
              console.log(data);
              mutation.mutate(data);
            }}
            className="btn btn-secondary"
          >
            {mutation.isPending && <Spinner size={"sm"} />}Save
          </button>
        </div>
      </ModalBody>
      {mutation.isSuccess && (
        <SuccessToast
          msg={"Status Updated"}
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
        />
      )}
      {error && (
        <ErrorToast
          errMsg={error}
          isOpen={!!error}
          onClose={() => setError("")}
        />
      )}
    </Modal>
  );
};

export default UpdateStatus;
