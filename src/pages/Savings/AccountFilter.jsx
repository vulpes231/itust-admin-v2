import React from "react";
import { Col, Input, Row } from "reactstrap";

const AccountFilter = ({ savingsAccounts }) => {
  return (
    <Row className="d-flex align-items-center justify-content-end p-2">
      <Col md={4}>
        <Input type="text" placeholder="Search Accounts..." />
      </Col>
    </Row>
  );
};

export default AccountFilter;
