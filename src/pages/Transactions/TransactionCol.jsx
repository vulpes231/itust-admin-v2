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
  const status = cell.getValue();
  const icon =
    status === "pending" ? (
      <i className="ri-time-line align-bottom"></i>
    ) : status === "processed" ? (
      <i className="ri-checkbox-circle-line align-bottom"></i>
    ) : status === "cancelled" ? (
      <i className="ri-close-circle-line align-bottom"></i>
    ) : null;
  return (
    <React.Fragment>
      <span
        className={`${
          status === "pending"
            ? "bg-warning-subtle text-warning badge text-capitalize"
            : status === "processed"
            ? "bg-success-subtle text-success badge text-capitalize"
            : status === "cancelled"
            ? "bg-danger-subtle text-danger badge text-capitalize"
            : ""
        }`}
      >
        <span className="d-flex items-center gap-1 p-1 rounded-4">
          {icon}
          {cell.getValue()}
        </span>
      </span>
    </React.Fragment>
  );
};

export { Type, Account, Email, Memo, Price, Status };
