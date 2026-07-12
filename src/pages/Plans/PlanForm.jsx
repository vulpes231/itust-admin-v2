import React, { useEffect, useState } from "react";
import { ErrorToast, SuccessToast } from "../../Components";
import { useMutation } from "@tanstack/react-query";
import { createAutoPlan } from "../../services/plans";
import { useFormik } from "formik";
import { Col, Input, Label, Row, Spinner } from "reactstrap";
import { useDropzone } from "react-dropzone";

const PlanForm = () => {
  const [error, setError] = useState("");
  const [planImg, setPlanImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const mutation = useMutation({
    mutationFn: createAutoPlan,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    },
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      title: "",
      type: "",
      min: "",
      winRate: "",
      expectedReturn: "",
      dailyReturn: "",
      aum: "",
      milestone: "",
      duration: "",
    },
    onSubmit: async (values) => {
      // Create FormData for file upload
      const formData = new FormData();

      // Append all text fields
      Object.keys(values).forEach((key) => {
        if (values[key]) {
          formData.append(key, values[key]);
        }
      });

      // Append the image file with the correct field name "planImg" (matches backend)
      if (planImg) {
        formData.append("planImg", planImg);
      }

      // Call mutation with FormData
      mutation.mutate(formData);
    },
  });

  // Setup dropzone
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setPlanImg(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    maxSize: 5242880, // 5MB
    multiple: false,
  });

  // Clean up preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [error]);

  const getDropzoneStyles = () => {
    let baseStyle = {
      border: "2px dashed #ccc",
      borderRadius: "4px",
      padding: "20px",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.2s ease",
      backgroundColor: "#f8f9fa",
    };

    if (isDragActive) {
      baseStyle = {
        ...baseStyle,
        borderColor: "#0d6efd",
        backgroundColor: "#e7f1ff",
      };
    }

    if (isDragAccept) {
      baseStyle = {
        ...baseStyle,
        borderColor: "#198754",
        backgroundColor: "#d1e7dd",
      };
    }

    if (isDragReject) {
      baseStyle = {
        ...baseStyle,
        borderColor: "#dc3545",
        backgroundColor: "#f8d7da",
      };
    }

    if (previewUrl) {
      baseStyle = {
        ...baseStyle,
        padding: "10px",
      };
    }

    return baseStyle;
  };

  return (
    <React.Fragment>
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
                type="text"
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
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                name="winRate"
                value={validation.values.winRate}
                autoComplete="off"
              />
            </Col>
            <Col>
              <Label htmlFor="aum">AU</Label>
              <Input
                type="text"
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
                type="text"
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
                type="text"
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
                type="text"
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

          {/* Image Upload Section */}
          <Row>
            <Col>
              <Label>Plan Image (Required)</Label>
              <div {...getRootProps()} style={getDropzoneStyles()}>
                <input {...getInputProps()} />
                {previewUrl ? (
                  <div>
                    <img
                      src={previewUrl}
                      alt="Plan preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        objectFit: "contain",
                        marginBottom: "10px",
                      }}
                    />
                    <div>
                      <small className="text-muted">{planImg?.name}</small>
                      <br />
                      <button
                        type="button"
                        className="btn btn-sm btn-danger mt-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlanImg(null);
                          setPreviewUrl(null);
                        }}
                      >
                        Remove Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {isDragActive ? (
                      <p>Drop the image here...</p>
                    ) : (
                      <div>
                        <i
                          className="bi bi-cloud-upload"
                          style={{ fontSize: "2rem" }}
                        ></i>
                        <p>Drag & drop an image here, or click to select</p>
                        <small className="text-muted">
                          Supported formats: JPG, PNG, WEBP (Max 5MB)
                        </small>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Col>
          </Row>

          <Col>
            <button
              type="submit"
              disabled={mutation.isPending || !planImg}
              className="btn btn-secondary d-flex align-items-center gap-2 justify-content-center"
            >
              {mutation.isPending && <Spinner />} Create Plan
            </button>
          </Col>
        </form>
      </Col>
      {error && (
        <ErrorToast
          errMsg={error}
          isOpen={error !== undefined}
          onClose={() => setError("")}
        />
      )}
      {mutation.isSuccess && (
        <SuccessToast
          msg={"Invest plan created successfully."}
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
        />
      )}
    </React.Fragment>
  );
};

export default PlanForm;
