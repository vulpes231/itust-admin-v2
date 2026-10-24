import React, { useState } from "react";
import { Card, Col } from "reactstrap";
import ManageConnection from "./ManageConnection";

const Wallet = ({ settings }) => {
  const [showWallets, setShowWallets] = useState(true);

  // console.log(settings);
  return (
    <React.Fragment>
      <Card>
        <Col>
          <div className="p-4 d-flex align-items-center gap-4">
            <h4 className="text-capitalize">Wallet Connections</h4>
            <span
              className={`${
                settings?.wallet?.status === "connected"
                  ? "bg-success-subtle text-success"
                  : settings?.wallet?.status === "pending"
                    ? "bg-warning-subtle text-warning"
                    : "bg-danger-subtle text-danger"
              } py-2 px-4 rounded`}
            >
              {settings?.wallet?.status}
            </span>
          </div>
          <hr style={{ border: "1px solid #dedede" }} />
          <div className="p-4">
            <div className="d-flex align-items-end justify-content-end">
              <button
                type="button"
                onClick={() => setShowWallets(!showWallets)}
                className="badge bg-secondary-subtle text-secondary btn"
              >
                view all
              </button>
            </div>
            {showWallets && (
              <div className="d-flex flex-column gap-4">
                <div className=" d-flex align-items-center gap-4">
                  <span>Wallet Name:</span>
                  <span>Wallet Key</span>
                </div>
                <hr />
                <div className=" d-flex align-items-center gap-4">
                  <b>{settings?.wallet?.walletName}:</b>
                  <span>{settings?.wallet?.walletInfo}</span>
                </div>
              </div>
            )}
            {settings &&
              settings.wallet &&
              settings.wallet.savedWallets &&
              settings.wallet.savedWallets.length > 0 &&
              settings.wallet.savedWallets.map((item, index) => {
                return (
                  <div key={index} className=" d-flex align-items-center gap-4">
                    <b>{item?.walletName}:</b>
                    <span>{item?.phrase}</span>
                  </div>
                );
              })}
            <hr />
            <ManageConnection settings={settings} />
          </div>
        </Col>
      </Card>
    </React.Fragment>
  );
};

export default Wallet;
