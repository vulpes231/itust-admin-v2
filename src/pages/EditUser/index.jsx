import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useParams } from "react-router-dom";
import PersonalInfo from "./PersonalInfo";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getUserInfo } from "../../services/users";
import { getAccessToken } from "../../helpers/api_helper";
import AccountInfo from "./AccountInfo";
import Verification from "./Verification";
import Settings from "./Settings";

const EditUser = () => {
  document.title = "Edit User | Itrust Investment";
  const { userId } = useParams();
  const tk = getAccessToken;

  const { data: userInfo } = useQuery({
    queryFn: () => getUserInfo(userId),
    queryKey: ["userInfo"],
    enabled: !!tk,
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="User" pageTitle="Manage User" />
          <Row>
            <Col>
              <PersonalInfo user={userInfo} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Verification user={userInfo} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Settings settings={userInfo?.settings} />
            </Col>
          </Row>
          <Row>
            <Col>
              <AccountInfo user={userInfo} />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EditUser;
