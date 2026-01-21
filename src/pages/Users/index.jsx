import React, { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import AllUsers from "./AllUsers";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/users";
import { getAccessToken } from "../../helpers/api_helper";

const Users = () => {
  document.title = "Users | Itrust Investment";

  const token = getAccessToken();

  const [userList, setUserList] = useState([]);

  const { data: users } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["AllUsers"],
    enabled: !!token,
  });

  useEffect(() => {
    if (users && users.length > 0) {
      // console.log(users);
      setUserList(users);
    }
  }, [users]);

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
