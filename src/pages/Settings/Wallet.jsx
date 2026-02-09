import React from "react";
import { Col, Input, Label, Row } from "reactstrap";

const Wallet = ({ validation }) => {
  return (
    <React.Fragment>
      <Row>
        <Col md={6}>
          <Label>BTC Wallet Address</Label>
          <Input
            type="text"
            value={validation.values.btc}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="btc"
          />
        </Col>
        <Col md={6}>
          <Label>ETH Wallet Address</Label>
          <Input
            type="text"
            value={validation.values.eth}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="eth"
          />
        </Col>
        <Col md={6}>
          <Label>USDT (ERC20) Wallet Address</Label>
          <Input
            type="text"
            value={validation.values.usdtErc}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="usdtErc"
          />
        </Col>
        <Col md={6}>
          <Label>USDT (TRC20) Wallet Address</Label>
          <Input
            type="text"
            value={validation.values.usdtTrc}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="usdtTrc"
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Wallet;
