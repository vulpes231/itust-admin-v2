import numeral from "numeral";
import React from "react";

const Type = (cell) => {
  return (
    <React.Fragment>
      {cell.getValue() === "Buy" ? (
        <span className="type text-success">{cell.getValue()}</span>
      ) : (
        <span className="type text-danger">{cell.getValue()}</span>
      )}
    </React.Fragment>
  );
};

const Amount = (cell) => {
  return (
    <React.Fragment>
      {numeral(cell.getValue()).format("$0,0.00")}
    </React.Fragment>
  );
};

const Quantity = (cell) => {
  return <React.Fragment>{cell.getValue()?.toFixed(5)}</React.Fragment>;
};

const OrderValue = (cell) => {
  return (
    <React.Fragment>
      {" "}
      {numeral(cell.getValue()).format("$0,0.00")}
    </React.Fragment>
  );
};

const Roi = (cell) => {
  return <React.Fragment>{cell.getValue()?.toFixed(2)}%</React.Fragment>;
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
      ) : cell.getValue() === "open" ? (
        <span className="badge bg-success-subtle text-success text-uppercase">
          {cell.getValue()}
        </span>
      ) : cell.getValue() === "closed" ? (
        <span className="badge bg-danger-subtle text-danger text-uppercase">
          {cell.getValue()}
        </span>
      ) : null}
    </React.Fragment>
  );
};

export { Type, Quantity, OrderValue, Roi, Price, Status, Amount };
