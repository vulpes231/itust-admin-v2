import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useQuery } from "@tanstack/react-query";
import { getAllPositions } from "../../services/positions";
import { getAccessToken } from "../../helpers/api_helper";
import AllPositions from "./AllPositions";

const Positions = () => {
  document.title = "Positions | Itrust Investment";
  const token = getAccessToken();
  const { data: myPositions = [] } = useQuery({
    queryKey: ["positions"],
    queryFn: getAllPositions,
    enabled: !!token,
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Positions" pageTitle="Manage Positions" />
          <Row>
            <AllPositions positions={myPositions} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Positions;
