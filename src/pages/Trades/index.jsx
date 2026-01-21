import React, { useEffect } from "react";
import { Container, Row } from "reactstrap";
import AllTrades from "./AllTrades";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const Trades = () => {
  document.title = "Trades | Itrust Investment";

  const tradeList = [];

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
