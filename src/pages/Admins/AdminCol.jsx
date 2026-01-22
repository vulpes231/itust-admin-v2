import React from "react";

const Role = (cell) => {
  return (
    <React.Fragment>
      {cell.getValue()?.includes("0001") ? (
        <span className="type text-danger">Super User</span>
      ) : (
        <span className="type text-warning">Moderator</span>
      )}
    </React.Fragment>
  );
};

const Email = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};

const Status = (cell) => {
  return (
    <React.Fragment>
      {cell.getValue() === "Pending" ? (
        <span className="badge bg-warning-subtle text-warning text-uppercase">
          {cell.getValue()}
        </span>
      ) : cell.getValue() === "Successful" ? (
        <span className="badge bg-success-subtle text-success text-uppercase">
          {cell.getValue()}
        </span>
      ) : cell.getValue() === "Cancelled" ? (
        <span className="badge bg-danger-subtle text-danger text-uppercase">
          {cell.getValue()}
        </span>
      ) : null}
    </React.Fragment>
  );
};

export { Role, Email, Status };
