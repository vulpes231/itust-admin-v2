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
import { ErrorToast, SuccessToast } from "../../Components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserPlan } from "../../services/plans";
import { useParams } from "react-router-dom";

const EditPlanModal = ({ plan, isOpen, onClose }) => {
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const { userId } = useParams();

  const mutation = useMutation({
    mutationFn: updateUserPlan,
    onError: (err) => {
      setError(err.message);
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["userPlans"] });
        queryClient.invalidateQueries({ queryKey: ["plans"] });
        onClose();
        window.location.reload();
        mutation.reset();
      }, 3000);
    },
  });

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: plan?.name || "",
      balance: plan?.balance?.available || 0,
      invested: plan?.balance?.total || 0,
      start: formatDateForInput(plan?.start) || "",
      end: formatDateForInput(plan?.end) || "",
      risk: plan?.risk || "",
      amount: plan?.amount || 0,
      min: plan?.min || "",
      duration: plan?.duration || "",
      status: plan?.status || "",
    },
    onSubmit: (values) => {
      const initialValues = {
        name: plan?.name || "",
        balance: plan?.balance?.available || 0,
        invested: plan?.balance?.total || 0,
        start: formatDateForInput(plan?.start) || "",
        end: formatDateForInput(plan?.end) || "",
        risk: plan?.risk || "",
        amount: plan?.amount || 0,
        min: plan?.min || "",
        duration: plan?.duration || "",
        status: plan?.status || "",
      };

      const changedFields = {};
      Object.keys(values).forEach((key) => {
        const currentValue = String(values[key] || "").trim();
        const originalValue = String(initialValues[key] || "").trim();

        if (currentValue !== originalValue) {
          changedFields[key] = values[key];
        }
      });

      if (Object.keys(changedFields).length === 0) {
        setError("No changes detected to update");
        return;
      }

      console.log("Changed fields to update:", changedFields);

      const data = { ...changedFields, planId: plan._id, userId };
      console.log(data);
      mutation.mutate(data);
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount || 0);
  };

  return (
    <>
      <Modal toggle={onClose} isOpen={isOpen} centered size="md">
        <ModalHeader toggle={onClose}>Edit User Plan</ModalHeader>
        <ModalBody>
          <form onSubmit={validation.handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Label>Plan Name</Label>
                <Input
                  type="text"
                  readOnly
                  value={validation.values.name}
                  className="bg-light"
                />
              </Col>
              <Col md={6}>
                <Label>Risk Level</Label>
                <Input
                  type="text"
                  readOnly
                  value={validation.values.risk}
                  className="bg-light text-capitalize"
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Label>Invested Amount</Label>
                <Input
                  type="text"
                  readOnly
                  value={formatCurrency(validation.values.invested)}
                  className="bg-light"
                />
              </Col>
              <Col md={6}>
                <Label>Available Balance</Label>
                <Input
                  type="text"
                  readOnly
                  value={formatCurrency(validation.values.balance)}
                  className="bg-light"
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Label>Minimum Investment</Label>
                <Input
                  type="text"
                  readOnly
                  value={formatCurrency(validation.values.min)}
                  className="bg-light"
                />
              </Col>
              <Col md={6}>
                <Label>Duration</Label>
                <Input
                  type="text"
                  readOnly
                  value={validation.values.duration}
                  className="bg-light"
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.start}
                  name="start"
                />
              </Col>
              <Col md={6}>
                <Label>End Date</Label>
                <Input
                  type="date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.end}
                  name="end"
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Label>Status</Label>
                <Input
                  type="select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status}
                  name="status"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </Input>
              </Col>
            </Row>

            <Row>
              <Col className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending && <Spinner size="sm" className="me-2" />}
                  Update Plan
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>

      {error && (
        <ErrorToast
          errMsg={error}
          isOpen={error !== undefined}
          onClose={() => setError("")}
        />
      )}
      {mutation.isSuccess && (
        <SuccessToast
          msg={"Plan updated successfully."}
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
        />
      )}
    </>
  );
};

export default EditPlanModal;
