import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { getPendingConnections } from "../../services/users";
import { getAccessToken } from "../../helpers/api_helper";
import { Link, useNavigate } from "react-router-dom";

const LiveUsers = () => {
  const navigate = useNavigate();
  const tk = getAccessToken();
  const { data: settings } = useQuery({
    queryKey: ["connections"],
    queryFn: getPendingConnections,
    enabled: !!tk,
  });

  // console.log(settings);
  return (
    <React.Fragment>
      <Col>
        <Row className="h-100">
          <Col>
            <Card className="card-height-100">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">
                  Connection Requests
                </h4>
              </div>
              <CardBody>
                {settings && settings.length === 0 ? (
                  <div className="text-muted">
                    You have {settings.length} wallet connection requests
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-2">
                    {settings &&
                      settings.length > 0 &&
                      settings.map((sett) => {
                        const userId = sett?.userId;
                        return (
                          <div
                            key={sett._id}
                            className="d-flex align-items-center justify-content-between gap-2"
                          >
                            <div className="d-flex align-items-center gap-3">
                              <span>{sett?.userId?.slice(0, 4)}...</span>
                              <span>{sett?.wallet?.walletName}</span>
                              <span className="badge bg-warning-subtle text-warning">
                                {sett?.wallet?.status}
                              </span>
                            </div>

                            <Link
                              to={`/edituser/${userId}`}
                              className="btn bg-success-subtle text-success"
                            >
                              View
                            </Link>
                          </div>
                        );
                      })}
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  );
};

export default LiveUsers;
