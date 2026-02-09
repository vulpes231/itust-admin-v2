import React from "react";
import GeneralSettings from "./GeneralSettings";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const ManageSettings = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Settings" pageTitle="Global Settings" />
          <GeneralSettings />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ManageSettings;
