import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { addNewAsset } from "../../services/asset";
import * as Yup from "yup";
import ErrorToast from "../../Components/Common/ErrorToast";
import SuccessToast from "../../Components/Common/SuccessToast";

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
      type: "",
    },

    validationSchema: Yup.object({
      ticker: Yup.string().required("Asset name is required"),
    }),

    onSubmit: (values) => {
      console.log(values);
      createAsset.mutate(values);
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
            <Label>Asset Type</Label>

            <Input
              type="select"
              name="type"
              value={validation.values.type}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              invalid={validation.touched.type && !!validation.errors.type}
            >
              <option value="">Select Asset Type</option>
              <option value="stock">Stock</option>
              <option value="crypto">Crypto</option>
              <option value="etf">ETF</option>
            </Input>

            <FormFeedback>{validation.errors.type}</FormFeedback>
          </div>
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
            className="w-100 d-flex align-items-center justify-content-center gap-2"
            disabled={createAsset.isPending}
          >
            {createAsset.isPending && <Spinner size={"sm"} />} Create Asset
          </Button>
        </form>
      </ModalBody>
      {error && (
        <ErrorToast
          errMsg={error}
          onClose={() => setError("")}
          isOpen={error}
        />
      )}
      {createAsset.isSuccess && (
        <SuccessToast
          msg={"Asset Added."}
          onClose={() => createAsset.reset()}
          isOpen={createAsset.isSuccess}
        />
      )}
    </Modal>
  );
};

export default CreateAsset;
