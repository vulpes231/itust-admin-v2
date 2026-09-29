import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useQuery } from "@tanstack/react-query";

import { getAccessToken } from "../../helpers/api_helper";
import { getAllTiers } from "../../services/tier";
import AllTiers from "./AllTiers";

const Tier = () => {
  document.title = "Tiers | Itrust Investment";

  const token = getAccessToken();

  const { data: tiers } = useQuery({
    queryFn: getAllTiers,
    queryKey: ["tiers"],
    enabled: !!token,
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Tiers" pageTitle="Manage Tiers" />
          <Row>
            <AllTiers tiers={tiers} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Tier;
