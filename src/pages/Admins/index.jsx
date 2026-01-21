import React, { useEffect } from "react";
import { Container, Row } from "reactstrap";
import AllAdmins from "./AllAdmins";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const Admins = () => {
  document.title = "Admins | Itrust Investment";

  const adminList = [];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Admins" pageTitle="Manage Admins" />
          <Row>
            <AllAdmins adminList={adminList} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Admins;
