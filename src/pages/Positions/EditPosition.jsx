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
import { updatePosition } from "../../services/positions";
import ErrorToast from "../../Components/Common/ErrorToast";
import SuccessToast from "../../Components/Common/SuccessToast";

const EditPosition = ({ rowData, handleClose, isOpen }) => {
  const [error, setError] = useState("");

  const getCurrentDateTime = () => {
    const now = new Date();
    now.setSeconds(0, 0);

    const offset = now.getTimezoneOffset();
    const local = new Date(now.getTime() - offset * 60000);

    return local.toISOString().slice(0, 16);
  };

  const mutation = useMutation({
    mutationFn: updatePosition,
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
      positionId: rowData?._id || "",
      extra: rowData?.performance?.extra || 0,
      customDate: rowData?.createdAt
        ? rowData.createdAt.slice(0, 16)
        : getCurrentDateTime(),
    },
    onSubmit: (values) => {
      const updatedData = {};

      updatedData.positionId = values.positionId;

      if (values.extra !== (rowData?.performance?.extra || "")) {
        updatedData.extra = values.extra;
      }

      const originalDate = rowData?.customDate
        ? new Date(rowData.customDate).toISOString().slice(0, 16)
        : "";
      const newDate = values.customDate || "";

      if (newDate !== originalDate) {
        updatedData.customDate = values.customDate
          ? new Date(values.customDate)
          : null;
      }

      if (Object.keys(updatedData).length > 1) {
        mutation.mutate(updatedData);
      } else {
        console.log("No changes detected");
      }
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

  // console.log(rowData);

  return (
    <Modal centered toggle={handleClose} isOpen={isOpen}>
      <ModalHeader toggle={handleClose}>Edit Position</ModalHeader>
      <ModalBody>
        <form
          className="d-flex flex-column gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
          }}
        >
          <Row>
            <Col>
              <Label>Asset</Label>
              <Input
                type="text"
                onChange={validation.handleChange}
                name="positionId"
                value={rowData?.asset?.name}
                readOnly
                className="bg-light"
              />
            </Col>

            <Col>
              <Label>Quantity</Label>
              <Input
                type="text"
                onChange={validation.handleChange}
                name="quantity"
                value={rowData?.quantity}
                readOnly
                className="bg-light"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Cost</Label>
              <Input
                type="text"
                onChange={validation.handleChange}
                name="amount"
                value={rowData?.amountInvested}
                readOnly
                className="bg-light"
              />
            </Col>
            <Col>
              <Label>Current Value</Label>
              <Input
                type="text"
                onChange={validation.handleChange}
                name="currentValue"
                value={rowData?.performance?.currentValue}
                readOnly
                className="bg-light"
              />
            </Col>
          </Row>
          <Col>
            <Label> Extra P&L</Label>
            <Input
              type="number"
              onChange={validation.handleChange}
              name="extra"
              value={validation.values.extra}
            />
          </Col>
          <Col>
            <Label>Date & Time</Label>
            <Input
              type="datetime-local"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.customDate}
              name="customDate"
              autoComplete="off"
            />
          </Col>

          <Col className="d-flex align-items-center gap-2 mt-4">
            <button
              type="submit"
              className="btn btn-secondary d-flex gap-2 align-items-center justify-content-center"
            >
              {mutation.isPending && <Spinner size={"sm"} />} Update
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-danger"
            >
              Cancel
            </button>
          </Col>
        </form>
      </ModalBody>
      {error && (
        <ErrorToast
          isOpen={!!error}
          onClose={() => setError("")}
          errMsg={error}
        />
      )}
      {mutation.isSuccess && (
        <SuccessToast
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
          msg={"Position update success."}
        />
      )}
    </Modal>
  );
};

export default EditPosition;
