import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Input, Label, Spinner } from "reactstrap";
import { updateTransactionInfo } from "../../services/transactions";

const EditTransaction = ({ transaction, handleClose, setError }) => {
  const editTransaction = useMutation({
    mutationFn: updateTransactionInfo,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        handleClose();
        window.location.reload();
      }, 3000);
    },
  });

  const getCurrentDateTime = () => {
    const now = new Date();
    now.setSeconds(0, 0);

    return now.toISOString().slice(0, 16);
  };

  const formatDateTime = (date) => {
    if (!date) return getCurrentDateTime();
    return new Date(date).toISOString().slice(0, 16);
  };
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      type: transaction?.type || "",
      method: transaction?.method?.mode || "",
      customDate: formatDateTime(transaction?.createdAt) || "",
      amount: transaction?.amount || "",
      status: transaction?.status || "",
      transactionId: transaction?._id || "",
    },
    onSubmit: (values) => {
      const changes = {
        transactionId: values.transactionId,
      };

      Object.entries(values).forEach(([key, value]) => {
        if (key === "transactionId") return;

        if (value !== validation.initialValues[key]) {
          changes[key] =
            key === "amount"
              ? Number(value)
              : key === "customDate"
                ? new Date(value)
                : value;
        }
      });

      if (Object.keys(changes).length === 1) {
        setError("No changes were made.");
        return;
      }

      editTransaction.mutate(changes);
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
            type="datetime-local"
            name="customDate"
            value={validation.values.customDate}
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
