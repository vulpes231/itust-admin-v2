import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Planlist from "./Planlist";

import { useQuery } from "@tanstack/react-query";
import { getUserPlans } from "../../services/userplans";
import { getAccessToken } from "../../helpers/api_helper";

const UserPlans = () => {
  const tk = getAccessToken();

  const { data: userPlans } = useQuery({
    queryFn: getUserPlans,
    queryKey: ["userplans"],
    enabled: !!tk,
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Users Plans" pageTitle="Manage Plans" />
          <Row>
            <Planlist plans={userPlans} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserPlans;
