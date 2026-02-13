import React, { useState } from "react";
import { Card, Col, TabContent, TabPane } from "reactstrap";
import AddBankModal from "./AddBankModal";
import AddCryptoModal from "./AddCryptoModal";
import Bank from "./Bank";
import CryptoDepositAddress from "./CryptoDepositAddress";

const DepositDetails = ({ settings }) => {
  const [activeTab, setActiveTab] = useState("bank");
  const [showBankModal, setShowBankModal] = useState(false);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
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
              <button
                onClick={() => setShowBankModal(true)}
                className="btn btn-success"
                type="button"
              >
                Add Bank Accounts
              </button>
              <button
                onClick={() => setShowCryptoModal(true)}
                className="btn btn-success"
                type="button"
              >
                Add Crypto Wallet
              </button>
            </span>
          </div>
          <hr />
          <TabContent activeTab={activeTab}>
            <TabPane tabId={"bank"}>
              <Col>
                <Bank
                  settings={settings}
                  handleClick={() => setShowBankModal(true)}
                />
              </Col>
            </TabPane>
            <TabPane tabId={"crypto"}>
              <Col>
                <CryptoDepositAddress
                  settings={settings}
                  handleClick={() => setShowCryptoModal(true)}
                />
              </Col>
            </TabPane>
          </TabContent>
        </Col>
      </Card>
      {showBankModal && (
        <AddBankModal
          isOpen={showBankModal}
          handleToggle={() => setShowBankModal(false)}
          settings={settings}
        />
      )}
      {showCryptoModal && (
        <AddCryptoModal
          isOpen={showCryptoModal}
          handleToggle={() => setShowCryptoModal(false)}
        />
      )}
    </React.Fragment>
  );
};

export default DepositDetails;
