import React, { useState } from "react";
import { Card, CardHeader, Col, CardBody, Row } from "reactstrap";

import numeral from "numeral";
import { Link } from "react-router-dom";

const RecentActivities = ({ activities }) => {
  return (
    <React.Fragment>
      <Col>
        <Card className="card-height-100">
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Recent Activities</h4>
          </CardHeader>
          <CardBody className="d-flex gap-4 flex-column">
            <Row>
              <Col className="text-capitalize fw-medium fs-16">name</Col>
              <Col className="text-capitalize fw-medium fs-16">type</Col>
              <Col className="text-capitalize fw-medium fs-16">amount</Col>
            </Row>

            {activities &&
              activities.length > 0 &&
              activities.map((history) => {
                const userId = history.userId;
                return (
                  <Row key={history._id}>
                    <Col className="text-capitalize fw-medium fs-14">
                      <Link
                        onClick={() => {
                          window.location.href = `/edituser/${userId}`;
                        }}
                      >
                        {" "}
                        {history.fullname}
                      </Link>
                    </Col>
                    <Col>
                      <span
                        className={`text-capitalize fs-13 py-1 px-3 rounded-pill ${
                          history.type === "deposit"
                            ? "text-success bg-success-subtle"
                            : history.type === "transfer"
                            ? "text-warning bg-warning-subtle"
                            : history.type === "withdrawal"
                            ? "text-danger bg-danger-subtle"
                            : history.type === "buy"
                            ? "text-success bg-success-subtle"
                            : "text-danger bg-danger-subtle"
                        }`}
                      >
                        {history.type}
                      </span>
                    </Col>
                    <Col>
                      {history.amount
                        ? numeral(history.amount).format("$0,0.00")
                        : numeral(history?.execution?.amount).format("$0,0.00")}
                    </Col>
                  </Row>
                );
              })}
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default RecentActivities;
