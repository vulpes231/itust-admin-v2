import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Spinner } from "reactstrap";
import Bank from "./Bank";
import Wallet from "./Wallet";
import Limits from "./Limits";
import { useMutation } from "@tanstack/react-query";
import {
  updateBank,
  updateLimit,
  updateWallet,
} from "../../services/generalSettings";
import ErrorToast from "../../Components/Common/ErrorToast";
import SuccessToast from "../../Components/Common/SuccessToast";

const General = ({ settings }) => {
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const walletMutation = useMutation({
    mutationFn: updateWallet,
    onError: (err) => setError(err.message),
  });

  const bankMutation = useMutation({
    mutationFn: updateBank,
    onError: (err) => setError(err.message),
  });

  const limitMutation = useMutation({
    mutationFn: updateLimit,
    onError: (err) => setError(err.message),
  });

  const walletValidation = useFormik({
    enableReinitialize: true,
    initialValues: {
      btc: settings?.cryptoWallets?.btc || "",
      eth: settings?.cryptoWallets?.eth || "",
      usdtErc: settings?.cryptoWallets?.usdtErc || "",
      usdtTrc: settings?.cryptoWallets?.usdtTrc || "",
    },
    onSubmit: (values) => {
      console.log(values);
      walletMutation.mutate(values);
    },
  });

  const bankValidation = useFormik({
    enableReinitialize: true,
    initialValues: {
      bankName: settings?.bankDetails?.bankName || "",
      accountNumber: settings?.bankDetails?.accountNumber || "",
      routing: settings?.bankDetails?.routing || "",
      accountName: settings?.bankDetails?.accountName || "",
      address: settings?.bankDetails?.address || "",
      reference: settings?.bankDetails?.reference || "",
    },
    onSubmit: (values) => {
      console.log(values);
      bankMutation.mutate(values);
    },
  });

  const limitValidation = useFormik({
    enableReinitialize: true,
    initialValues: {
      minCryptoDeposit: settings?.depositLimits?.crypto?.min || "",
      minBankDeposit: settings?.depositLimits?.bank?.min || "",
      maxCryptoDeposit: settings?.depositLimits?.crypto?.max || "",
      maxBankDeposit: settings?.depositLimits?.bank?.max || "",
      minCryptoWithdrawal: settings?.withdrawalLimits?.crypto?.min || "",
      minBankWithdrawal: settings?.withdrawalLimits?.bank?.min || "",
      maxCryptoWithdrawal: settings?.withdrawalLimits?.crypto?.max || "",
      maxBankWithdrawal: settings?.withdrawalLimits?.bank?.max || "",
    },
    onSubmit: (values) => {
      console.log(values);
      limitMutation.mutate(values);
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
    if (
      limitMutation.isSuccess ||
      bankMutation.isSuccess ||
      walletMutation.isSuccess
    ) {
      setIsSuccess(true);
      const tmt = setTimeout(() => {
        limitMutation.reset();
        bankMutation.reset();
        walletMutation.reset();
        setIsSuccess(false);
        window.location.reload();
      }, 3000);

      return () => clearTimeout(tmt);
    }
  }, [
    limitMutation.isSuccess,
    bankMutation.isSuccess,
    walletMutation.isSuccess,
  ]);

  return (
    <React.Fragment>
      <Card className="mb-3">
        <CardHeader>
          <h5>General</h5>
        </CardHeader>
        <CardBody>
          <Col className="mb-5">
            <Wallet validation={walletValidation} />

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                walletValidation.submitForm();
              }}
              className="btn btn-info mt-3"
            >
              {walletMutation.isPending ? (
                <Spinner size="sm" className="me-2">
                  Loading...
                </Spinner>
              ) : (
                "Update Wallet"
              )}
            </button>
          </Col>

          <Col className="mb-5">
            <Bank validation={bankValidation} />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                bankValidation.submitForm();
              }}
              className="btn btn-info mt-3"
            >
              {bankMutation.isPending ? (
                <Spinner size="sm" className="me-2">
                  Loading...
                </Spinner>
              ) : (
                " Update Bank"
              )}
            </button>
          </Col>

          <Col className="mt-5">
            <Limits validation={limitValidation} />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                limitValidation.submitForm();
              }}
              className="mt-3 btn btn-info"
              disabled={limitMutation.isPending}
            >
              {limitMutation.isPending ? (
                <Spinner size="sm" className="me-2">
                  Loading...
                </Spinner>
              ) : (
                " Update Limits"
              )}
            </button>
          </Col>
        </CardBody>
      </Card>
      {error && (
        <ErrorToast
          errMsg={error}
          onClose={() => setError("")}
          isOpen={!!error}
        />
      )}
      {isSuccess && (
        <SuccessToast
          msg={"Update Successful"}
          onClose={() => setError("")}
          isOpen={isSuccess}
        />
      )}
    </React.Fragment>
  );
};

export default General;
