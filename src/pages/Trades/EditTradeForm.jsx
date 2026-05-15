import React, { useEffect } from "react";
import { Col, Input, Label, Row, Spinner } from "reactstrap";
import { useFormik } from "formik";
import numeral from "numeral";

const EditTradeForm = ({ tradeData, mutation }) => {
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      tradeId: tradeData?._id,
      customDate: tradeData?.customDate
        ? tradeData.customDate.slice(0, 16)
        : "",
    },
    onSubmit: (values) => {
      console.log(values);

      const updatedData = {};

      if (values.customDate !== tradeData?.customDate) {
        updatedData.customDate = values.customDate
          ? new Date(values.customDate)
          : null;
      }

      updatedData.tradeId = values.tradeId;

      if (Object.keys(updatedData).length > 1) {
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
          <Label>Date & Time</Label>
          <Input
            type="datetime-local"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.customDate}
            name="customDate"
            autoComplete="off"
            // Remove readOnly if you want users to edit it
            // readOnly
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
          <button
            type="button"
            // onClick={onClose}
            className="btn btn-danger"
          >
            Close Trade
          </button>
        </div>
      </Row>
    </React.Fragment>
  );
};

export default EditTradeForm;
