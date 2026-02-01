import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Input, Label, Row, Spinner } from "reactstrap";
import { getAllUsers } from "../../services/users";
import { getAccessToken } from "../../helpers/api_helper";
import { getUserAccounts } from "../../services/account";
import { searchAsset } from "../../services/asset";

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

const TradeForm = ({ mutation, onClose }) => {
  const tk = getAccessToken();

  const [assetSearch, setAssetSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const debouncedSearch = useDebounce(assetSearch, 500);

  const { data: users } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["users"],
    enabled: !!tk,
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      userId: "",
      walletId: "",
      assetId: "",
      amount: "",
      orderType: "",
    },
    onSubmit: (values) => {
      console.log(values);
      mutation.mutate(values);
    },
  });

  const { data: userAccounts } = useQuery({
    queryFn: () => getUserAccounts(validation.values.userId),
    queryKey: ["userAccounts"],
    enabled: !!tk && !!validation.values.userId,
  });

  const { data: searchResult = [] } = useQuery({
    queryKey: ["searchAsset", debouncedSearch],
    queryFn: () => searchAsset(debouncedSearch),
    enabled: !!tk && debouncedSearch.length > 3,
  });

  return (
    <React.Fragment>
      <form action="">
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
                        {usr.credentials.email}
                      </option>
                    );
                  })}
              </Input>
            </Col>
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
              >
                <option value="">Select Account</option>
                {userAccounts &&
                  userAccounts.length > 0 &&
                  userAccounts.map((acct) => {
                    return (
                      <option key={acct._id} value={acct._id}>
                        {acct.name}
                      </option>
                    );
                  })}
              </Input>
            </Col>
          </Row>
          <Row className="mb-3">
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
            <Col>
              <Label>Order Type</Label>
              <Input
                type="select"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.orderType}
                name="orderType"
              >
                <option value="">Select Order Type</option>
                <option value="buy">Buy</option>
              </Input>
            </Col>
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
              <button
                type="button"
                onClick={onClose}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </div>
          </Row>
        </div>
      </form>
    </React.Fragment>
  );
};

export default TradeForm;
