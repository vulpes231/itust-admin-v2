import { useFormik } from "formik";
import React, { useEffect, useState, useRef } from "react";
import { getUserAccounts } from "../../services/account";
import { searchAsset } from "../../services/asset";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorToast, SuccessToast } from "../../Components";
import { addNewTrade } from "../../services/trades";
import { Button, Col, Input, Label, Row, Spinner } from "reactstrap";
import numeral from "numeral";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { capitalize } from "lodash";
import { getUserInfo } from "../../services/users";

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const BuyForm = ({ order, token, users, onClose }) => {
  const [assetSearch, setAssetSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const hasAutoSelectedRef = useRef(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getCurrentDateTime = () => {
    const now = new Date();
    now.setSeconds(0, 0);

    return now.toISOString().slice(0, 16);
  };

  const mutation = useMutation({
    mutationFn: addNewTrade,
    onError: (err) => {
      setError(err.message);
    },
    onSuccess: () => {
      setTimeout(() => {
        mutation.reset();
        onClose();
        window.location.reload();
      }, 3000);
    },
  });

  let selectedAcct, selectedPlan;

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      userId: "",
      walletId: "",
      assetId: "",
      planId: "",
      amount: "",
      executionType: "market",
      orderType: order || "",
      customDate: getCurrentDateTime() || "",
      takeProfit: "",
      stopLoss: "",
      leverage: "",
      extra: "",
      notifyUser: false,
    },
    onSubmit: (values) => {
      const payload = {
        ...values,
        customDate: values.customDate ? new Date(values.customDate) : null,
      };

      if (
        selectedAcct?.slug === "auto" &&
        parseFloat(payload.amount) > selectedPlan?.balance?.available
      ) {
        setError("Insufficient funds!");
        return;
      }

      mutation.mutate(payload);
    },
  });

  const { data: userAccounts = [] } = useQuery({
    queryFn: () => getUserAccounts({ userId: validation.values.userId }),
    queryKey: ["userAccounts", validation.values.userId],
    enabled: !!token && !!validation.values.userId,
  });

  const { data: user } = useQuery({
    queryFn: () => getUserInfo(validation.values.userId),
    queryKey: ["user", validation.values.userId],
    enabled: !!token && !!validation.values.userId,
  });

  const plans = user?.activePlans;

  selectedAcct = userAccounts?.find(
    (acct) => acct._id === validation.values.walletId,
  );

  selectedPlan = plans?.find(
    (plan) => plan.planId === validation.values.planId,
  );

  // console.log(selectedPlan);

  const filteredAccts =
    userAccounts &&
    userAccounts.length > 0 &&
    userAccounts.filter((acct) => acct.slug !== "cash");

  const { data: searchResult = [] } = useQuery({
    queryKey: ["searchAsset", searchQuery],
    queryFn: () => searchAsset(searchQuery),
    enabled: !!token && searchQuery.length >= 1,
  });

  useEffect(() => {
    if (
      userAccounts.length > 0 &&
      validation.values.userId &&
      !hasAutoSelectedRef.current
    ) {
      const brokerageAccount = userAccounts.find(
        (acct) => acct.slug === "brokerage",
      );
      const accountToSelect = brokerageAccount || userAccounts[0];

      if (
        accountToSelect &&
        validation.values.walletId !== accountToSelect._id
      ) {
        hasAutoSelectedRef.current = true;
        validation.setFieldValue("walletId", accountToSelect._id);
      }
    }

    if (!validation.values.userId) {
      hasAutoSelectedRef.current = false;
    }
  }, [userAccounts, validation.values.userId, validation.values.walletId]);

  useEffect(() => {
    hasAutoSelectedRef.current = false;
  }, [validation.values.userId]);

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
    setAssetSearch(""); // Reset asset search
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

      {selectedAcct?.slug === "auto" && (
        <Row className="mb-3">
          <Col>
            <Label>Select Plan</Label>
            <Input
              type="select"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.planId}
              name="planId"
            >
              <option value="">Select Plan</option>
              {plans &&
                plans.length > 0 &&
                plans.map((pln) => {
                  return (
                    <option key={pln._id} value={pln.planId}>
                      {`${pln?.name}: ${numeral(pln.balance.available).format("$0,0.00")}`}
                    </option>
                  );
                })}
            </Input>
          </Col>
        </Row>
      )}

      <Row className="mb-3 position-relative">
        <Col>
          <Label>Search Asset</Label>

          <div className="d-flex gap-2">
            <Input
              type="text"
              value={assetSearch}
              onChange={(e) => setAssetSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setSearchQuery(assetSearch.trim());
                  setShowDropdown(true);
                }
              }}
              onBlur={() => {
                setTimeout(() => setShowDropdown(false), 150);
              }}
              placeholder="Search asset... (Press Enter)"
              disabled={!validation.values.walletId}
            />

            <Button
              color="secondary"
              disabled={!assetSearch.trim()}
              onClick={() => {
                setSearchQuery(assetSearch.trim());
                setShowDropdown(true);
              }}
            >
              Search
            </Button>
          </div>

          {showDropdown && searchResult.length > 0 && (
            <div
              className="border rounded bg-white position-absolute w-100"
              style={{
                zIndex: 1000,
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {searchResult.map((asset) => (
                <div
                  key={asset._id}
                  className="p-2 dropdown-item"
                  style={{ cursor: "pointer" }}
                  onMouseDown={() => {
                    validation.setFieldValue("assetId", asset._id);
                    setAssetSearch(asset.name);
                    setSearchQuery(asset.name);
                    setShowDropdown(false);
                  }}
                >
                  <span className="d-flex align-items-center gap-2">
                    <img src={asset.imageUrl} alt="" width={20} />
                    <span>{asset.name}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
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
            <option value="leverage">Leverage Order</option>
            {/* <option value="stoploss">Stop Loss Order</option> */}
            {/* <option value="takeprofit">Take Profit Order</option> */}
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
      <Row className="mb-3">
        <Col>
          <Label>P&L</Label>
          <Input
            type="text"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.extra}
            name="extra"
            autoComplete="off"
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Label>Date & Time</Label>
          <Input
            type="datetime-local"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.customDate}
            name="customDate"
            autoComplete="off"
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
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Spinner size="sm" className="me-2">
                Loading...
              </Spinner>
            ) : null}
            Create Trade
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
          msg={"Trade created successfully."}
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
        />
      )}
    </div>
  );
};

export default BuyForm;
