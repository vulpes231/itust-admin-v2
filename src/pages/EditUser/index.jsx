import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useParams } from "react-router-dom";
import PersonalInfo from "./PersonalInfo";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getUserInfo } from "../../services/users";
import { getAccessToken } from "../../helpers/api_helper";

const EditUser = () => {
  document.title = "Edit User | Itrust Investment";
  const { userId } = useParams();
  const tk = getAccessToken;

  const { data: userInfo } = useQuery({
    queryFn: () => getUserInfo(userId),
    queryKey: ["userInfo"],
    enabled: !!tk,
  });

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
    }
  }, [userInfo]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="User" pageTitle="Edit User" />
          <Row>
            <Col>
              <PersonalInfo />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EditUser;
