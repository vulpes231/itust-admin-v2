import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import {
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { ErrorToast, SuccessToast } from "../../Components";
import { updateUserTier } from "../../services/tier";
import { useMutation } from "@tanstack/react-query";

const UpdateTier = ({ isOpen, handleToggle, tier, tierInfo }) => {
  const [error, setError] = useState("");

  const updateUserTierMutation = useMutation({
    mutationFn: updateUserTier,

    onError: (err) => {
      setError(err.message);
    },

    onSuccess: () => {
      setTimeout(() => {
        updateUserTierMutation.reset();
        window.location.reload();
      }, 2000);
    },
  });

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: tier?.title || "",
      threshold: tier?.threshold ?? "",
      minDeposit: tier?.minDeposit ?? "",
      isCodeActivated: Boolean(tierInfo?.isCodeActivated),
      code: tierInfo?.withdrawalCode || "",
    },

    onSubmit: (values) => {
      const payload = {
        userId: tier.userId,
        tierId: tier._id,
      };

      // Threshold changed
      if (Number(values.threshold) !== Number(tier?.threshold)) {
        payload.threshold = Number(values.threshold);
      }

      // Minimum deposit changed
      if (Number(values.minDeposit) !== Number(tier?.minDeposit)) {
        payload.minDeposit = Number(values.minDeposit);
      }

      // Withdrawal code status changed
      if (values.isCodeActivated !== Boolean(tierInfo?.isCodeActivated)) {
        payload.isCodeActivated = values.isCodeActivated;
      }

      // Code entered
      if (values.code.trim() !== "") {
        payload.code = values.code.trim();
      }

      // Nothing changed
      if (Object.keys(payload).length === 2) {
        return;
      }

      console.log("Update payload:", payload);

      updateUserTierMutation.mutate(payload);
    },
  });

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  return (
    <Modal isOpen={isOpen} toggle={handleToggle} centered>
      <ModalHeader toggle={handleToggle}>
        <span>Edit Tier</span>
      </ModalHeader>

      <ModalBody>
        <form
          className="d-flex flex-column gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
          }}
        >
          <Col>
            <Label>Name</Label>

            <Input
              type="text"
              name="title"
              value={validation.values.title}
              autoComplete="off"
              readOnly
              className="bg-light"
            />
          </Col>

          <Col>
            <Label>Threshold</Label>

            <Input
              type="number"
              name="threshold"
              onChange={validation.handleChange}
              value={validation.values.threshold}
              autoComplete="off"
              min="0"
            />
          </Col>

          <Col>
            <Label>Minimum Deposit</Label>

            <Input
              type="number"
              name="minDeposit"
              onChange={validation.handleChange}
              value={validation.values.minDeposit}
              autoComplete="off"
              min="0"
            />
          </Col>

          <hr />

          <Col className="d-flex justify-content-between align-items-center">
            <Label className="mb-0">Enable Withdrawal Code</Label>

            <button
              type="button"
              className="btn p-0"
              onClick={() =>
                validation.setFieldValue(
                  "isCodeActivated",
                  !validation.values.isCodeActivated,
                )
              }
            >
              {validation.values.isCodeActivated ? (
                <MdToggleOn size={30} className="text-success" />
              ) : (
                <MdToggleOff size={30} />
              )}
            </button>
          </Col>

          {validation.values.isCodeActivated && (
            <Col>
              <Label>Withdrawal Code</Label>

              <Input
                type="text"
                name="code"
                onChange={validation.handleChange}
                value={validation.values.code}
                autoComplete="off"
              />
            </Col>
          )}

          <div className="mt-4">
            <button
              type="submit"
              className="btn btn-secondary d-flex justify-content-center align-items-center gap-2"
              disabled={updateUserTierMutation.isPending}
            >
              {updateUserTierMutation.isPending && <Spinner size="sm" />}
              Submit
            </button>
          </div>
        </form>
      </ModalBody>

      {error && (
        <ErrorToast
          isOpen={!!error}
          onClose={() => setError("")}
          errMsg={error}
        />
      )}

      {updateUserTierMutation.isSuccess && (
        <SuccessToast
          msg="Tier info updated."
          onClose={() => updateUserTierMutation.reset()}
          isOpen={updateUserTierMutation.isSuccess}
        />
      )}
    </Modal>
  );
};

export default UpdateTier;
