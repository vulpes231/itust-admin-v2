import { useMutation, useQueryClient } from "@tanstack/react-query";
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

import { addArticle } from "../../services/articles";
import { useDropzone } from "react-dropzone";
import RichTextEditor from "./RichTextEditor";
import SuccessToast from "../../Components/Common/SuccessToast";
import ErrorToast from "../../Components/Common/ErrorToast";

const CreateArticleForm = ({ isOpen, onClose }) => {
  const [error, setError] = useState("");
  const [articleImg, setArticleImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const queryClient = useQueryClient();

  const createNewArticle = useMutation({
    mutationFn: addArticle,
    onError: (err) => {
      setError(err.message);
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["articles"],
        });

        validation.resetForm();
        setError("");
        onClose();
      }, 2000);
    },
  });

  const validation = useFormik({
    initialValues: {
      topic: "",
      title: "",
      content: "",
      image: null,
    },
    onSubmit: (values) => {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("topic", values.topic);
      formData.append("content", values.content);

      if (articleImg) {
        formData.append("articleImg", articleImg);
      }

      console.log(formData);

      createNewArticle.mutate(formData);
    },
  });

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setArticleImg(file);

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
    maxSize: 5242880,
    multiple: false,
  });

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
    <Modal isOpen={isOpen} toggle={onClose} centered size="lg">
      <ModalHeader toggle={onClose}>Create Article</ModalHeader>

      <ModalBody>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
          }}
        >
          {error && <div className="alert alert-danger mb-3">{error}</div>}

          <Row className="mb-3">
            <Col>
              <Label>Category</Label>

              <Input
                type="select"
                name="topic"
                value={validation.values.topic}
                onChange={validation.handleChange}
              >
                <option value="">Choose Category</option>
                <option value="business">Business</option>
                <option value="news">News</option>
                <option value="investing">Investing</option>
                <option value="savings">Savings</option>
                <option value="retirement">Retirement</option>
                <option value="technology">Technology</option>
                <option value="management">Management</option>
                <option value="trends">Trends</option>
              </Input>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Label>Title</Label>

              <Input
                type="text"
                name="title"
                value={validation.values.title}
                onChange={validation.handleChange}
                placeholder="Enter article title"
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Label>Content</Label>

              <RichTextEditor
                value={validation.values.content}
                onChange={(content) =>
                  validation.setFieldValue("content", content)
                }
              />
              {/* <Input
                type="textarea"
                rows={10}
                name="content"
                value={validation.values.content}
                onChange={validation.handleChange}
                placeholder="Write your article..."
              /> */}
            </Col>
          </Row>

          <Row>
            <Col>
              <Label>Article Image (Required)</Label>
              <div {...getRootProps()} style={getDropzoneStyles()}>
                <input {...getInputProps()} />
                {previewUrl ? (
                  <div>
                    <img
                      src={previewUrl}
                      alt="Article preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        objectFit: "contain",
                        marginBottom: "10px",
                      }}
                    />
                    <div>
                      <small className="text-muted">{articleImg?.name}</small>
                      <br />
                      <button
                        type="button"
                        className="btn btn-sm btn-danger mt-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setArticleImg(null);
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

          <button
            type="submit"
            disabled={createNewArticle.isPending}
            className="btn btn-secondary d-flex align-items-center justify-content-center gap-2"
          >
            {createNewArticle.isPending && <Spinner size="sm" />}

            {createNewArticle.isPending ? "Creating..." : "Create Article"}
          </button>
        </form>
      </ModalBody>
      {createNewArticle.isSuccess && (
        <SuccessToast
          isOpen={createNewArticle.isSuccess}
          onClose={() => createNewArticle.reset()}
          msg={"Article added."}
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

export default CreateArticleForm;
