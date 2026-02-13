import React, { useEffect, useState } from "react";
import { Card, Col, Input, Label, Row, Spinner } from "reactstrap";
import { FaToggleOn, FaToggleOff } from "react-icons/fa6";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { configureLimit } from "../../services/userSettings";
import { useParams } from "react-router-dom";
import ErrorToast from "../../Components/Common/ErrorToast";
import SuccessToast from "../../Components/Common/SuccessToast";

const Settings = ({ settings }) => {
  const { userId } = useParams();
  const [error, setError] = useState("");

  // useEffect(() => {
  //   if (settings) {
  //     console.log(settings);
  //   }
  // }, [settings]);

  const mutation = useMutation({
    mutationFn: configureLimit,
    onError: (err) => setError(err.message),
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      cashMessage: settings?.locks?.cash?.message || "",
      bankMessage: settings?.locks?.bankDeposit?.message || "",
      minCryptoDeposit: settings?.limits?.deposit?.crypto?.min || "",
      minBankDeposit: settings?.limits?.deposit?.bank?.min || "",
      maxCryptoDeposit: settings?.limits?.deposit?.crypto?.max || "",
      maxBankDeposit: settings?.limits?.deposit?.bank?.max || "",
      minCryptoWithdrawal: settings?.limits?.withdrawal?.crypto?.min || "",
      minBankWithdrawal: settings?.limits?.withdrawal?.bank?.min || "",
      maxCryptoWithdrawal: settings?.limits?.withdrawal?.crypto?.max || "",
      maxBankWithdrawal: settings?.limits?.withdrawal?.bank?.max || "",
    },
    onSubmit: (values) => {
      const formData = { ...values, userId };
      console.log(formData);
      mutation.mutate(formData);
    },
  });

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
          <hr />
          <div className="p-4 d-flex flex-column gap-3">
            <Row>
              <Col md={6}>
                <Label className="text-capitalize">min bank deposit</Label>
                <Input
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.minBankDeposit}
                  name="minBankDeposit"
                />
              </Col>
              <Col md={6}>
                <Label className="text-capitalize">min crypto deposit</Label>
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
                <Label className="text-capitalize">max bank deposit</Label>
                <Input
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.maxBankDeposit}
                  name="maxBankDeposit"
                />
              </Col>
              <Col md={6}>
                <Label className="text-capitalize">max crypto deposit</Label>
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
                <Label className="text-capitalize">min bank withdrawal</Label>
                <Input
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.minBankWithdrawal}
                  name="minBankWithdrawal"
                />
              </Col>
              <Col md={6}>
                <Label className="text-capitalize">min crypto withdrawal</Label>
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
                <Label className="text-capitalize">max bank withdrawal</Label>
                <Input
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.maxBankWithdrawal}
                  name="maxBankWithdrawal"
                />
              </Col>
              <Col md={6}>
                <Label className="text-capitalize">max crypto withdrawal</Label>
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
          <hr />
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
