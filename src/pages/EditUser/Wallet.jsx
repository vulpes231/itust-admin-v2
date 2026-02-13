import React from "react";
import { Card, Col } from "reactstrap";

const Wallet = ({ settings }) => {
  return (
    <React.Fragment>
      <Card>
        <Col>
          <div className="p-4 d-flex align-items-center gap-4">
            <h4 className="text-capitalize">Wallet Connections</h4>
            <span
              className={`${
                settings?.wallet?.isConnected
                  ? "bg-success-subtle text-success"
                  : "bg-danger-subtle text-danger"
              } py-2 px-4 rounded`}
            >
              {settings?.wallet?.isConnected ? "Activated" : "Deactivated"}
            </span>
          </div>
          <hr />
          <div className="p-4">
            <span>User has no connected wallets.</span>
          </div>
          <div className="p-4 d-flex align-items-center">
            <button className="btn btn-primary">Activate Wallet</button>
          </div>
        </Col>
      </Card>
    </React.Fragment>
  );
};

export default Wallet;
