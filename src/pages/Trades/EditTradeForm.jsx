import React, { useEffect } from "react";
import { Col, Input, Label, Row, Spinner } from "reactstrap";
import { useFormik } from "formik";
import numeral from "numeral";

const EditTradeForm = ({ tradeData, mutation, onClose }) => {
  const getCurrentDateTime = () => {
    const now = new Date();
    now.setSeconds(0, 0);

    const offset = now.getTimezoneOffset();
    const local = new Date(now.getTime() - offset * 60000);

    return local.toISOString().slice(0, 16);
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      tradeId: tradeData?._id,
      leverage: tradeData?.execution?.leverage ?? "",
      customDate: tradeData?.createdAt
        ? tradeData.createdAt.slice(0, 16)
        : getCurrentDateTime(),
    },

    onSubmit: (values) => {
      const updatedData = {};

      // Compare against createdAt, which initializes customDate
      const originalDate = tradeData?.createdAt
        ? tradeData.createdAt.slice(0, 16)
        : "";

      if (values.customDate !== originalDate) {
        updatedData.customDate = values.customDate
          ? new Date(values.customDate)
          : null;
      }

      const originalLeverage = tradeData?.execution?.leverage;

      if (String(values.leverage) !== String(originalLeverage)) {
        updatedData.leverage = values.leverage;
      }

      updatedData.tradeId = values.tradeId;

      if (Object.keys(updatedData).length > 1) {
        // console.log(updatedData);
        mutation.mutate(updatedData);
      } else {
        console.log("No changes detected");
      }
    },
  });

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Label>Type</Label>
          <Input
            type="text"
            value={tradeData?.orderType}
            name="orderType"
            readOnly
            className="bg-light"
          />
        </Col>
        <Col>
          <Label>Amount</Label>
          <Input
            type="text"
            value={numeral(tradeData?.execution?.amount).format("$0,0.00")}
            name="amount"
            readOnly
            className="bg-light"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label>Leverage</Label>
          <Input
            type="text"
            value={validation.values.leverage}
            name="leverage"
            onChange={validation.handleChange}
          />
        </Col>
      </Row>
      <Row>
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
      </Row>

      <Row>
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-info"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              validation.submitForm();
            }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Spinner size="sm" className="me-2">
                Loading...
              </Spinner>
            ) : null}
            Update Trade
          </button>
          <button type="button" onClick={onClose} className="btn btn-danger">
            Cancel
          </button>
        </div>
      </Row>
    </React.Fragment>
  );
};

export default EditTradeForm;
