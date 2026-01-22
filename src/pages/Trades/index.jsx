import React, { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import AllTrades from "./AllTrades";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useQuery } from "@tanstack/react-query";
import { getAllTrades } from "../../services/trades";
import { getAccessToken } from "../../helpers/api_helper";

const Trades = () => {
  document.title = "Trades | Itrust Investment";

  const token = getAccessToken();

  const [tradeList, setTradeList] = useState([]);

  const { data: trades } = useQuery({
    queryKey: ["trades"],
    queryFn: getAllTrades,
    enabled: !!token,
  });

  useEffect(() => {
    if (trades && trades.length > 0) {
      // console.log(trades);
      setTradeList(trades);
    }
  }, [trades]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Trades" pageTitle="Manage Trades" />
          <Row>
            <AllTrades tradeList={tradeList} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Trades;
