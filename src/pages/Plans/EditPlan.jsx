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
import { liveServer } from "../../config";

const EditPlan = ({ onClose, isOpen, data }) => {
  const [error, setError] = useState("");
  const [planImg, setPlanImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateAutoPlan,
    onError: (err) => setError(err.message),
    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["investments"] });
        queryClient.invalidateQueries({ queryKey: ["plans"] });
        onClose();
        window.location.reload();
      }, 3000);
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxSize: 5242880,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const errorMsg = rejectedFiles[0].errors[0].message;
        if (rejectedFiles[0].errors[0].code === "file-too-large") {
          setError("File size must be less than 5MB");
        } else if (rejectedFiles[0].errors[0].code === "file-invalid-type") {
          setError("Only JPEG, PNG, and WEBP images are allowed");
        } else {
          setError(errorMsg);
        }
        return;
      }

      const file = acceptedFiles[0];
      setPlanImg(file);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    },
  });

  useEffect(() => {
    if (isOpen && data) {
      setPlanImg(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    }
  }, [isOpen, data]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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

      const changedFields = {};
      Object.keys(values).forEach((key) => {
        const currentValue = String(values[key] || "").trim();
        const originalValue = String(initialValues[key] || "").trim();

        if (currentValue !== originalValue) {
          changedFields[key] = values[key];
        }
      });

      if (Object.keys(changedFields).length === 0 && !planImg) {
        setError("No changes detected to update");
        return;
      }

      const formData = new FormData();
      formData.append("planId", planId);

      Object.keys(changedFields).forEach((key) => {
        formData.append(key, changedFields[key]);
      });

      if (planImg) {
        formData.append("planImg", planImg);
      }

      // console.log(formData);

      mutation.mutate(formData);
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

  const getCurrentImageSrc = () => {
    if (previewUrl) return previewUrl;
    if (data?.img) return `${liveServer}${data.img}`;
    return null;
  };

  return (
    <React.Fragment>
      <Modal toggle={onClose} isOpen={isOpen} size="lg">
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
                <Col xs={12}>
                  <Label>Plan Image</Label>
                  <div
                    {...getRootProps()}
                    style={{
                      border: "2px dashed #dee2e6",
                      borderRadius: "8px",
                      padding: "20px",
                      textAlign: "center",
                      cursor: "pointer",
                      backgroundColor: "#f8f9fa",
                      marginBottom: "10px",
                    }}
                  >
                    <input {...getInputProps()} />
                    {getCurrentImageSrc() ? (
                      <div>
                        <img
                          src={getCurrentImageSrc()}
                          alt="Plan preview"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "200px",
                            objectFit: "contain",
                          }}
                          onError={(e) => {
                            console.error(
                              "Image failed to load:",
                              getCurrentImageSrc(),
                            );
                            e.target.style.display = "none";

                            const parent = e.target.parentElement;
                            if (
                              parent &&
                              !parent.querySelector(".error-message")
                            ) {
                              const errorMsg = document.createElement("p");
                              errorMsg.className =
                                "error-message text-danger mt-2";
                              errorMsg.textContent = "Failed to load image";
                              parent.appendChild(errorMsg);
                            }
                          }}
                        />
                        <p className="mt-2 text-muted">
                          Click or drag to change image
                        </p>
                        {previewUrl && (
                          <button
                            type="button"
                            className="btn btn-sm btn-danger mt-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (previewUrl) {
                                URL.revokeObjectURL(previewUrl);
                                setPreviewUrl(null);
                                setPlanImg(null);
                              }
                            }}
                          >
                            Remove selected image
                          </button>
                        )}
                      </div>
                    ) : (
                      <div>
                        <i
                          className="bi bi-cloud-upload"
                          style={{ fontSize: "48px" }}
                        ></i>
                        <p className="mt-2 text-muted">
                          Drag & drop or click to select image
                        </p>
                        <small className="text-muted">
                          Supports: JPEG, PNG, WEBP (Max 5MB)
                        </small>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>

              {/* Rest of your form fields - unchanged */}
              <Row>
                <Col md={6}>
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
                <Col md={6}>
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
                <Col md={6}>
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
                <Col md={6}>
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
                <Col md={6}>
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
                <Col md={6}>
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
                <Col md={6}>
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
                <Col md={6}>
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
                <Col md={6}>
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
                <Col md={6}>
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
                  {mutation.isPending && <Spinner size="sm" />} Update Plan
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
          msg={"Investment plan updated successfully."}
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
        />
      )}
    </React.Fragment>
  );
};

export default EditPlan;
