import { capitalize } from "lodash";
import numeral from "numeral";
import React from "react";

const Type = (cell) => {
  return (
    <React.Fragment>
      {cell.getValue() === "moderate" ? (
        <span className="type text-success">{capitalize(cell.getValue())}</span>
      ) : cell.getValue() === "conservative" ? (
        <span className="type text-warning">{capitalize(cell.getValue())}</span>
      ) : (
        <span className="type text-danger">{capitalize(cell.getValue())}</span>
      )}
    </React.Fragment>
  );
};

const Winrate = (cell) => {
  return <React.Fragment>{cell.getValue()}%</React.Fragment>;
};

const Duration = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};

const Minimum = (cell) => {
  return (
    <React.Fragment>
      {" "}
      {numeral(cell.getValue()).format("$0,0.00")}
    </React.Fragment>
  );
};

const TotalReturn = (cell) => {
  return <React.Fragment>{cell.getValue()}%</React.Fragment>;
};

const Status = (cell) => {
  return (
    <React.Fragment>
      {cell.getValue() === "active" ? (
        <span className="badge bg-success-subtle text-success text-uppercase">
          {cell.getValue()}
        </span>
      ) : cell.getValue() === "inactive" ? (
        <span className="badge bg-danger-subtle text-danger text-uppercase">
          {cell.getValue()}
        </span>
      ) : null}
    </React.Fragment>
  );
};

export { Type, Winrate, Duration, Minimum, TotalReturn, Status };
