import React from "react";
import { Col, Label, Row } from "reactstrap";

const Bank = ({ settings, handleClick }) => {
  return (
    <React.Fragment>
      <Col>
        <Row>
          <Col md={3}>
            <Label>Label</Label>
          </Col>
          <Col md={3}>
            <Label>Bank Name</Label>
          </Col>
          <Col md={2}>
            <Label>Account Number</Label>
          </Col>
          <Col md={2}>
            <Label>Account Name</Label>
          </Col>
          <Col md={2}>
            <Label>Actions</Label>
          </Col>
        </Row>
      </Col>
      <hr />
      <Col>
        {!settings?.bankDetails ? (
          <div>No deposit bank account added yet.</div>
        ) : (
          <Row>
            {" "}
            <Col md={3}>
              <span>{settings?.bankDetails?.label || "Main Account"}</span>
            </Col>
            <Col md={3}>
              <span>{settings?.bankDetails?.bankName}</span>
            </Col>
            <Col md={2}>
              <span>{settings?.bankDetails?.accountNumber}</span>
            </Col>
            <Col md={2}>
              <span>{settings?.bankDetails?.accountName}</span>
            </Col>
            <Col md={2}>
              <button onClick={handleClick} className="btn btn-info">
                update
              </button>
            </Col>
          </Row>
        )}
      </Col>
    </React.Fragment>
  );
};

export default Bank;
