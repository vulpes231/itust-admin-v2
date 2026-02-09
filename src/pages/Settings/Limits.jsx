import React from "react";
import { Col, Input, Label, Row } from "reactstrap";

const Limits = ({ validation }) => {
  return (
    <React.Fragment>
      <Row>
        <Col md={6}>
          <Label>Minimum Crypto Deposit</Label>
          <Input
            type="text"
            value={validation.values.minCryptoDeposit}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="minCryptoDeposit"
          />
        </Col>
        <Col md={6}>
          <Label>Minimum Bank Deposit</Label>
          <Input
            type="text"
            value={validation.values.minBankDeposit}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="minBankDeposit"
          />
        </Col>
        <Col md={6}>
          <Label>Maximum Crypto Deposit</Label>
          <Input
            type="text"
            value={validation.values.maxCryptoDeposit}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="maxCryptoDeposit"
          />
        </Col>
        <Col md={6}>
          <Label>Maximum Bank Deposit</Label>
          <Input
            type="text"
            value={validation.values.maxBankDeposit}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="maxBankDeposit"
          />
        </Col>
        <Col md={6}>
          <Label>Minimum Crypto Withdrawal</Label>
          <Input
            type="text"
            value={validation.values.minCryptoWithdrawal}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="minCryptoWithdrawal"
          />
        </Col>
        <Col md={6}>
          <Label>Minimum Bank Withdrawal</Label>
          <Input
            type="text"
            value={validation.values.minBankWithdrawal}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="minBankWithdrawal"
          />
        </Col>
        <Col md={6}>
          <Label>Maximum Crypto Withdrawal</Label>
          <Input
            type="text"
            value={validation.values.maxCryptoWithdrawal}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="maxCryptoWithdrawal"
          />
        </Col>
        <Col md={6}>
          <Label>Maximum Bank Withdrawal</Label>
          <Input
            type="text"
            value={validation.values.maxBankWithdrawal}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="maxBankWithdrawal"
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Limits;
