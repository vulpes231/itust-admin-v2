import React, { useEffect } from "react";
import { Container, Row } from "reactstrap";
import AllUsers from "./AllUsers";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const Users = () => {
  document.title = "Users | Itrust Investment";

  const userList = [];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Users" pageTitle="Manage Users" />
          <Row>
            <AllUsers userList={userList} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Users;
