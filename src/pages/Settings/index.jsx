import React from "react";
import GeneralSettings from "./GeneralSettings";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const ManageSettings = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Setting" pageTitle="Global Settings" />
        </Container>
      </div>
      <GeneralSettings />
    </React.Fragment>
  );
};

export default ManageSettings;
