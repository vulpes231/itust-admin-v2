import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Input, Label, Row, Spinner } from "reactstrap";
import { getAllUsers, getUserInfo } from "../../services/users";
import { getAccessToken } from "../../helpers/api_helper";
import { getUserAccounts } from "../../services/account";
import ErrorToast from "../../Components/Common/ErrorToast";
import { getSettings } from "../../services/generalSettings";
import numeral from "numeral";

import { MdToggleOff, MdToggleOn } from "react-icons/md";

const methods = [
  {
    id: "bitcoin",
    title: "Bitcoin",
    network: ["btc"],
  },
  {
    id: "bank",
    title: "Bank",
    network: ["bank"],
  },
  {
    id: "ethereum",
    title: "Ethereum",
    network: ["ERC20"],
  },
  {
    id: "usdt",
    title: "USDT",
    network: ["ERC20", "TRC20"],
  },
  {
    id: "transfer",
    title: "Transfer",
    network: ["transfer"],
  },
];

const TransactionForm = ({ mutation, onClose, currentTab }) => {
  const tk = getAccessToken();
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [matchedUsers, setMatchedUsers] = useState([]);

  const { data: users } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["users"],
    enabled: !!tk,
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      method: "",
      accountId: "",
      userId: "",
      amount: "",
      memo: "",
      network: "",
      type: currentTab || "",
      notifyUser: false,
      customDate: "",
      toAccountId: "",
      address: "",
      bankName: "",
      accountNumber: "",
      bankAddress: "",
      routing: "",
      accountName: "",
      swiftCode: "",
    },
    onSubmit: (values) => {
      const parsedAmt = parseFloat(values.amount);

      if (isNaN(parsedAmt)) {
        setError("Please enter a valid amount");
        return;
      }

      console.log(values);
    },
  });

  const { data: userAccounts } = useQuery({
    queryFn: () => getUserAccounts({ userId: validation.values.userId }),
    queryKey: ["userAccounts", validation.values.userId],
    enabled: !!tk && !!validation.values.userId,
  });

  useEffect(() => {
    if (userAccounts && userAccounts.length > 0) {
      const transactionAccount = userAccounts.find(
        (acct) => acct.slug === "cash",
      );
      validation.setFieldValue("accountId", transactionAccount?._id);
    }
  }, [userAccounts]);

  const { data: userInfo } = useQuery({
    queryFn: () => getUserInfo(validation.values.userId),
    queryKey: ["userInfo", validation.values.userId],
    enabled: !!tk && !!validation.values.userId,
  });

  // const { data: defaultSettings } = useQuery({
  //   queryFn: () => getSettings(),
  //   queryKey: ["defaultSettings"],
  //   enabled: !!tk,
  // });

  const getNetworks = (method) => {
    return methods.find((mtd) => mtd.id === method)?.network || [];
  };

  useEffect(() => {
    if (!users || !searchTerm.trim()) {
      setMatchedUsers([]);
      return;
    }

    const matches = users.filter((user) =>
      user.contactInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setMatchedUsers(matches);
  }, [searchTerm, users]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSearchTerm(user.contactInfo.email);
    setMatchedUsers([]);
    validation.setFieldValue("userId", user._id);
  };

  const filteredAccts =
    validation.values.type === "deposit" ||
    validation.values.type === "withdraw"
      ? userAccounts?.filter((acct) => acct.slug === "cash")
      : userAccounts;

  return (
    <React.Fragment>
      <form action="">
        <div className="mb-3 mt-3">
          <Row className="mb-3">
            <Col>
              <Label>Type</Label>
              <Input
                type="text"
                value={validation.values.type}
                name="type"
                readOnly
                className="text-capitalize bg-light"
              ></Input>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Label>User</Label>
              <Input
                type="text"
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedUser(null);
                }}
              />

              {matchedUsers.length > 0 && (
                <div className="border rounded mt-1 bg-white shadow-sm">
                  {matchedUsers.map((user) => (
                    <div
                      key={user._id}
                      className="p-2 border-bottom"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSelectUser(user)}
                    >
                      <strong>
                        {user.personalInfo.firstName}{" "}
                        {user.personalInfo.lastName}
                      </strong>

                      <br />

                      <small>{user.contactInfo.email}</small>
                    </div>
                  ))}
                </div>
              )}

              {selectedUser && (
                <div className="alert alert-success mt-2 py-2">
                  Selected:
                  <strong>
                    {" "}
                    {selectedUser.personalInfo.firstName}{" "}
                    {selectedUser.personalInfo.lastName}
                  </strong>
                </div>
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col
              style={{
                display: validation.values.userId !== "" ? "block" : "none",
              }}
            >
              <Label>
                Select {validation.values.type === "transfer" && "from"} Account
              </Label>
              <Input
                type="select"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.accountId}
                name="accountId"
              >
                <option value="">Select Account</option>
                {filteredAccts &&
                  filteredAccts.length > 0 &&
                  filteredAccts.map((acct) => {
                    return (
                      <option key={acct._id} value={acct._id}>
                        {acct.name}:{" "}
                        {numeral(acct.balance.available).format("$0,00.00")}
                      </option>
                    );
                  })}
              </Input>
            </Col>
          </Row>
          <Row
            className="mb-3"
            style={{
              display:
                validation.values.type === "transfer" &&
                validation.values.userId !== ""
                  ? "block"
                  : "none",
            }}
          >
            <Col>
              <Label>Select To Account</Label>
              <Input
                type="select"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.toAccountId}
                name="toAccountId"
              >
                <option value="">Select Account</option>
                {filteredAccts &&
                  filteredAccts.length > 0 &&
                  filteredAccts
                    .filter((acct) => acct._id !== validation.values.accountId)
                    .map((acct) => {
                      return (
                        <option key={acct._id} value={acct._id}>
                          {acct.name}:{" "}
                          {numeral(acct.balance.available).format("$0,00.00")}
                        </option>
                      );
                    })}
              </Input>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Label>Method</Label>
              <Input
                type="select"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.method}
                name="method"
              >
                <option value="">Select Method</option>
                {methods.map((mtd) => {
                  return (
                    <option key={mtd.id} value={mtd.id}>
                      {mtd.title}
                    </option>
                  );
                })}
              </Input>
            </Col>
            {validation.values.method && (
              <Col>
                <Label>Network</Label>
                <Input
                  type="select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.network}
                  name="network"
                >
                  <option value="">Select Network</option>
                  {getNetworks(validation.values.method)?.map((ntw, idx) => {
                    return (
                      <option key={idx} value={ntw}>
                        {ntw}
                      </option>
                    );
                  })}
                </Input>
              </Col>
            )}
          </Row>
          {validation.values.type === "withdraw" &&
            validation.values.method !== "bank" &&
            validation.values.method !== "" && (
              <Row className="mb-3">
                <Col>
                  <Label>Address</Label>
                  <Input
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.address}
                    name="address"
                  />
                </Col>
              </Row>
            )}

          {validation.values.type === "withdraw" &&
            validation.values.method === "bank" && (
              <Col>
                <Row className="mb-3">
                  <Col>
                    <Label>Bank Name</Label>
                    <Input
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.bankName}
                      name="bankName"
                    />
                  </Col>
                  <Col>
                    <Label>Account Number</Label>
                    <Input
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.accountNumber}
                      name="accountNumber"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Label>Account Name</Label>
                    <Input
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.accountName}
                      name="accountName"
                    />
                  </Col>
                  <Col>
                    <Label>Routing Number</Label>
                    <Input
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.routing}
                      name="routing"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Label>Bank Address</Label>
                    <Input
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.bankAddress}
                      name="bankAddress"
                    />
                  </Col>
                  <Col>
                    <Label>Swift Code</Label>
                    <Input
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.swiftCode}
                      name="swiftCode"
                    />
                  </Col>
                </Row>
              </Col>
            )}

          {/* <Row className="mb-3">
            <Col>
              <Label>Memo (Optional)</Label>
              <Input
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.memo}
                name="memo"
                autoComplete="off"
              />
            </Col>
          </Row> */}
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
              <Label>Custom Date</Label>
              <Input
                type="date"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.customDate}
                name="customDate"
                autoComplete="off"
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="d-flex align-items-center justify-content-between">
              <Label>Notify User</Label>
              <span
                onClick={() =>
                  validation.setFieldValue(
                    "notifyUser",
                    !validation.values.notifyUser,
                  )
                }
                className={`fs-22 ${validation.values.notifyUser ? "text-success" : "text-muted"}`}
              >
                {" "}
                {validation.values.notifyUser ? (
                  <MdToggleOn size={30} />
                ) : (
                  <MdToggleOff size={30} />
                )}
              </span>
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
                Create Transaction
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
      {error && <ErrorToast errMsg={error} onClose={() => setError("")} />}
    </React.Fragment>
  );
};

export default TransactionForm;
