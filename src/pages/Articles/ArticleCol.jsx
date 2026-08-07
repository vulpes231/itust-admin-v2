import React from "react";
import { devServer, liveServer } from "../../config";

const Title = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};
const Category = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};
const Identity = (cell) => {
  return (
    <React.Fragment>
      <span>
        <img
          src={`${devServer}${cell.getValue()}`}
          alt=""
          style={{ width: "30px", height: "30px" }}
          className="rounded-circle"
        />
      </span>
    </React.Fragment>
  );
};
const Info = (cell) => {
  return <React.Fragment>{cell.getValue()?.slice(0, 30)}...</React.Fragment>;
};

export { Title, Category, Identity, Info };
