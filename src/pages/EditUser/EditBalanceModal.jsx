import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import {
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import { updateWalletBalance } from "../../services/wallet";
import ErrorToast from "../../Components/Common/ErrorToast";
import SuccessToast from "../../Components/Common/SuccessToast";

const EditBalanceModal = ({ isOpen, handleToggle, walletData }) => {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: updateWalletBalance,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        handleToggle();
        window.location.reload();
      }, 2000);
    },
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: "",
      action: "",
      walletId: "",
    },
    onSubmit: (values) => {
      if (!walletData) {
        setError("Wallet data not set!");
      }
      values.walletId = walletData._id;

      console.log(values);
      mutation.mutate(values);
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
    <Modal centered isOpen={isOpen} toggle={handleToggle}>
      <ModalHeader toggle={handleToggle}>
        <span className="text-capitalize">
          {" "}
          Edit {walletData?.name} Balance
        </span>
      </ModalHeader>
      <ModalBody>
        <div className="d-flex flex-column mb-4 fs-16">
          <span>
            Total:{" "}
            <b> {numeral(walletData?.balance?.total).format("$0,0.00")}</b>
          </span>
          <span className="text-muted">
            Available:{" "}
            <b> {numeral(walletData?.balance?.available).format("$0,0.00")}</b>
          </span>
        </div>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
          }}
          className="p-4"
        >
          <Row>
            <Label>Type</Label>
            <Input
              type="select"
              name="action"
              value={validation.values.action}
              onChange={validation.handleChange}
            >
              <option value="">Select Action</option>
              <option value="add">Add</option>
              <option value="subtract">Subtract</option>
            </Input>
          </Row>
          <Row className="mt-3">
            <Label>Amount</Label>
            <Input
              type="text"
              name="amount"
              value={validation.values.amount}
              onChange={validation.handleChange}
              autoComplete="off"
            />
          </Row>
          <Row className="mt-3">
            <button
              type="submit"
              className="btn btn-secondary d-flex align-items-center gap-2 justify-content-center"
            >
              {mutation.isPending && <Spinner size={"sm"} />}{" "}
              <span>Submit</span>
            </button>
          </Row>
        </form>
      </ModalBody>
      {error && (
        <ErrorToast
          isOpen={!!error}
          errMsg={error}
          onClose={() => setError("")}
        />
      )}
      {mutation.isSuccess && (
        <SuccessToast
          isOpen={mutation.isSuccess}
          msg={`${walletData?.slug} balance updated.`}
          onClose={() => mutation.reset()}
        />
      )}
    </Modal>
  );
};

export default EditBalanceModal;
