import { capitalize } from "lodash";
import React from "react";

const Experience = (cell) => {
  return <React.Fragment>{capitalize(cell.getValue())}</React.Fragment>;
};

const Kyc = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};

const Email = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};

const Phone = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};

const Nationality = (cell) => {
  return <React.Fragment>{capitalize(cell.getValue())}</React.Fragment>;
};

const Status = (cell) => {
  return (
    <React.Fragment>
      {cell.getValue() === "not active" ? (
        <span className="badge bg-warning-subtle text-warning text-uppercase">
          {cell.getValue()}
        </span>
      ) : cell.getValue() === "active" ? (
        <span className="badge bg-success-subtle text-success text-uppercase">
          {cell.getValue()}
        </span>
      ) : cell.getValue() === "banned" ? (
        <span className="badge bg-danger-subtle text-danger text-uppercase">
          {cell.getValue()}
        </span>
      ) : null}
    </React.Fragment>
  );
};

export { Experience, Kyc, Email, Phone, Nationality, Status };
