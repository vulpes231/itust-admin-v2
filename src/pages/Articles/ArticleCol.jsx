import React from "react";

const Title = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};
const Category = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};
const Identity = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};
const Info = (cell) => {
  return <React.Fragment>{cell.getValue()?.slice(0, 30)}...</React.Fragment>;
};

export { Title, Category, Identity, Info };
