import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import CountUp from "react-countup";

//Import Icons
import FeatherIcon from "feather-icons-react";

const Widget = ({ info }) => {
  return (
    <React.Fragment>
      <Col>
        <Col>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="fw-medium text-muted mb-0">Users</p>
                  <h2 className="mt-4 ff-secondary fw-semibold">
                    <span className="counter-value">
                      <CountUp
                        start={0}
                        end={info?.users ?? 0}
                        // decimals={1}
                        duration={4}
                      />
                    </span>
                  </h2>
                  <p className="mb-0 text-muted">
                    <span className="badge bg-light text-success mb-0">
                      <i className="ri-arrow-up-line align-middle"></i> 16.24 %
                    </span>{" "}
                    vs. previous month
                  </p>
                </div>
                <div>
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-info-subtle rounded-circle fs-2">
                      <FeatherIcon icon="users" className="text-info" />
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="fw-medium text-muted mb-0">Transactions</p>
                  <h2 className="mt-4 ff-secondary fw-semibold">
                    $
                    <span className="counter-value" data-target="97.66">
                      <CountUp
                        start={0}
                        end={info?.transactions ?? 0}
                        decimals={2}
                        duration={4}
                      />
                    </span>
                    k
                  </h2>
                  <p className="mb-0 text-muted">
                    <span className="badge bg-light text-danger mb-0">
                      <i className="ri-arrow-down-line align-middle"></i> 3.96 %
                    </span>{" "}
                    vs. previous month
                  </p>
                </div>
                <div>
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-info-subtle rounded-circle fs-2">
                      <FeatherIcon icon="activity" className="text-info" />
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="fw-medium text-muted mb-0">Trades</p>
                  <h2 className="mt-4 ff-secondary fw-semibold">
                    $
                    <span className="counter-value" data-target="97.66">
                      <CountUp
                        start={0}
                        end={info?.trades ?? 0}
                        decimals={2}
                        duration={4}
                      />
                      k
                    </span>
                  </h2>
                  <p className="mb-0 text-muted">
                    <span className="badge bg-light text-danger mb-0">
                      <i className="ri-arrow-down-line align-middle"></i> 0.24 %
                    </span>{" "}
                    vs. previous month
                  </p>
                </div>
                <div>
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-info-subtle rounded-circle fs-2">
                      <FeatherIcon icon="clock" className="text-info" />
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Col>
    </React.Fragment>
  );
};

export default Widget;
