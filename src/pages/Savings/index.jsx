import React, { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import AllAccounts from "./AllAccounts";
import { getAccessToken } from "../../helpers/api_helper";
import { getSavingsAccounts } from "../../services/savings";
import { useQuery } from "@tanstack/react-query";

const SavingsAccount = () => {
  document.title = "Savings Accounts | Itrust Investment";

  const token = getAccessToken();

  const [accountList, setAccountList] = useState([]);

  const { data: savingsAccounts } = useQuery({
    queryKey: ["savingAccouts"],
    queryFn: getSavingsAccounts,
    enabled: !!token,
  });

  useEffect(() => {
    if (savingsAccounts && savingsAccounts.length > 0) {
      // console.log(savingsAccounts);
      setAccountList(savingsAccounts);
    }
  }, [savingsAccounts]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Savings Accounts" pageTitle="Manage Accounts" />
          <Row>
            <AllAccounts accountList={accountList} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SavingsAccount;
