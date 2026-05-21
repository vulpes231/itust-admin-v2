import { useFormik } from "formik";
import React, { useEffect, useState, useRef } from "react";
import { getUserAccounts } from "../../services/account";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorToast, SuccessToast } from "../../Components";
import { closeTrade, getUserTrades } from "../../services/trades";
import { Col, Input, Label, Row, Spinner } from "reactstrap";
import numeral from "numeral";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { capitalize } from "lodash";
import { getAccessToken } from "../../helpers/api_helper";

const SellOrder = ({ token, order, users, onClose }) => {
  const [error, setError] = useState("");
  const hasAutoSelectedRef = useRef(false);

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
      tradeId: "",
      amount: "",
      executionType: "market",
      orderType: "",
      extra: "",
      takeProfit: "",
      stopLoss: "",
      leverage: "",
      notifyUser: false,
    },
    onSubmit: (values) => {
      const formData = {
        tradeId: values.tradeId,
        userId: values.userId,
        amount: values.amount,
        notifyUser: values.notifyUser,
      };
      //   console.log(formData);
      mutation.mutate(formData);
    },
  });

  const { data: userAccounts = [] } = useQuery({
    queryFn: () => getUserAccounts({ userId: validation.values.userId }),
    queryKey: ["userAccounts", validation.values.userId],
    enabled: !!token && !!validation.values.userId,
  });

  const { data: userTrades = [] } = useQuery({
    queryFn: () => getUserTrades(validation.values.userId),
    queryKey: ["userTrades", validation.values.userId],
    enabled: !!token && !!validation.values.userId,
  });

  const filteredTrades =
    userTrades &&
    userTrades.length > 0 &&
    userTrades.filter(
      (trade) =>
        trade.wallet.id.toString() === validation.values.walletId &&
        trade.status === "open",
    );

  const filteredAccts =
    userAccounts &&
    userAccounts.length > 0 &&
    userAccounts.filter((acct) => acct.slug !== "cash");

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [error]);

  const handleUserChange = (e) => {
    const userId = e.target.value;
    validation.setFieldValue("userId", userId);
    validation.setFieldValue("walletId", "");
    validation.setFieldValue("assetId", "");
    hasAutoSelectedRef.current = false;
  };

  return (
    <div className="mb-3 mt-3">
      <Row className="mb-3">
        <Col>
          <Label>Select User</Label>
          <Input
            type="select"
            onChange={handleUserChange}
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
                    {`${capitalize(usr.personalInfo.firstName)} ${capitalize(usr.personalInfo.lastName)}`}
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
            {filteredAccts &&
              filteredAccts.length > 0 &&
              filteredAccts.map((acct) => {
                return (
                  <option key={acct._id} value={acct._id}>
                    {`${acct.name}: ${numeral(acct.balance.available).format("$0,0.00")}`}
                  </option>
                );
              })}
          </Input>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col
          style={{
            display: validation.values.walletId !== "" ? "block" : "none",
          }}
        >
          <Label>Select Asset</Label>
          <Input
            type="select"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.tradeId}
            name="tradeId"
            className="text-capitalize"
          >
            <option value="">Select Asset</option>
            {filteredTrades &&
              filteredTrades.length > 0 &&
              filteredTrades.map((trade) => {
                return (
                  <option key={trade._id} value={trade._id}>
                    {`${trade.asset?.name}: ${numeral(trade.performance.currentValue).format("$0,0.00")}`}
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
          <Label>Amount </Label>
          <Input
            type="text"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.amount}
            name="amount"
            autoComplete="off"
            placeholder="$0.00"
          />
        </Col>
      </Row>

      <div className="d-flex align-items-center justify-content-between py-2">
        <Label>Notify User</Label>
        <div
          onClick={() => {
            validation.setFieldValue(
              "notifyUser",
              !validation.values.notifyUser,
            );
          }}
        >
          {validation.values.notifyUser ? (
            <BsToggle2On size={20} className="text-success" />
          ) : (
            <BsToggle2Off size={20} />
          )}
        </div>
      </div>

      <Row>
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-info"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              validation.submitForm();
            }}
            disabled={mutation.isPending || !validation.values.tradeId}
          >
            {mutation.isPending ? (
              <Spinner size="sm" className="me-2">
                Loading...
              </Spinner>
            ) : null}
            Close Trade
          </button>
          <button type="button" className="btn btn-danger">
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

export default SellOrder;
