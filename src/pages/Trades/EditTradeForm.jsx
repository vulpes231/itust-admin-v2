import React, { useEffect } from "react";
import { Col, Input, Label, Row, Spinner } from "reactstrap";
import { useFormik } from "formik";

const EditTradeForm = ({ tradeData, mutation }) => {
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      tradeId: tradeData?._id,
      currentValue: tradeData?.performance?.currentValue.toFixed(2) || "",
      account: tradeData?.wallet?.name || "",
      extra: tradeData?.extra || 0,
      return: tradeData?.performance?.totalReturn.toFixed(2) || "",
      amount: tradeData?.execution?.amount || "",
      orderType: tradeData?.orderType || "",
    },
    onSubmit: (values) => {
      console.log(values);
      const formData = {
        tradeId: values.tradeId,
        extra: values.extra,
      };
      mutation.mutate(formData);
    },
  });

  // useEffect(() => {
  //   if (tradeData) console.log(tradeData.extra);
  // }, [tradeData]);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Label>Type</Label>
          <Input
            type="text"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.orderType}
            name="orderType"
            autoComplete="off"
            readOnly
          />
        </Col>
        <Col>
          <Label>Amount</Label>
          <Input
            type="text"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.amount}
            name="amount"
            autoComplete="off"
            readOnly
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label>Current Value</Label>
          <Input
            type="text"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.currentValue}
            name="currentValue"
            autoComplete="off"
            readOnly
          />
        </Col>
        <Col>
          <Label>Account</Label>
          <Input
            type="text"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.account}
            name="account"
            autoComplete="off"
            readOnly
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Label>Extra</Label>
          <Input
            type="text"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.extra}
            name="extra"
            autoComplete="off"
          />
        </Col>
        <Col>
          <Label>Total Return (%)</Label>
          <Input
            type="text"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.return}
            name="return"
            autoComplete="off"
            readOnly
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
