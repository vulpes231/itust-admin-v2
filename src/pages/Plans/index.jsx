import React, { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import AllPlans from "./AllPlans";
import { getAutoPlans } from "../../services/plans";
import { getAccessToken } from "../../helpers/api_helper";
import { useQuery } from "@tanstack/react-query";

const Plans = () => {
  document.title = "Plans | Itrust Investment";

  const token = getAccessToken();

  const [planList, setPlanList] = useState([]);

  const { data: plans } = useQuery({
    queryKey: ["investments"],
    queryFn: getAutoPlans,
    enabled: !!token,
  });

  useEffect(() => {
    if (plans && plans.length > 0) {
      // console.log(plans);
      setPlanList(plans);
    }
  }, [plans]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Plans" pageTitle="Manage Plans" />
          <Row>
            <AllPlans planList={planList} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Plans;
