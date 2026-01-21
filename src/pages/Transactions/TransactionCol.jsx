import { capitalize } from "lodash";
import React from "react";
import numeral from "numeral";

const Type = (cell) => {
  return (
    <React.Fragment>
      {cell.getValue() === "deposit" ? (
        <span className="type text-success">{capitalize(cell.getValue())}</span>
      ) : (
        <span className="type text-danger">{capitalize(cell.getValue())}</span>
      )}
    </React.Fragment>
  );
};

const Account = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};

const Email = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};

const Memo = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};

const Price = (cell) => {
  return (
    <React.Fragment>
      {numeral(cell.getValue()).format("$0,0.00")}
    </React.Fragment>
  );
};

const Status = (cell) => {
  return (
    <React.Fragment>
      {cell.getValue() === "pending" ? (
        <span className="badge bg-warning-subtle text-warning text-uppercase">
          {cell.getValue()}
        </span>
      ) : cell.getValue() === "completed" ? (
        <span className="badge bg-success-subtle text-success text-uppercase">
          {cell.getValue()}
        </span>
      ) : cell.getValue() === "failed" ? (
        <span className="badge bg-danger-subtle text-danger text-uppercase">
          {cell.getValue()}
        </span>
      ) : null}
    </React.Fragment>
  );
};

export { Type, Account, Email, Memo, Price, Status };
