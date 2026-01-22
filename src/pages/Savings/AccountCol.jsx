import { capitalize } from "lodash";
import React from "react";

const Type = (cell) => {
  return (
    <React.Fragment>
      {cell.getValue() === "savings" ? (
        <span className="type text-success">{capitalize(cell.getValue())}</span>
      ) : (
        <span className="type text-info">{capitalize(cell.getValue())}</span>
      )}
    </React.Fragment>
  );
};

const Interest = (cell) => {
  return <React.Fragment>{cell.getValue()}%</React.Fragment>;
};

const CanTrade = (cell) => {
  return (
    <React.Fragment>{cell.getValue() === true ? "Yes" : "No"}</React.Fragment>
  );
};

const Minimum = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};

const Symbol = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
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

export { Type, Interest, CanTrade, Minimum, Symbol, Status };
