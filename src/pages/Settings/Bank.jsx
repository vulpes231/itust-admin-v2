import React from "react";
import { Col, Input, Label, Row } from "reactstrap";

const Bank = ({ validation }) => {
  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <Label>Bank Name</Label>
          <Input
            type="text"
            value={validation.values.bankName}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="bankName"
          />
        </Col>
        <Col md={6}>
          <Label>Account Name</Label>
          <Input
            type="text"
            value={validation.values.accountName}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="accountName"
          />
        </Col>
        <Col md={6}>
          <Label>Account Number</Label>
          <Input
            type="text"
            value={validation.values.account}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="account"
          />
        </Col>
        <Col md={12}>
          <Label>Bank Address</Label>
          <Input
            type="text"
            value={validation.values.bankAddress}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="bankAddress"
          />
        </Col>
        <Col md={6}>
          <Label>Routing Number</Label>
          <Input
            type="text"
            value={validation.values.routing}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="routing"
          />
        </Col>
        <Col md={6}>
          <Label>Reference</Label>
          <Input
            type="text"
            value={validation.values.reference}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="reference"
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Bank;
