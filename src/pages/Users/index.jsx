import React from "react";
import { Container, Row } from "reactstrap";
import { useQuery } from "@tanstack/react-query";

import AllUsers from "./AllUsers";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { getAllUsers } from "../../services/users";
import { getAccessToken } from "../../helpers/api_helper";

const Users = () => {
  document.title = "Users | Itrust Investment";

  const token = getAccessToken();

  const {
    data: users = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["AllUsers"],
    queryFn: getAllUsers,
    enabled: !!token,
    staleTime: 30_000,
  });

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Users" pageTitle="Manage Users" />

        <Row>
          {isLoading || isFetching ? (
            <div className="text-center p-4">Loading users...</div>
          ) : isError ? (
            <div className="text-danger p-4">
              Failed to load users: {error?.message}
            </div>
          ) : (
            <AllUsers userList={users} />
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Users;
