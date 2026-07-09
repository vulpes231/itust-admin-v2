import React from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Container, Row } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { getAllAssets } from "../../services/asset";
import AllAssets from "./AllAssets";

const Assets = () => {
  const { data: assets, isLoading: getAssetsLoading } = useQuery({
    queryFn: getAllAssets,
    queryKey: ["assets"],
  });
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Assets" pageTitle="Manage Assets" />
          <Row>
            <AllAssets assetList={assets} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Assets;
