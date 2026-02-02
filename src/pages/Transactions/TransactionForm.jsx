import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Input, Label, Row, Spinner } from "reactstrap";
import { getAllUsers } from "../../services/users";
import { getAccessToken } from "../../helpers/api_helper";
import { getUserAccounts } from "../../services/account";

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
];

const TransactionForm = ({ mutation, onClose }) => {
  const tk = getAccessToken();

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
      type: "",
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

  const getNetworks = (method) => {
    return methods.find((mtd) => mtd.id === method)?.network || [];
  };

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
                value={validation.values.accountId}
                name="accountId"
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

          <Row className="mb-3">
            <Col>
              <Label>Type</Label>
              <Input
                type="select"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.type}
                name="type"
              >
                <option value="">Select Type</option>
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
              </Input>
            </Col>
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
    </React.Fragment>
  );
};

export default TransactionForm;
