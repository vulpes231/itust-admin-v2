import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState } from "react";
import {
  Alert,
  Button,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { addNewAsset } from "../../services/asset";
import * as Yup from "yup";

const CreateAsset = ({ isOpen, onClose }) => {
  const [error, setError] = useState("");

  const createAsset = useMutation({
    mutationFn: addNewAsset,
    onError: (err) => setError(err.message),

    onSuccess: () => {
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 2000);
    },
  });

  const validation = useFormik({
    initialValues: {
      ticker: "",
    },

    validationSchema: Yup.object({
      ticker: Yup.string().required("Asset name is required"),
    }),

    onSubmit: (values) => {
      createAsset.mutate(values);
    },
  });

  return (
    <Modal toggle={onClose} centered isOpen={isOpen}>
      <ModalHeader toggle={onClose}>Create Asset</ModalHeader>

      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}

        {createAsset.isSuccess && (
          <Alert color="success">Asset created successfully.</Alert>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
          }}
        >
          <div className="mb-3">
            <Label>Asset Ticker</Label>

            <Input
              type="text"
              name="ticker"
              value={validation.values.ticker}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              invalid={validation.touched.ticker && !!validation.errors.ticker}
            />

            <FormFeedback>{validation.errors.ticker}</FormFeedback>
          </div>

          <Button
            color="primary"
            className="w-100"
            disabled={createAsset.isPending}
          >
            {createAsset.isPending ? "Creating..." : "Create Asset"}
          </Button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default CreateAsset;
