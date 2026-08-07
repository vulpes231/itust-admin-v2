import React from "react";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import { Col, Input, Label, Row } from "reactstrap";

const Limits = ({ validation, toggleUnlimited }) => {
  return (
    <React.Fragment>
      <Row>
        <Col md={6}>
          <div className="d-flex justify-content-between">
            <Label>Minimum Crypto Deposit</Label>
            <span onClick={() => toggleUnlimited("minCryptoDeposit")}>
              Unlimited:
              {validation.values.minCryptoDeposit === "unlimited" ? (
                <MdToggleOn size={30} className="text-success" />
              ) : (
                <MdToggleOff size={30} className="text-muted" />
              )}
            </span>
          </div>

          <Input
            type="text"
            value={validation.values.minCryptoDeposit}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="minCryptoDeposit"
          />
        </Col>
        <Col md={6}>
          <div className="d-flex justify-content-between">
            <Label>Minimum Bank Deposit</Label>
            <span onClick={() => toggleUnlimited("minBankDeposit")}>
              Unlimited:
              {validation.values.minBankDeposit === "unlimited" ? (
                <MdToggleOn size={30} className="text-success" />
              ) : (
                <MdToggleOff size={30} className="text-muted" />
              )}
            </span>
          </div>

          <Input
            type="text"
            value={validation.values.minBankDeposit}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="minBankDeposit"
          />
        </Col>
        <Col md={6}>
          <div className="d-flex justify-content-between">
            <Label>Maximum Crypto Deposit</Label>
            <span onClick={() => toggleUnlimited("maxCryptoDeposit")}>
              Unlimited:
              {validation.values.maxCryptoDeposit === "unlimited" ? (
                <MdToggleOn size={30} className="text-success" />
              ) : (
                <MdToggleOff size={30} className="text-muted" />
              )}
            </span>
          </div>

          <Input
            type="text"
            value={validation.values.maxCryptoDeposit}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="maxCryptoDeposit"
          />
        </Col>
        <Col md={6}>
          <div className="d-flex justify-content-between">
            <Label>Maximum Bank Deposit</Label>
            <span onClick={() => toggleUnlimited("maxBankDeposit")}>
              Unlimited:
              {validation.values.maxBankDeposit === "unlimited" ? (
                <MdToggleOn size={30} className="text-success" />
              ) : (
                <MdToggleOff size={30} className="text-muted" />
              )}
            </span>
          </div>

          <Input
            type="text"
            value={validation.values.maxBankDeposit}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="maxBankDeposit"
          />
        </Col>
        <Col md={6}>
          <div className="d-flex justify-content-between">
            <Label>Minimum Crypto Withdrawal</Label>
            <span onClick={() => toggleUnlimited("minCryptoWithdrawal")}>
              Unlimited:
              {validation.values.minCryptoWithdrawal === "unlimited" ? (
                <MdToggleOn size={30} className="text-success" />
              ) : (
                <MdToggleOff size={30} className="text-muted" />
              )}
            </span>
          </div>

          <Input
            type="text"
            value={validation.values.minCryptoWithdrawal}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="minCryptoWithdrawal"
          />
        </Col>
        <Col md={6}>
          <div className="d-flex justify-content-between">
            <Label>Minimum Bank Withdrawal</Label>
            <span onClick={() => toggleUnlimited("minBankWithdrawal")}>
              Unlimited:
              {validation.values.minBankWithdrawal === "unlimited" ? (
                <MdToggleOn size={30} className="text-success" />
              ) : (
                <MdToggleOff size={30} className="text-muted" />
              )}
            </span>
          </div>

          <Input
            type="text"
            value={validation.values.minBankWithdrawal}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="minBankWithdrawal"
          />
        </Col>
        <Col md={6}>
          <div className="d-flex justify-content-between">
            <Label>Maximum Crypto Withdrawal</Label>
            <span onClick={() => toggleUnlimited("maxCryptoWithdrawal")}>
              Unlimited:
              {validation.values.maxCryptoWithdrawal === "unlimited" ? (
                <MdToggleOn size={30} className="text-success" />
              ) : (
                <MdToggleOff size={30} className="text-muted" />
              )}
            </span>
          </div>
          <Input
            type="text"
            value={validation.values.maxCryptoWithdrawal}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="maxCryptoWithdrawal"
          />
        </Col>
        <Col md={6}>
          <div className="d-flex justify-content-between">
            <Label>Maximum Bank Withdrawal</Label>
            <span onClick={() => toggleUnlimited("maxBankWithdrawal")}>
              Unlimited:
              {validation.values.maxBankWithdrawal === "unlimited" ? (
                <MdToggleOn size={30} className="text-success" />
              ) : (
                <MdToggleOff size={30} className="text-muted" />
              )}
            </span>
          </div>

          <Input
            type="text"
            value={validation.values.maxBankWithdrawal}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            name="maxBankWithdrawal"
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Limits;
