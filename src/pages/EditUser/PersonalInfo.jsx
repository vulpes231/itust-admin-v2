import React from "react";

const PersonalInfo = () => {
  return (
    <div>
      {" "}
      <h5 className="fs-15 mb-3">Personal Details</h5>
      <div className="mb-3">
        <p className="text-muted text-uppercase fw-medium fs-13 mb-1">Number</p>
        <h6>+(256) 2451 8974</h6>
      </div>
      <div className="mb-3">
        <p className="text-muted text-uppercase fw-medium fs-13 mb-1">Email</p>
        <h6>lisaparker@gmail.com</h6>
      </div>
      <div>
        <p className="text-muted text-uppercase fw-medium fs-13 mb-1">
          Location
        </p>
        <h6 className="mb-0">California, USA</h6>
      </div>
    </div>
  );
};

export default PersonalInfo;
