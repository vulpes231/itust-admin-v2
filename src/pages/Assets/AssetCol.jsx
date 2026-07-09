import numeral from "numeral";
import React from "react";

const AssetName = (cell) => {
  const img = cell.row.original.imageUrl;
  return (
    <React.Fragment>
      <div className="d-flex align-items-center gap-2">
        <img
          src={img}
          alt=""
          style={{ width: "30px", borderRadius: "50%" }}
          className="p-1 bg-light"
        />
        <span>{cell.getValue()}</span>
      </div>
    </React.Fragment>
  );
};
const Symbol = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};
const CurrentPrice = (cell) => {
  return (
    <React.Fragment>
      {numeral(cell.getValue()).format("$0,0.00")}
    </React.Fragment>
  );
};
const Volume = (cell) => {
  return (
    <React.Fragment>
      {numeral(cell.getValue()).format("$0,0.00")}
    </React.Fragment>
  );
};
const DailyChange = (cell) => {
  return (
    <React.Fragment>
      {numeral(cell.getValue()).format("$0,0.00")}
    </React.Fragment>
  );
};
const ChangePercent = (cell) => {
  const percent = cell.getValue();
  return (
    <React.Fragment>
      <span className={percent < 0 ? "text-danger" : "text-success"}>
        {parseFloat(percent).toFixed(2)}%
      </span>
    </React.Fragment>
  );
};

export { AssetName, Symbol, CurrentPrice, Volume, DailyChange, ChangePercent };
