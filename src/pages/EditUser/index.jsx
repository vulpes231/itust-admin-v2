import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getUserInfo } from "../../services/users";
import { getAccessToken } from "../../helpers/api_helper";
import Settings from "./Settings";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import DepositDetails from "./DepositDetails";
import WithdrawDetails from "./WithdrawDetails";
import Wallet from "./Wallet";
import { getUserAccounts } from "../../services/account";

const EditUser = () => {
  document.title = "Edit User | Itrust Investment";
  const { userId } = useParams();
  const tk = getAccessToken;

  const { data: userInfo } = useQuery({
    queryFn: () => getUserInfo(userId),
    queryKey: ["userInfo"],
    enabled: !!tk,
  });

  const { data: userAccounts } = useQuery({
    queryFn: () => getUserAccounts(userId),
    queryKey: ["userAccounts"],
    enabled: !!tk,
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="User" pageTitle="Manage User" />
          <Row>
            <Col md={5}>
              <Profile user={userInfo} accounts={userAccounts} />
            </Col>
            <Col md={7}>
              <EditProfile user={userInfo} />
            </Col>
          </Row>

          <Row>
            <Col>
              <DepositDetails />
            </Col>
          </Row>
          <Row>
            <Col>
              <WithdrawDetails />
            </Col>
          </Row>

          <Row>
            <Col>
              <Settings settings={userInfo?.settings} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Wallet settings={userInfo?.settings} />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EditUser;
