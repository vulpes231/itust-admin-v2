import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import { Card, Col, Input, Label, Row, Spinner } from "reactstrap";

import ErrorToast from "../../Components/Common/ErrorToast";
import SuccessToast from "../../Components/Common/SuccessToast";
import { updateUserTier } from "../../services/tier";

const AccountTier = ({ tierInfo, userId }) => {
  const [error, setError] = useState("");

  const updateUserTierMutation = useMutation({
    mutationFn: updateUserTier,

    onError: (err) => {
      setError(err.message);
    },

    onSuccess: () => {
      setTimeout(() => {
        updateUserTierMutation.reset();
        // handleToggle();
        window.location.reload();
      }, 2000);
    },
  });

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      threshold: tierInfo?.threshold ?? "",
      minDeposit: tierInfo?.minDeposit ?? "",
      isCodeActivated: tierInfo?.isCodeActivated ?? false,
      withdrawalCode: "",
    },

    onSubmit: (values) => {
      const payload = {
        userId,
      };

      // Threshold changed
      if (Number(values.threshold) !== Number(tierInfo?.threshold)) {
        payload.threshold = Number(values.threshold);
      }

      // Minimum deposit changed
      if (Number(values.minDeposit) !== Number(tierInfo?.minDeposit)) {
        payload.minDeposit = Number(values.minDeposit);
      }

      // Withdrawal code activation changed
      if (values.isCodeActivated !== Boolean(tierInfo?.isCodeActivated)) {
        payload.isCodeActivated = values.isCodeActivated;
      }

      // Withdrawal code was entered/changed
      if (values.withdrawalCode.trim() !== "") {
        payload.code = values.withdrawalCode.trim();
      }

      // Nothing changed
      if (Object.keys(payload).length === 1) {
        return;
      }

      console.log("Update payload:", payload);

      updateUserTierMutation.mutate(payload);
    },
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Card className="p-4">
      <h4>Account Tier</h4>

      <form onSubmit={validation.handleSubmit} className="mt-4">
        {/* Withdrawal Code Toggle */}
        <Row>
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
        </Row>

        {/* Withdrawal Code */}
        {validation.values.isCodeActivated && (
          <Row className="mt-3">
            <Col>
              <Label>Withdrawal Code</Label>

              <Input
                type="password"
                name="withdrawalCode"
                value={validation.values.withdrawalCode}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                autoComplete="new-password"
                placeholder="Enter withdrawal code"
              />
            </Col>
          </Row>
        )}

        {/* Tier Values */}
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

        {/* Submit */}
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
    </Card>
  );
};

export default AccountTier;
