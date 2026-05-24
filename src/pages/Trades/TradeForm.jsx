import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Input, Label, Row, Spinner } from "reactstrap";
import { getAllUsers } from "../../services/users";
import { getAccessToken } from "../../helpers/api_helper";
import { getUserAccounts } from "../../services/account";
import { searchAsset } from "../../services/asset";
import numeral from "numeral";
import BuyForm from "./BuyForm";

import { Link } from "react-router-dom";
import SellOrder from "./SellOrder";

const TradeForm = ({ onClose, action, orderData }) => {
  const tk = getAccessToken();

  const [order, setOrder] = useState(action === "close" ? "sell" : "buy");

  const { data: users = [] } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["users"],
    enabled: !!tk,
  });

  return (
    <React.Fragment>
      <Row className="mb-4">
        <Col>
          <button
            type="button"
            onClick={() => setOrder("buy")}
            className={`btn text-capitalize ${order === "buy" ? " btn-success" : "btn-light"} w-100`}
          >
            buy{" "}
          </button>
        </Col>
        <Col>
          <button
            type="button"
            onClick={() => setOrder("sell")}
            className={`btn text-capitalize ${order === "sell" ? " btn-danger" : "btn-light"} w-100`}
          >
            sell{" "}
          </button>
        </Col>
        {order === "buy" ? (
          <BuyForm token={tk} order={order} users={users} onClose={onClose} />
        ) : (
          <SellOrder
            token={tk}
            order={order}
            users={users}
            onClose={onClose}
            orderData={orderData}
          />
        )}
      </Row>
    </React.Fragment>
  );
};

export default TradeForm;
