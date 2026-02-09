import React, { useEffect, useState } from "react";

import { getAccessToken } from "../../helpers/api_helper";
import { useQuery } from "@tanstack/react-query";
import { Col, Row } from "reactstrap";

import { getSettings } from "../../services/generalSettings";
import Info from "./Info";
import General from "./General";

const GeneralSettings = () => {
  const tk = getAccessToken();

  const { data: settings } = useQuery({
    queryFn: getSettings,
    queryKey: ["globalWalletSettings"],
    enabled: !!tk,
  });

  return (
    <React.Fragment>
      <div>
        <Col>
          <Row>
            <Col lg={8}>
              <General settings={settings} />
            </Col>
            <Col lg={4}>
              <Info settings={settings} />
            </Col>
          </Row>
        </Col>
      </div>
    </React.Fragment>
  );
};

export default GeneralSettings;
