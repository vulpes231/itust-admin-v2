import React, { useEffect, useState } from "react";
import { ErrorToast, SuccessToast } from "../../Components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAutoPlan } from "../../services/plans";
import { useFormik } from "formik";
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
import { useDropzone } from "react-dropzone";

const EditPlan = ({ onClose, isOpen, data }) => {
  const [error, setError] = useState("");
  const [planImg, setPlanImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateAutoPlan,
    onError: (err) => setError(err.message),
    onSuccess: (data) => {
      // console.log(data);
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["investments"] });
        onClose();
        window.location.reload();
      }, 3000);
    },
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.name || "",
      title: data?.title || "",
      type: data?.planType || "",
      min: data?.minInvestment || "",
      winRate: data?.performance?.winRate || "",
      expectedReturn: data?.performance?.expectedReturnPercent || "",
      dailyReturn: data?.performance?.dailyReturnPercent || "",
      aum: data?.performance?.aum || "",
      milestone: data?.expiresIn?.milestone || "",
      duration: data?.expiresIn?.duration || "",
    },
    onSubmit: async (values) => {
      const planId = data?._id;

      // Get initial values to compare
      const initialValues = {
        name: data?.name || "",
        title: data?.title || "",
        type: data?.planType || "",
        min: data?.minInvestment || "",
        winRate: data?.performance?.winRate || "",
        expectedReturn: data?.performance?.expectedReturnPercent || "",
        dailyReturn: data?.performance?.dailyReturnPercent || "",
        aum: data?.performance?.aum || "",
        milestone: data?.expiresIn?.milestone || "",
        duration: data?.expiresIn?.duration || "",
      };

      // Only include fields that have changed
      const changedFields = {};
      Object.keys(values).forEach((key) => {
        // Convert both values to strings for proper comparison
        const currentValue = String(values[key] || "").trim();
        const originalValue = String(initialValues[key] || "").trim();

        if (currentValue !== originalValue) {
          changedFields[key] = values[key];
        }
      });

      // Check if any fields actually changed
      if (Object.keys(changedFields).length === 0) {
        setError("No changes detected to update");
        return;
      }

      // Send only the planId and changed fields
      mutation.mutate({
        planId,
        ...changedFields,
      });
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
    <React.Fragment>
      <Modal toggle={onClose} isOpen={isOpen}>
        <ModalHeader toggle={onClose}>Edit Plan</ModalHeader>
        <ModalBody>
          <Col>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
              }}
              className="d-flex flex-column gap-2"
            >
              <Row>
                <Col>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    name="name"
                    value={validation.values.name}
                    autoComplete="off"
                  />
                </Col>
                <Col>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    name="title"
                    value={validation.values.title}
                    autoComplete="off"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label htmlFor="type">Type</Label>
                  <Input
                    type="select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    name="type"
                    value={validation.values.type}
                    autoComplete="off"
                  >
                    <option value="">Select Risk</option>
                    <option value="conservative">Conservative</option>
                    <option value="moderate">Moderate</option>
                    <option value="aggressive">Aggressive</option>
                  </Input>
                </Col>
                <Col>
                  <Label htmlFor="min">Minimum Investment</Label>
                  <Input
                    type="number"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    name="min"
                    value={validation.values.min}
                    autoComplete="off"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label htmlFor="winRate">Winrate (%)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    name="winRate"
                    value={validation.values.winRate}
                    autoComplete="off"
                  />
                </Col>
                <Col>
                  <Label htmlFor="aum">AUM</Label>
                  <Input
                    type="number"
                    step="0.01"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    name="aum"
                    value={validation.values.aum}
                    autoComplete="off"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label htmlFor="expectedReturn">Expected Return (%)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    name="expectedReturn"
                    value={validation.values.expectedReturn}
                    autoComplete="off"
                  />
                </Col>
                <Col>
                  <Label htmlFor="dailyReturn">Daily Return (%)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    name="dailyReturn"
                    value={validation.values.dailyReturn}
                    autoComplete="off"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label htmlFor="milestone">Milestone</Label>
                  <Input
                    type="number"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    name="milestone"
                    value={validation.values.milestone}
                    autoComplete="off"
                  />
                </Col>
                <Col>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    type="select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    name="duration"
                    value={validation.values.duration}
                    autoComplete="off"
                  >
                    <option value="">Select Duration</option>
                    <option value="day">
                      day{parseFloat(validation.values.milestone) > 1 && "s"}
                    </option>
                    <option value="week">
                      week{parseFloat(validation.values.milestone) > 1 && "s"}
                    </option>
                    <option value="month">
                      month{parseFloat(validation.values.milestone) > 1 && "s"}
                    </option>
                    <option value="year">
                      year{parseFloat(validation.values.milestone) > 1 && "s"}
                    </option>
                  </Input>
                </Col>
              </Row>

              <Col>
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="btn btn-secondary d-flex align-items-center gap-2 justify-content-center mt-3"
                >
                  {mutation.isPending && <Spinner />} Update Plan
                </button>
              </Col>
            </form>
          </Col>
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
          msg={"Invest plan updated successfully."}
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
        />
      )}
    </React.Fragment>
  );
};

export default EditPlan;
