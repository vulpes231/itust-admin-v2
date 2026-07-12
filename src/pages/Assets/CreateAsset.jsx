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
  // const [preview, setPreview] = useState(null);

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
      name: "",
      symbol: "",
      price: "",
      imageUrl: "",
      type: "",
      exchange: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Asset name is required"),
      symbol: Yup.string().required("Asset symbol is required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .positive("Price must be greater than zero")
        .required("Price is required"),
      type: Yup.string().required("Asset type is required"),
      exchange: Yup.string().required("Exchange is required"),
      imageUrl: Yup.mixed().required("Asset image is required"),
    }),

    onSubmit: (values) => {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      createAsset.mutate(formData);
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
            <Label>Asset Name</Label>

            <Input
              type="text"
              name="name"
              value={validation.values.name}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              invalid={validation.touched.name && !!validation.errors.name}
            />

            <FormFeedback>{validation.errors.name}</FormFeedback>
          </div>

          <div className="mb-3">
            <Label>Symbol</Label>

            <Input
              type="text"
              name="symbol"
              value={validation.values.symbol}
              onChange={(e) =>
                validation.setFieldValue("symbol", e.target.value.toUpperCase())
              }
              onBlur={validation.handleBlur}
              invalid={validation.touched.symbol && !!validation.errors.symbol}
            />

            <FormFeedback>{validation.errors.symbol}</FormFeedback>
          </div>

          <div className="mb-3">
            <Label>Current Price</Label>

            <Input
              type="number"
              name="price"
              step="0.0001"
              value={validation.values.price}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              invalid={validation.touched.price && !!validation.errors.price}
            />

            <FormFeedback>{validation.errors.price}</FormFeedback>
          </div>

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
              <option value="">Select Type</option>
              <option value="stock">Stock</option>
              <option value="crypto">Crypto</option>
              <option value="etf">ETF</option>
              <option value="forex">Forex</option>
              <option value="commodity">Commodity</option>
            </Input>

            <FormFeedback>{validation.errors.type}</FormFeedback>
          </div>

          <div className="mb-3">
            <Label>Exchange</Label>

            <Input
              type="text"
              name="exchange"
              value={validation.values.exchange}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              invalid={
                validation.touched.exchange && !!validation.errors.exchange
              }
            />

            <FormFeedback>{validation.errors.exchange}</FormFeedback>
          </div>

          <div className="mb-3">
            <Label>Asset Image</Label>
            <Input
              type="text"
              name="imageUrl"
              value={validation.values.imageUrl}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              invalid={
                validation.touched.imageUrl && !!validation.errors.imageUrl
              }
            />

            {/* <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];

                if (!file) return;

                validation.setFieldValue("imageUrl", file);
                setPreview(URL.createObjectURL(file));
              }}
              invalid={
                validation.touched.imageUrl && !!validation.errors.imageUrl
              }
            /> */}

            <FormFeedback>{validation.errors.imageUrl}</FormFeedback>
          </div>

          {/* {preview && (
            <div className="mb-3 text-center">
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "contain",
                  border: "1px solid #ddd",
                  borderRadius: 8,
                }}
              />
            </div>
          )} */}

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
