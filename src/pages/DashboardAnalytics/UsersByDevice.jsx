import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, Col, CardBody, Row } from "reactstrap";
import { avatar1 } from "../../assets";

const UsersByDevice = ({ users }) => {
  return (
    <React.Fragment>
      <Col>
        <Card className="card-height-100">
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">New Users</h4>
          </CardHeader>
          <CardBody>
            <div className="p-2 d-flex flex-column gap-3">
              {users &&
                users.length > 0 &&
                users.map((user) => {
                  // const userId = user._id;
                  return (
                    <Row key={user._id} className="border rounded-2 p-2">
                      <Col className="text-capitalize fw-medium fs-14">
                        <div className="d-flex align-items-center gap-4">
                          <img
                            src={avatar1}
                            alt=""
                            width={40}
                            className="rounded-circle"
                          />
                          <div>
                            <span
                              className="d-flex align-items-center gap-2"
                              // onClick={() => {
                              //   window.location.href = `/edituser/${userId}`;
                              // }}
                            >
                              <span>{user.personalInfo.firstName}</span>
                              <span> {user.personalInfo.lastName}</span>
                            </span>
                            <span className="fs-13 fw-light">
                              {user.contactInfo.country.name}
                            </span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  );
                })}
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default UsersByDevice;
