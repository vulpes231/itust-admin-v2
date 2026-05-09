import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { getUserAccounts } from "../../services/account";
import { searchAsset } from "../../services/asset";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorToast, SuccessToast } from "../../Components";
import { addNewTrade, closeTrade, getUserTrades } from "../../services/trades";
import { Col, Input, Label, Row, Spinner } from "reactstrap";
import numeral from "numeral";

const SellForm = ({ order, token, users, onClose }) => {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: closeTrade,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        mutation.reset();
        onClose();
        window.location.reload();
      }, 3000);
    },
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      userId: "",
      walletId: "",
      assetId: "",
      amount: "",
      executionType: "",
      orderType: order || "",
      date: "",
      time: "",
      takeProfit: "",
      stopLoss: "",
      leverage: "",
    },
    onSubmit: (values) => {
      console.log(values);
      mutation.mutate(values);
    },
  });

  const { data: userAccounts = [] } = useQuery({
    queryFn: () => getUserAccounts({ userId: validation.values.userId }),
    queryKey: ["userAccounts", validation.values.userId],
    enabled: !!token && !!validation.values.userId,
  });

  const { data: userTrades = [] } = useQuery({
    queryKey: ["userTrades", validation.values.userId],
    queryFn: () => getUserTrades({ userId: validation.values.userId }),
    enabled: !!token && !!validation.values.userId,
  });

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(tmt);
    }
  }, [error]);
  return (
    <div className="mb-3 mt-3">
      <Row className="mb-3">
        <Col>
          <Label>Select User</Label>
          <Input
            type="select"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.userId}
            name="userId"
          >
            <option value="">Select User</option>
            {users &&
              users.length > 0 &&
              users.map((usr) => {
                return (
                  <option key={usr._id} value={usr._id}>
                    {usr.contactInfo.email}
                  </option>
                );
              })}
          </Input>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col
          style={{
            display: validation.values.userId !== "" ? "block" : "none",
          }}
        >
          <Label>Select Account</Label>
          <Input
            type="select"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.walletId}
            name="walletId"
            className="text-capitalize"
          >
            <option value="">Select Account</option>
            {userAccounts &&
              userAccounts.length > 0 &&
              userAccounts.map((acct) => {
                return (
                  <option key={acct._id} value={acct._id}>
                    {`${acct.name}: ${numeral(acct.availableBalance).format("$0,0.00")}`}
                  </option>
                );
              })}
          </Input>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col
          style={{
            display: validation.values.userId !== "" ? "block" : "none",
          }}
        >
          <Label>Select Trade</Label>
          <Input
            type="select"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.walletId}
            name="walletId"
            className="text-capitalize"
          >
            <option value="">Select Trade</option>
            {userTrades &&
              userTrades.length > 0 &&
              userTrades.map((trade) => {
                return (
                  <option key={trade._id} value={trade._id}>
                    {`${trade.asset.name}: ${numeral(trade.performance.currentValue).format("$0,0.00")}`}
                  </option>
                );
              })}
          </Input>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Label>Order Type</Label>
          <Input
            type="select"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.executionType}
            name="executionType"
          >
            <option value="">Select Order Type</option>
            <option value="market">Market Order</option>
            {/* <option value="leverage">Leverage Order</option>
            <option value="stoploss">Stop Loss Order</option>
            <option value="takeprofit">Take Profit Order</option> */}
          </Input>
        </Col>
        {validation.values.orderType === "leverage" && (
          <Col>
            <Label>Leverage</Label>
            <Input
              type="select"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.leverage}
              name="leverage"
            >
              <option value="">Select Leverage</option>
              <option value="1">1x</option>
              <option value="10">10x</option>
              <option value="20">20x</option>
              <option value="50">50x</option>
            </Input>
          </Col>
        )}
        {validation.values.orderType === "takeprofit" && (
          <Col>
            <Label>Take Profit Point</Label>
            <Input
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.takeProfit}
              name="takeProfit"
              autoComplete="off"
            />
          </Col>
        )}
        {validation.values.orderType === "stoploss" && (
          <Col>
            <Label>Stop Loss Point</Label>
            <Input
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.stopLoss}
              name="stopLoss"
              autoComplete="off"
            />
          </Col>
        )}
      </Row>

      <Row className="mb-3">
        <Col>
          <Label>Amount</Label>
          <Input
            type="text"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.amount}
            name="amount"
            autoComplete="off"
          />
        </Col>
      </Row>
      <Row>
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-info"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              validation.submitForm();
            }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Spinner size="sm" className="me-2">
                Loading...
              </Spinner>
            ) : null}
            Close Trade
          </button>
          <button type="button" onClick={onClose} className="btn btn-danger">
            Cancel
          </button>
        </div>
      </Row>

      {error && (
        <ErrorToast
          errMsg={error}
          isOpen={error !== undefined}
          onClose={() => setError("")}
        />
      )}
      {mutation.isSuccess && (
        <SuccessToast
          msg={"Trade closed successfully."}
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
        />
      )}
    </div>
  );
};

export default SellForm;
