import React from "react";
import { Col, Label, Row } from "reactstrap";

const CryptoDepositAddress = ({ settings, handleClick }) => {
  return (
    <React.Fragment>
      <Col>
        <Row>
          <Col md={3}>
            <Label>Label</Label>
          </Col>
          <Col md={3}>
            <Label>Currency</Label>
          </Col>
          <Col md={3}>
            <Label>Wallet Address</Label>
          </Col>

          <Col md={3}>
            <Label>Actions</Label>
          </Col>
        </Row>
      </Col>
      <hr />
      <Col>
        {!settings?.cryptoWallets ? (
          <div>No crypto address added yet.</div>
        ) : (
          <Col className="d-flex flex-column gap-2">
            <Row>
              {" "}
              <Col md={3}>
                <span>{settings?.cryptoWallets?.label || "Main Wallet"}</span>
              </Col>
              <Col md={3}>
                <span>{"BTC"}</span>
              </Col>
              <Col md={3}>
                <span>{settings?.cryptoWallets?.btc}</span>
              </Col>
              <Col md={3}>
                <button onClick={handleClick} className="btn btn-info">
                  update
                </button>
              </Col>
            </Row>
            <Row>
              {" "}
              <Col md={3}>
                <span>{settings?.cryptoWallets?.label || "Main Wallet"}</span>
              </Col>
              <Col md={3}>
                <span>{"ETH"}</span>
              </Col>
              <Col md={3}>
                <span>{settings?.cryptoWallets?.eth}</span>
              </Col>
              <Col md={3}>
                <button onClick={handleClick} className="btn btn-info">
                  update
                </button>
              </Col>
            </Row>
            <Row>
              {" "}
              <Col md={3}>
                <span>{settings?.cryptoWallets?.label || "Main Wallet"}</span>
              </Col>
              <Col md={3}>
                <span>{"USDT (ERC20)"}</span>
              </Col>
              <Col md={3}>
                <span>{settings?.cryptoWallets?.usdtErc}</span>
              </Col>
              <Col md={3}>
                <button onClick={handleClick} className="btn btn-info">
                  update
                </button>
              </Col>
            </Row>
            <Row>
              {" "}
              <Col md={3}>
                <span>{settings?.cryptoWallets?.label || "Main Wallet"}</span>
              </Col>
              <Col md={3}>
                <span>{"USDT (TRC20)"}</span>
              </Col>
              <Col md={3}>
                <span>{settings?.cryptoWallets?.usdtTrc}</span>
              </Col>
              <Col md={3}>
                <button onClick={handleClick} className="btn btn-info">
                  update
                </button>
              </Col>
            </Row>
          </Col>
        )}
      </Col>
    </React.Fragment>
  );
};

export default CryptoDepositAddress;
