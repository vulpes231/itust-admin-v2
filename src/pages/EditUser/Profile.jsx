import { useMutation, useQuery } from "@tanstack/react-query";
import { capitalize } from "lodash";
import numeral, { Numeral } from "numeral";
import React, { useEffect, useState } from "react";
import { Card, Label, Input, Row, Col, Spinner } from "reactstrap";
import { getUserVerifyInfo } from "../../services/users";
import { devServer, liveServer } from "../../config";
import { verifyuserAccount } from "../../services/verification";
import SuccessToast from "../../Components/Common/SuccessToast";
import ErrorToast from "../../Components/Common/ErrorToast";

const Profile = ({ user, accounts }) => {
  // useEffect(() => {
  //   if (accounts) console.log(accounts);
  // }, [accounts]);

  const [error, setError] = useState("");

  const { data: verifyInfo } = useQuery({
    queryKey: ["verifyData"],
    queryFn: () => getUserVerifyInfo(user?._id),
  });

  const approveMutation = useMutation({
    mutationFn: verifyuserAccount,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
  });

  const acceptVerfication = () => {
    if (!verifyInfo || !user) {
      setError("Verification Info required!");
      return;
    }
    const verifyId = verifyInfo._id;
    const userId = user._id;
    const data = { verifyId, userId };
    approveMutation.mutate(data);
  };

  const brokerage =
    accounts && accounts.find((acct) => acct.slug === "brokerage");
  const auto = accounts && accounts.find((acct) => acct.slug === "auto");
  const cash = accounts && accounts.find((acct) => acct.slug === "cash");

  const KYC_STATUS = user && user.identityVerification.kycStatus;
  const ACCOUNT_STATUS = user && user.accountStatus.status;

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [error]);
  return (
    <Card>
      <Col>
        <h4 className="p-4">Profile</h4>
        <hr style={{ border: "1px solid #dedede" }} />
        <div className="d-flex flex-column align-items-center">
          <span className="fw-bold fs-20 text-capitalize">
            {user?.personalInfo?.firstName} {user?.personalInfo?.lastName}
          </span>
          <span>@{user?.personalInfo?.username}</span>
        </div>
      </Col>
      <Col className="px-3 py-3">
        <Row className="mb-3">
          <Col sm={7}>
            <Label className="fs-18 fw-normal">Email Address</Label>
            <Input
              type="text"
              readOnly
              value={user?.contactInfo?.email}
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
              value={user ? user?.contactInfo?.country?.name : null}
              className="fs-16 text-capitalize"
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
              value={user?.currency?.name}
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
          <span className="bg-secondary-subtle text-secondary py-1 px-3 fs-14 fw-medium text-capitalize">
            {user?.identityVerification?.idType
              ? user?.identityVerification?.idType
              : "--000-000--000"}
          </span>
        </div>
        <div>
          {user?.identityVerification?.kycStatus === "pending" && (
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center gap-2">
                <img
                  className="border border-1 rounded-1"
                  style={{
                    width: verifyInfo?.backId ? "100%" : "50%",
                    height: "100px",
                  }}
                  src={`${liveServer}${verifyInfo?.frontId}`}
                  alt="ID Image"
                  // width={100}
                />
                {verifyInfo?.backId && (
                  <img
                    className="border border-1 rounded-1"
                    style={{ width: "100%", height: "100px" }}
                    src={`${liveServer}${verifyInfo?.backId}`}
                    alt="ID Image"
                    // width={100}
                  />
                )}
              </div>
              <div className="d-flex gap-2">
                <button
                  onClick={acceptVerfication}
                  className="btn btn-secondary w-100 d-flex align-items-center justify-content-center gap-2"
                >
                  {approveMutation.isPending && <Spinner size={"sm"} />}
                  Approve
                </button>
                <button className="btn btn-danger w-100">Reject</button>
              </div>
            </div>
          )}
        </div>
      </Col>
      {approveMutation.isSuccess && (
        <SuccessToast
          msg={"Verification approved."}
          onClose={() => approveMutation.reset()}
        />
      )}
      {error && <ErrorToast errMsg={error} onClose={() => setError("")} />}
    </Card>
  );
};

export default Profile;
