import React, { useEffect } from "react";
import { Container, Row } from "reactstrap";
import AllTransactions from "./AllTransactions";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const Transactions = () => {
  document.title = "Transactions | Itrust Investment";

  const transactionlist = [];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Transactions" pageTitle="Manage Transactions" />
          <Row>
            <AllTransactions transactionlist={transactionlist} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Transactions;
