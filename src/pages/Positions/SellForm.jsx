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

const SellForm = ({ rowData }) => {
  // console.log(rowData);
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
      userId: rowData?.userId || "",
      walletId: rowData?.wallet?.id || "",
      positionId: rowData?._id || "",
      amount: "",
      executionType: "market",
      orderType: rowData?.orderType || "",
      extra: rowData?.performance?.extra || "",
      takeProfit: "",
      stopLoss: "",
      leverage: "",
      notifyUser: false,
    },
    onSubmit: (values) => {
      const formData = {
        positionId: values.positionId,
        userId: values.userId,
        amount: values.amount,
        notifyUser: values.notifyUser,
      };
      mutation.mutate(formData);
    },
  });
  const token = getAccessToken();
  const { data: userAccounts = [] } = useQuery({
    queryFn: () => getUserAccounts({ userId: validation.values.userId }),
    queryKey: ["userAccounts", validation.values.userId],
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
          <Label> User</Label>
          <Input
            type="text"
            onBlur={validation.handleBlur}
            value={rowData?.fullname}
            name="userId"
            readOnly
            className="text-capitalize bg-light"
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Label> Account</Label>
          <Input
            type="text"
            onBlur={validation.handleBlur}
            value={rowData?.wallet?.name}
            name="walletId"
            className="text-capitalize bg-light"
            readOnly
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Label>Asset</Label>
          <Input
            type="text"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={rowData?.asset?.name}
            name="positionId"
            className="text-capitalize bg-light"
          />
        </Col>
        <span>
          Current Value:{" "}
          {numeral(rowData?.performance?.currentValue).format("$0,0.00")}
        </span>
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

      <Row className="mb-3">
        <Col>
          <Label>Order(s)</Label>
          <Input
            type="text"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={rowData?.tradeIds?.length}
            name="positionId"
            className="text-capitalize bg-light"
            readOnly
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
            disabled={mutation.isPending || !validation.values.positionId}
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

export default SellForm;
