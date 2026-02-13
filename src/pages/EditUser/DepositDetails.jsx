import { Tab } from "bootstrap";
import React, { useState } from "react";
import { Card, Col, TabContent, TabPane } from "reactstrap";

const DepositDetails = () => {
  const [activeTab, setActiveTab] = useState("bank");
  return (
    <React.Fragment>
      <Card>
        <Col className="p-4">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="text-capitalize">deposit details</h4>
            <span className="d-flex align-items-center gap-3">
              <span
                onClick={() => {
                  setActiveTab("bank");
                }}
                className={`py-2 px-4 fs-18`}
                style={{
                  borderBottom: activeTab === "bank" ? "solid 2px black" : "",
                  cursor: "pointer",
                  color: activeTab === "bank" ? "black" : "grey",
                }}
              >
                Bank Accounts
              </span>
              <span
                onClick={() => {
                  setActiveTab("crypto");
                }}
                className={`py-2 px-4 fs-18`}
                style={{
                  borderBottom: activeTab === "crypto" ? "solid 2px black" : "",
                  cursor: "pointer",
                  color: activeTab === "crypto" ? "black" : "grey",
                }}
              >
                Crypto Wallets
              </span>
            </span>
            <span className="d-flex align-items-center gap-3">
              <button className="btn btn-success" type="button">
                Add Bank Accounts
              </button>
              <button className="btn btn-success" type="button">
                Add Crypto Wallet
              </button>
            </span>
          </div>
          <hr />
          <TabContent activeTab={activeTab}>
            <TabPane tabId={"bank"}>
              <Col>
                <span>Bank Accounts</span>
              </Col>
            </TabPane>
            <TabPane tabId={"crypto"}>
              <Col>
                <span>Crypto Wallets</span>
              </Col>
            </TabPane>
          </TabContent>
        </Col>
      </Card>
    </React.Fragment>
  );
};

export default DepositDetails;
