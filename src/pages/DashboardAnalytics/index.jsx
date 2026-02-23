import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";

import UsersByDevice from "./UsersByDevice";
import Widget from "./Widget";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import LiveUsers from "./LiveUsers";
import TopPages from "./TopPages";
import RecentActivities from "./RecentActivities";

import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../helpers/api_helper";
import {
  getRecentActivities,
  getRecentTransactions,
  getRecentUsers,
  getSysInfo,
} from "../../services/analytics";

const DashboardAnalytics = () => {
  document.title = "Admin Dashboard | Itrust Investment";

  const token = getAccessToken();

  const { data: users } = useQuery({
    queryFn: getRecentUsers,
    queryKey: ["recentUsers"],
    enabled: !!token,
  });

  const { data: transactions } = useQuery({
    queryFn: getRecentTransactions,
    queryKey: ["recentTrnxs"],
    enabled: !!token,
  });

  const { data: activities } = useQuery({
    queryFn: getRecentActivities,
    queryKey: ["recentActivites"],
    enabled: !!token,
  });

  const { data: sysInfo } = useQuery({
    queryKey: ["sysInfo"],
    queryFn: getSysInfo,
    enabled: !!token,
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Analytics" pageTitle="Dashboard" />
          <Row>
            <Col md={3}>
              <Widget info={sysInfo} />
            </Col>
            <Col md={6}>
              <LiveUsers />
            </Col>
            <Col md={3}>
              <RecentActivities activities={activities} />
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <UsersByDevice users={users} />
            </Col>
            <Col>
              <TopPages transactions={transactions} />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardAnalytics;
