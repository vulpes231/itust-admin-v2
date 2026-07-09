import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Input, Label, Spinner } from "reactstrap";
import { updateTransaction } from "../../services/transactions";

const EditTransaction = ({ transaction, handleClose, setError }) => {
  const editTransaction = useMutation({
    mutationFn: updateTransaction,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        handleClose();
        window.location.reload();
      }, 3000);
    },
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      type: transaction?.type || "",
      method: transaction?.method?.mode || "",
      customDate: transaction?.createdAt || "",
      amount: transaction?.amount || "",
      status: transaction?.status || "",
      transactionId: transaction?._id || "",
    },
    onSubmit: (values) => {
      console.log(values);
      //   editTransaction.mutate(values);
    },
  });

  //   console.log(transaction);
  return (
    <div>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
        }}
      >
        <div className="mb-3">
          <Label>Type</Label>
          <Input
            type="text"
            readOnly
            value={validation.values.type}
            className="bg-light text-capitalize"
          />
        </div>
        <div className="mb-3">
          <Label>Method</Label>
          <Input
            type="text"
            readOnly
            value={validation.values.method}
            className="bg-light text-capitalize"
          />
        </div>
        <div className="mb-3">
          <Label>Amount</Label>
          <Input
            type="text"
            value={validation.values.amount}
            className="text-capitalize"
            onChange={validation.handleChange}
            name="amount"
          />
        </div>
        <div className="mb-3">
          <Label>Date</Label>
          <Input
            type="date"
            name="customDate"
            value={validation.values.customDate}
            className="text-capitalize"
            onChange={validation.handleChange}
          />
        </div>
        <div className="mb-3">
          <Label>Status</Label>
          <Input
            type="text"
            readOnly
            value={validation.values.status}
            className="bg-light text-capitalize"
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-secondary d-flex align-items-center justify-content-center gap-2 "
          >
            {editTransaction.isPending && <Spinner size={"sm"} />} Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTransaction;
