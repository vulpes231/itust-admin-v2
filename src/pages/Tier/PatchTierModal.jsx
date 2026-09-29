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
import { updateTier } from "../../services/tier";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import ErrorToast from "../../Components/Common/ErrorToast";
import SuccessToast from "../../Components/Common/SuccessToast";

const PathTierModal = ({ isOpen, handleToggle, data }) => {
  const [error, setError] = useState("");

  const updateTierMutation = useMutation({
    mutationFn: updateTier,

    onError: (err) => {
      setError(err.message);
    },

    onSuccess: () => {
      setTimeout(() => {
        updateTierMutation.reset();
        handleToggle();
        window.location.reload();
      }, 2000);
    },
  });

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      tag: data?.tag || "",
      title: data?.title || "",
      threshold: data?.threshold || "",
      minDeposit: data?.minDeposit || "",
    },

    onSubmit: (values) => {
      const payload = {
        tierId: data?._id,
      };

      if (values.title !== (data?.title || "")) {
        payload.title = values.title;
      }

      if (values.tag !== (data?.tag || "")) {
        payload.tag = values.tag;
      }

      if (Number(values.threshold) !== Number(data?.threshold)) {
        payload.threshold = Number(values.threshold);
      }

      if (Number(values.minDeposit) !== Number(data?.minDeposit)) {
        payload.minDeposit = Number(values.minDeposit);
      }

      // Nothing changed
      if (Object.keys(payload).length === 1) {
        handleToggle();
        return;
      }

      updateTierMutation.mutate(payload);
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
      <ModalHeader toggle={handleToggle}>Update Tier</ModalHeader>

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

          <div className="mt-4">
            <button
              type="submit"
              disabled={updateTierMutation.isPending}
              className="btn btn-secondary d-flex align-items-center justify-content-center gap-2"
            >
              {updateTierMutation.isPending && <Spinner size="sm" />}
              Submit
            </button>
          </div>
        </form>
      </ModalBody>

      {updateTierMutation.isSuccess && (
        <SuccessToast
          isOpen={updateTierMutation.isSuccess}
          onClose={() => updateTierMutation.reset()}
          msg="Tier info updated."
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

export default PathTierModal;
