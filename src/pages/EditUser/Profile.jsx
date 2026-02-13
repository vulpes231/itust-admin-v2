import { capitalize } from "lodash";
import numeral, { Numeral } from "numeral";
import React, { useEffect } from "react";
import { Card, Label, Input, Row, Col } from "reactstrap";

const Profile = ({ user, accounts }) => {
  // useEffect(() => {
  //   if (accounts) console.log(accounts);
  // }, [accounts]);

  const brokerage =
    accounts && accounts.find((acct) => acct.name === "brokerage");
  const auto =
    accounts && accounts.find((acct) => acct.name === "automated investing");
  const cash = accounts && accounts.find((acct) => acct.name === "cash");

  const KYC_STATUS = user && user.identityVerification.kycStatus;
  const ACCOUNT_STATUS = user && user.accountStatus.status;
  return (
    <Card>
      <Col>
        <h4 className="p-4">Profile</h4>
        <hr />
        <div className="d-flex flex-column align-items-center">
          <span className="fw-bold fs-20">
            {capitalize(user?.name?.firstName)}{" "}
            {capitalize(user?.name?.lastName)}
          </span>
          <span>@{user?.credentials?.username}</span>
        </div>
      </Col>
      <Col className="px-3 py-3">
        <Row className="mb-3">
          <Col sm={7}>
            <Label className="fs-18 fw-normal">Email Address</Label>
            <Input
              type="text"
              readOnly
              value={user?.credentials?.email}
              className="fs-16"
            />
          </Col>
          <Col sm={5} className="d-flex flex-column">
            <span
              style={{ textTransform: "uppercase" }}
              className="fw-light fs-14 mt-4"
            >
              Cash Balance
            </span>
            <span className="fw-bold fs-20">
              {numeral(cash?.availableBalance).format("$0,0.00")}
            </span>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col sm={7}>
            <Label className="fs-18 fw-normal">Phone</Label>
            <Input
              type="text"
              readOnly
              value={user?.contactInfo?.phone}
              className="fs-16"
            />
          </Col>
          <Col sm={5} className="d-flex flex-column">
            <span
              style={{ textTransform: "uppercase" }}
              className="fw-light fs-14 mt-4"
            >
              Brokerage Balance
            </span>
            <span className="fw-bold fs-20">
              {numeral(brokerage?.availableBalance).format("$0,0.00")}
            </span>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col sm={7}>
            <Label className="fs-18 fw-normal">Country</Label>
            <Input
              type="text"
              readOnly
              value={
                user ? capitalize(user?.locationDetails?.country?.name) : null
              }
              className="fs-16"
            />
          </Col>
          <Col sm={5} className="d-flex flex-column">
            <spa
              style={{ textTransform: "uppercase" }}
              className="fw-light fs-14 mt-4"
            >
              Auto Balance
            </spa>
            <span className="fw-bold fs-20">
              {numeral(auto?.availableBalance).format("$0,0.00")}
            </span>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col sm={7}>
            <Label className="fs-18 fw-normal">Currency</Label>
            <Input
              type="text"
              readOnly
              value={user?.locationDetails?.currency?.name}
              className="fs-16"
            />
          </Col>
          <Col sm={5} className="d-flex flex-column">
            <span
              style={{ textTransform: "uppercase" }}
              className="fw-light fs-14 mt-4"
            >
              Savings Balance
            </span>
            <span className="fw-bold fs-20">$0.00</span>
          </Col>
        </Row>
      </Col>
      <Col className="px-3 mb-3 d-flex flex-column gap-3">
        <div className="d-flex gap-3 align-items-center">
          <span className="fs-18 fw-normal">Status</span>
          <span
            className={`${
              ACCOUNT_STATUS === "active"
                ? "bg-success-subtle text-success"
                : ACCOUNT_STATUS === "active"
                ? "bg-danger-subtle text-danger"
                : ACCOUNT_STATUS === "review"
                ? "bg-warning-subtle text-warning"
                : null
            } py-1 px-3 rounded fs-14 fw-medium`}
          >
            {user && capitalize(user?.accountStatus?.status)}
          </span>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <span className="fs-18 fw-normal">KYC</span>
          <span
            className={`${
              KYC_STATUS === "approved"
                ? "bg-success-subtle text-success"
                : KYC_STATUS === "rejected"
                ? "bg-danger-subtle text-danger"
                : KYC_STATUS === "pending"
                ? "bg-warning-subtle text-warning"
                : "bg-info-subtle text-info"
            } py-1 px-3 rounded fs-14 fw-medium`}
          >
            {user && capitalize(user?.identityVerification?.kycStatus)}
          </span>
        </div>
        <div className="d-flex gap-3 align-items-center mb-3">
          <span className="fs-18 fw-normal">ID</span>
          <span className="bg-info-subtle text-info py-1 px-3 fs-14 fw-medium">
            {user
              ? capitalize(user?.identityVerification?.idType)
              : "--000-000--000"}
          </span>
        </div>
      </Col>
    </Card>
  );
};

export default Profile;
