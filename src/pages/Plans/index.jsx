import React, { useEffect } from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import AllPlans from "./AllPlans";

const Plans = () => {
  document.title = "Plans | Itrust Investment";

  const planList = [];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Plans" pageTitle="Manage Plans" />
          <Row>
            <AllPlans planList={planList} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Plans;
