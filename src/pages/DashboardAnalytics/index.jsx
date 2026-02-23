import React from "react";
import { Col, Container, Row } from "reactstrap";

import UsersByDevice from "./UsersByDevice";
import Widget from "./Widget";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import LiveUsers from "./LiveUsers";
import TopPages from "./TopPages";
import RecentActivities from "./RecentActivities";
import { getAllUsers } from "../../services/users";
import { getAllTrades } from "../../services/trades";
import { getAllTransactions } from "../../services/transactions";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../helpers/api_helper";

const DashboardAnalytics = () => {
  document.title = "Admin Dashboard | Itrust Investment";

  const token = getAccessToken();

  const { data: users } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["AllUsers"],
    enabled: !!token,
  });

  const { data: transactions } = useQuery({
    queryFn: getAllTransactions,
    queryKey: ["AllTransactions"],
    enabled: !!token,
  });

  const { data: trades } = useQuery({
    queryKey: ["trades"],
    queryFn: getAllTrades,
    enabled: !!token,
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Analytics" pageTitle="Dashboard" />
          <Row>
            <Col md={3}>
              <Widget />
            </Col>
            <Col md={6}>
              <LiveUsers />
            </Col>
            <Col md={3}>
              <RecentActivities />
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <UsersByDevice />
            </Col>
            <Col>
              <TopPages />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardAnalytics;
