import React, { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import AllTransactions from "./AllTransactions";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { getAllTransactions } from "../../services/transactions";
import { getAccessToken } from "../../helpers/api_helper";
import { useQuery } from "@tanstack/react-query";

const Transactions = () => {
  document.title = "Transactions | Itrust Investment";

  const token = getAccessToken();

  const [transactionList, setTransactionList] = useState([]);

  const { data: transactions } = useQuery({
    queryFn: getAllTransactions,
    queryKey: ["AllTransactions"],
    enabled: !!token,
  });

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      // console.log(transactions);
      setTransactionList(transactions);
    }
  }, [transactions]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Transactions" pageTitle="Manage Transactions" />
          <Row>
            <AllTransactions transactionList={transactionList} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Transactions;
