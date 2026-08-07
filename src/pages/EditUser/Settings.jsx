import React, { useEffect, useState } from "react";
import { Card, Col, Input, Label, Row, Spinner } from "reactstrap";
import { FaToggleOn, FaToggleOff } from "react-icons/fa6";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { configureLimit } from "../../services/userSettings";
import { useParams } from "react-router-dom";
import ErrorToast from "../../Components/Common/ErrorToast";
import SuccessToast from "../../Components/Common/SuccessToast";

import { MdToggleOff, MdToggleOn } from "react-icons/md";

const Settings = ({ settings }) => {
  const { userId } = useParams();
  const [error, setError] = useState("");
  // bank
  const [minBDUnlimited, setMinBDUnlimited] = useState(false);
  const [maxBDUnlimited, setMaxBDUnlimited] = useState(false);
  const [minBWUnlimited, setMinBWUnlimited] = useState(false);
  const [maxBWUnlimited, setMaxBWUnlimited] = useState(false);
  // crypto
  const [minCDUnlimited, setMinCDUnlimited] = useState(false);
  const [maxCDUnlimited, setMaxCDUnlimited] = useState(false);
  const [minCWUnlimited, setMinCWUnlimited] = useState(false);
  const [maxCWUnlimited, setMaxCWUnlimited] = useState(false);

  const mutation = useMutation({
    mutationFn: configureLimit,
    onError: (err) => setError(err.message),
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      cashMessage: settings?.locks?.cash?.message || "",
      bankMessage: settings?.locks?.bankDeposit?.message || "",

      minBankDeposit:
        settings?.limits?.deposit?.bank?.min === null
          ? "unlimited"
          : (settings?.limits?.deposit?.bank?.min ?? ""),
      maxBankDeposit:
        settings?.limits?.deposit?.bank?.max === null
          ? "unlimited"
          : (settings?.limits?.deposit?.bank?.max ?? ""),
      minCryptoDeposit:
        settings?.limits?.deposit?.crypto?.min === null
          ? "unlimited"
          : (settings?.limits?.deposit?.crypto?.min ?? ""),
      maxCryptoDeposit:
        settings?.limits?.deposit?.crypto?.max === null
          ? "unlimited"
          : (settings?.limits?.deposit?.crypto?.max ?? ""),

      minCryptoWithdrawal:
        settings?.limits?.withdrawal?.crypto?.min === null
          ? "unlimited"
          : (settings?.limits?.withdrawal?.crypto?.min ?? ""),
      maxCryptoWithdrawal:
        settings?.limits?.withdrawal?.crypto?.max === null
          ? "unlimited"
          : (settings?.limits?.withdrawal?.crypto?.max ?? ""),
      minBankWithdrawal:
        settings?.limits?.withdrawal?.bank?.min === null
          ? "unlimited"
          : (settings?.limits?.withdrawal?.bank?.min ?? ""),
      maxBankWithdrawal:
        settings?.limits?.withdrawal?.bank?.max === null
          ? "unlimited"
          : (settings?.limits?.withdrawal?.bank?.max ?? ""),
    },
    onSubmit: (values) => {
      const changedFields = Object.keys(values).reduce((acc, key) => {
        if (values[key] !== validation.initialValues[key]) {
          acc[key] = values[key];
        }
        return acc;
      }, {});

      // Don't send request if nothing changed
      if (Object.keys(changedFields).length === 0) {
        return;
      }

      changedFields.userId = userId;

      console.log(changedFields);
      mutation.mutate(changedFields);
    },
  });

  const toggleUnlimited = (field) => {
    const current = validation.values[field];

    validation.setFieldValue(field, current === "unlimited" ? "" : "unlimited");
  };

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [error]);

  useEffect(() => {
    if (mutation.isSuccess) {
      const tmt = setTimeout(() => {
        mutation.reset();
        window.location.reload();
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [mutation.isSuccess]);
  return (
    <React.Fragment>
      <Card>
        <Col>
          <h4 className="text-capitalize p-4">User Settings</h4>
          <hr style={{ border: "1px solid #dedede" }} />
          <div className="p-4 d-flex flex-column gap-3">
            <Row>
              <Col md={6}>
                <div className="d-flex justify-content-between">
                  <Label className="text-capitalize">min bank deposit</Label>
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
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.minBankDeposit}
                  name="minBankDeposit"
                />
              </Col>
              <Col md={6}>
                <div className="d-flex justify-content-between">
                  <Label className="text-capitalize">min crypto deposit</Label>
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
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.minCryptoDeposit}
                  name="minCryptoDeposit"
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="d-flex justify-content-between">
                  <Label className="text-capitalize">max bank deposit</Label>
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
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.maxBankDeposit}
                  name="maxBankDeposit"
                />
              </Col>
              <Col md={6}>
                <div className="d-flex justify-content-between">
                  <Label className="text-capitalize">max crypto deposit</Label>
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
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.maxCryptoDeposit}
                  name="maxCryptoDeposit"
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="d-flex justify-content-between">
                  <Label className="text-capitalize">min bank withdrawal</Label>
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
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.minBankWithdrawal}
                  name="minBankWithdrawal"
                />
              </Col>
              <Col md={6}>
                <div className="d-flex justify-content-between">
                  <Label className="text-capitalize">
                    min crypto withdrawal
                  </Label>
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
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.minCryptoWithdrawal}
                  name="minCryptoWithdrawal"
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="d-flex justify-content-between">
                  <Label className="text-capitalize">max bank withdrawal</Label>
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
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.maxBankWithdrawal}
                  name="maxBankWithdrawal"
                />
              </Col>
              <Col md={6}>
                <div className="d-flex justify-content-between">
                  <Label className="text-capitalize">
                    max crypto withdrawal
                  </Label>
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
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.maxCryptoWithdrawal}
                  name="maxCryptoWithdrawal"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="text-capitalize">bank locked message</Label>
                <Input
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.bankMessage}
                  name="bankMessage"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="text-capitalize">cash locked message</Label>
                <Input
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.cashMessage}
                  name="cashMessage"
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label className="text-capitalize">connected wallet</Label>
                <Input type="text" />
              </Col>
              <Col md={6}>
                <Label className="text-capitalize">wallet phrase</Label>
                <Input type="text" />
              </Col>
            </Row>
            <Row>
              <Col md={6} className="d-flex flex-column gap-2">
                <Label className="text-capitalize">lock bank</Label>
                {settings?.locks?.bankDeposit?.isLocked ? (
                  <FaToggleOn size={24} />
                ) : (
                  <FaToggleOff size={24} />
                )}
              </Col>
              <Col md={6} className="d-flex flex-column gap-2">
                <Label className="text-capitalize">lock cash</Label>
                {settings?.locks?.cash?.isLocked ? (
                  <FaToggleOn size={24} />
                ) : (
                  <FaToggleOff size={24} />
                )}
              </Col>
            </Row>
          </div>
          <hr style={{ border: "1px solid #dedede" }} />
          <div className="p-4 d-flex align-items-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                validation.submitForm();
              }}
              type="button"
              className="btn btn-primary"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <Spinner>Loading...</Spinner>
              ) : (
                "Update Settings"
              )}
            </button>
          </div>
        </Col>
      </Card>
      {error && (
        <ErrorToast
          errMsg={error}
          isOpen={!!error}
          onClose={() => setError("")}
        />
      )}
      {mutation.isSuccess && (
        <SuccessToast
          isOpen={mutation.isSuccess}
          msg={"Information Updated."}
          onClose={() => mutation.reset()}
        />
      )}
    </React.Fragment>
  );
};

export default Settings;
