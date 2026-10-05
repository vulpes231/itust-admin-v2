import { format } from "date-fns";
import numeral from "numeral";

export const PlanName = ({ cell }) => {
  return <div>{cell.getValue()}</div>;
};

export const PlanBalance = ({ cell }) => {
  return <div>{numeral(cell.getValue()).format("$0,0.00")}</div>;
};

export const PlanReturn = ({ cell }) => {
  return <div>{numeral(cell.getValue()).format("$0,0.00")}</div>;
};

export const PlanRisk = ({ cell }) => {
  return <div>{cell.getValue()}</div>;
};

export const PlanStatus = ({ cell }) => {
  const status = cell.getValue();
  return (
    <div
      className={`${status === "active" ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"} px-1 fs-10 text-center text-capitalize`}
    >
      {status}
    </div>
  );
};

export const StartDate = ({ cell }) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <span style={{ lineHeight: 0.8 }}>
        {format(cell.getValue(), "MMM dd, yyyy")}
      </span>
      <sub style={{ lineHeight: 0.8 }} className="text-muted fs-10">
        {format(cell.getValue(), "hh:mm a")}
      </sub>
    </div>
  );
};
export const EndDate = ({ cell }) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <span style={{ lineHeight: 0.8 }}>
        {format(cell.getValue(), "MMM dd, yyyy")}
      </span>
      <sub style={{ lineHeight: 0.8 }} className="text-muted fs-10">
        {format(cell.getValue(), "hh:mm a")}
      </sub>
    </div>
  );
};
