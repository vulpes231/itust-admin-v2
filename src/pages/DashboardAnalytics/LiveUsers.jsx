import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { CountriesCharts } from "./DashboardAnalyticsCharts";

import { VectorMap } from "@south-paw/react-vector-maps";
import world from "../../common/world.svg.json";

const LiveUsers = () => {
  const [countryData, setcountryData] = useState([]);
  const [periodType, setPeriodType] = useState("halfyearly");

  const onChangeChartPeriod = (pType) => {
    setPeriodType(pType);
    // dispatch(getAllData(pType));
  };

  return (
    <React.Fragment>
      <Col>
        <Row className="h-100">
          <Col>
            <Card className="card-height-100">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Analytics</h4>
                <div className="d-flex gap-1">
                  <button
                    type="button"
                    className={classNames(
                      { active: periodType === "all" },
                      "btn btn-soft-secondary btn-sm"
                    )}
                    onClick={() => {
                      onChangeChartPeriod("all");
                    }}
                  >
                    ALL
                  </button>
                  <button
                    type="button"
                    className={classNames(
                      { active: periodType === "monthly" },
                      "btn btn-soft-primary btn-sm"
                    )}
                    onClick={() => {
                      onChangeChartPeriod("monthly");
                    }}
                  >
                    1M
                  </button>
                  <button
                    type="button"
                    className={classNames(
                      { active: periodType === "halfyearly" },
                      "btn btn-soft-secondary btn-sm"
                    )}
                    onClick={() => {
                      onChangeChartPeriod("halfyearly");
                    }}
                  >
                    6M
                  </button>
                </div>
              </div>
              <div className="card-body p-0">
                <div>
                  <div id="countries_charts" className="apex-charts" dir="ltr">
                    <CountriesCharts
                      series={countryData}
                      dir="ltr"
                      dataColors='["--vz-info", "--vz-info", "--vz-info", "--vz-info", "--vz-danger", "--vz-info", "--vz-info", "--vz-info", "--vz-info", "--vz-info"]'
                    />
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  );
};

export default LiveUsers;
