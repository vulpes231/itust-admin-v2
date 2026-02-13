import React, { useEffect } from "react";
import { Card, Col, Input, Label, Row } from "reactstrap";
import { FaToggleOn, FaToggleOff } from "react-icons/fa6";

const Settings = ({ settings }) => {
  // useEffect(() => {
  //   if (settings) {
  //     console.log(settings);
  //   }
  // }, [settings]);
  return (
    <React.Fragment>
      <Card>
        <Col>
          <h4 className="text-capitalize p-4">User Settings</h4>
          <hr />
          <div className="p-4 d-flex flex-column gap-3">
            <Row>
              <Col md={6}>
                <Label className="text-capitalize">min bank deposit</Label>
                <Input type="text" />
              </Col>
              <Col md={6}>
                <Label className="text-capitalize">min crypto deposit</Label>
                <Input type="text" />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label className="text-capitalize">max bank deposit</Label>
                <Input type="text" />
              </Col>
              <Col md={6}>
                <Label className="text-capitalize">max crypto deposit</Label>
                <Input type="text" />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label className="text-capitalize">min bank withdrawal</Label>
                <Input type="text" />
              </Col>
              <Col md={6}>
                <Label className="text-capitalize">min crypto withdrawal</Label>
                <Input type="text" />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label className="text-capitalize">max bank withdrawal</Label>
                <Input type="text" />
              </Col>
              <Col md={6}>
                <Label className="text-capitalize">max crypto withdrawal</Label>
                <Input type="text" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="text-capitalize">bank locked message</Label>
                <Input type="text" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="text-capitalize">cash locked message</Label>
                <Input type="text" />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label className="text-capitalize">connected wallet</Label>
                <Input type="text" />
              </Col>
              <Col md={6}>
                <Label className="text-capitalize">wallet phrase</Label>
                <Input type="text" />
              </Col>
            </Row>
            <Row>
              <Col md={6} className="d-flex flex-column gap-2">
                <Label className="text-capitalize">lock bank</Label>
                <FaToggleOff size={24} />
              </Col>
              <Col md={6} className="d-flex flex-column gap-2">
                <Label className="text-capitalize">lock cash</Label>
                <FaToggleOff size={24} />
              </Col>
            </Row>
          </div>
          <hr />
          <div className="p-4 d-flex align-items-center justify-content-end">
            <button className="btn btn-primary">Update Settings</button>
          </div>
        </Col>
      </Card>
    </React.Fragment>
  );
};

export default Settings;
