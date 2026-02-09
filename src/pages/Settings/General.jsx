import { useFormik } from "formik";
import React, { useState } from "react";
import { Card, CardBody, CardHeader, Col, Input, Label, Row } from "reactstrap";
import Bank from "./Bank";
import Wallet from "./Wallet";
import Limits from "./Limits";
import { useMutation } from "@tanstack/react-query";
import {
  updateBank,
  updateLimit,
  updateWallet,
} from "../../services/generalSettings";

const General = ({ settings }) => {
  const [error, setError] = useState("");

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
      // walletMutation.mutate(values)
    },
  });

  const bankValidation = useFormik({
    enableReinitialize: true,
    initialValues: {
      bankName: settings?.bankDetails?.bankName || "",
      account: settings?.bankDetails?.accountNumber || "",
      routing: settings?.bankDetails?.routing || "",
      accountName: settings?.bankDetails?.accountName || "",
      bankAddress: settings?.bankDetails?.address || "",
      reference: settings?.bankDetails?.reference || "",
    },
    onSubmit: (values) => {
      console.log(values);
      // bankMutation.mutate(values)
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
      // limitMutation.mutate(values)
    },
  });

  return (
    <React.Fragment>
      <Card className="mb-3">
        <CardHeader>
          <h5>General</h5>
        </CardHeader>
        <CardBody>
          <Col className="mb-5">
            <Wallet validation={walletValidation} />

            <button className="btn btn-info mt-3">Update Wallet</button>
          </Col>

          <Col className="mb-5">
            <Bank validation={bankValidation} />
            <button className="btn btn-info mt-3">Update Bank</button>
          </Col>

          <Col className="mt-5">
            <Limits validation={limitValidation} />
            <button className="mt-3 btn btn-info">Update Limits</button>
          </Col>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default General;
