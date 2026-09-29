import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";

import { addNewTier } from "../../services/tier";
import SuccessToast from "../../Components/Common/SuccessToast";
import ErrorToast from "../../Components/Common/ErrorToast";

const NewTierModal = ({ isOpen, handleToggle }) => {
  const [error, setError] = useState("");

  const createTierMutation = useMutation({
    mutationFn: addNewTier,

    onError: (err) => {
      setError(err.message);
    },

    onSuccess: () => {
      setTimeout(() => {
        createTierMutation.reset();
        handleToggle();
        window.location.reload();
      }, 2000);
    },
  });

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      tag: "",
      title: "",
      threshold: "",
      minDeposit: "",
      features: "",
    },

    onSubmit: (values) => {
      const payload = {
        ...values,
        threshold: Number(values.threshold),
        minDeposit: Number(values.minDeposit),

        // Convert textarea into an array
        features: values.features
          .split("\n")
          .map((feature) => feature.trim())
          .filter(Boolean),
      };

      console.log(payload);

      createTierMutation.mutate(payload);
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
      <ModalHeader toggle={handleToggle}>Create New Tier</ModalHeader>

      <ModalBody>
        <form onSubmit={validation.handleSubmit}>
          <Row>
            <Col>
              <Label>Name</Label>

              <Input
                name="title"
                value={validation.values.title}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                placeholder="Tier name"
              />
            </Col>

            <Col>
              <Label>Tag</Label>

              <Input
                name="tag"
                value={validation.values.tag}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                placeholder="e.g. premium"
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Label>Threshold</Label>

              <Input
                type="number"
                name="threshold"
                value={validation.values.threshold}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                placeholder="0"
              />
            </Col>

            <Col>
              <Label>Minimum Deposit</Label>

              <Input
                type="number"
                name="minDeposit"
                value={validation.values.minDeposit}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                placeholder="0"
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Label>Features</Label>

              <Input
                type="textarea"
                rows="5"
                name="features"
                value={validation.values.features}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                placeholder={`Feature one
Feature two
Feature three`}
              />

              <small className="text-muted">Enter one feature per line.</small>
            </Col>
          </Row>

          <div className="mt-4">
            <button
              type="submit"
              disabled={createTierMutation.isPending}
              className="btn btn-secondary d-flex align-items-center justify-content-center gap-2"
            >
              {createTierMutation.isPending && <Spinner size="sm" />}
              Submit
            </button>
          </div>
        </form>
      </ModalBody>

      {createTierMutation.isSuccess && (
        <SuccessToast
          isOpen={createTierMutation.isSuccess}
          onClose={() => createTierMutation.reset()}
          msg="Tier created."
        />
      )}

      {error && (
        <ErrorToast
          isOpen={!!error}
          onClose={() => setError("")}
          errMsg={error}
        />
      )}
    </Modal>
  );
};

export default NewTierModal;
