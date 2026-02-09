import React from "react";
import { Card, CardBody, CardHeader, Col, Input, Label } from "reactstrap";
import { format } from "date-fns";

const Info = ({ settings }) => {
  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <h5>Config</h5>
        </CardHeader>

        <CardBody>
          <Col>
            <Label>Last Updated</Label>
            <Input
              type="text"
              readOnly
              value={format(settings?.updatedAt, "dd MMM, yyyy hh:mm a")}
            />

            <button className="mt-3 btn btn-warning">Clear Cache</button>
          </Col>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Info;
