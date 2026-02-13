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
import { configureBank } from "../../services/userSettings";
import ErrorToast from "../../Components/Common/ErrorToast";
import SuccessToast from "../../Components/Common/SuccessToast";
import { useParams } from "react-router-dom";

const AddBankModal = ({ handleToggle, isOpen, settings }) => {
  const { userId } = useParams();
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: configureBank,
    onError: (err) => setError(err.message),
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      label: settings?.bankDetails?.label || "",
      bankName: settings?.bankDetails?.bankName || "",
      accountName: settings?.bankDetails?.accountName || "",
      accountNumber: settings?.bankDetails?.accountNumber || "",
      routing: settings?.bankDetails?.routing || "",
      reference: settings?.bankDetails?.reference || "",
      address: settings?.bankDetails?.address || "",
    },
    onSubmit: (values) => {
      const formData = { ...values, userId };
      console.log(formData);
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

  useEffect(() => {
    if (mutation.isSuccess) {
      const tmt = setTimeout(() => {
        mutation.reset();
        window.location.reload();
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [mutation.isSuccess]);

  return (
    <React.Fragment>
      <Modal toggle={handleToggle} isOpen={isOpen}>
        <ModalHeader toggle={handleToggle}>
          Update Bank Deposit Account
        </ModalHeader>
        <hr />
        <ModalBody>
          <form
            action=""
            className="d-flex flex-column gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              validation.submitForm();
            }}
          >
            <Row>
              <Col>
                <Label>Label (Optional)</Label>
                <Input
                  type="text"
                  onChange={validation.handleChange}
                  value={validation.values.label}
                  onBlur={validation.handleBlur}
                  name="label"
                  placeholder="Main Bank"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Bank Name</Label>
                <Input
                  type="text"
                  onChange={validation.handleChange}
                  value={validation.values.bankName}
                  onBlur={validation.handleBlur}
                  name="bankName"
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label>Account Name</Label>
                <Input
                  type="text"
                  onChange={validation.handleChange}
                  value={validation.values.accountName}
                  onBlur={validation.handleBlur}
                  name="accountName"
                />
              </Col>
              <Col md={6}>
                <Label>Account Number</Label>
                <Input
                  type="text"
                  onChange={validation.handleChange}
                  value={validation.values.accountNumber}
                  onBlur={validation.handleBlur}
                  name="accountNumber"
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label>Reference</Label>
                <Input
                  type="text"
                  onChange={validation.handleChange}
                  value={validation.values.reference}
                  onBlur={validation.handleBlur}
                  name="reference"
                />
              </Col>
              <Col md={6}>
                <Label>Routing</Label>
                <Input
                  type="text"
                  onChange={validation.handleChange}
                  value={validation.values.routing}
                  onBlur={validation.handleBlur}
                  name="routing"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Address</Label>
                <Input
                  type="text"
                  onChange={validation.handleChange}
                  value={validation.values.address}
                  onBlur={validation.handleBlur}
                  name="address"
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <button type="submit" className="btn btn-success w-100">
                  {mutation.isPending ? (
                    <Spinner>Loading...</Spinner>
                  ) : (
                    "Update Bank"
                  )}
                </button>
              </Col>
              <Col>
                <button
                  type="button"
                  onClick={handleToggle}
                  className="btn btn-danger w-100"
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
          isOpen={!!error}
          onClose={() => setError("")}
        />
      )}
      {mutation.isSuccess && (
        <SuccessToast
          isOpen={mutation.isSuccess}
          msg={"Bank Information Updated."}
          onClose={() => mutation.reset()}
        />
      )}
    </React.Fragment>
  );
};

export default AddBankModal;
