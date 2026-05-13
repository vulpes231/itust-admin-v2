import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { getUserAccounts } from "../../services/account";
import { searchAsset } from "../../services/asset";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorToast, SuccessToast } from "../../Components";
import { addNewTrade } from "../../services/trades";
import { Col, Input, Label, Row, Spinner } from "reactstrap";
import numeral from "numeral";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";

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

  const mutation = useMutation({
    mutationFn: addNewTrade,
    onError: (err) => {
      // validation.resetForm()
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

  const debouncedSearch = useDebounce(assetSearch, 500);

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
      notifyUser: false,
    },
    onSubmit: (values) => {
      //   console.log(values);
      mutation.mutate({ values });
    },
  });

  const { data: userAccounts = [] } = useQuery({
    queryFn: () => getUserAccounts({ userId: validation.values.userId }),
    queryKey: ["userAccounts", validation.values.userId],
    enabled: !!token && !!validation.values.userId,
  });

  const { data: searchResult = [] } = useQuery({
    queryKey: ["searchAsset", debouncedSearch],
    queryFn: () => searchAsset(debouncedSearch),
    enabled: !!token && debouncedSearch.length > 3,
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
            <option value="stoploss">Stop Loss Order</option>
            <option value="takeprofit">Take Profit Order</option>
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
      <Row className="mb-3 position-relative">
        <Col>
          <Label>Search Asset</Label>
          <Input
            type="text"
            value={assetSearch}
            onChange={(e) => {
              setAssetSearch(e.target.value);
              setShowDropdown(true);
            }}
            onBlur={() => {
              // delay so click registers
              setTimeout(() => setShowDropdown(false), 150);
            }}
            placeholder="Search asset..."
          />

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
                    // set formik value
                    validation.setFieldValue("assetId", asset._id);

                    // set visible input value
                    setAssetSearch(asset.name);

                    setShowDropdown(false);
                  }}
                >
                  <span className="d-flex align-items-center gap-2">
                    <img src={asset.imageUrl} alt="" width={20} />
                    <span> {asset.name}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </Col>
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
