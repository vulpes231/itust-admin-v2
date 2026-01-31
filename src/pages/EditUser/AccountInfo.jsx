import { capitalize } from "lodash";
import React from "react";
import { Label } from "reactstrap";
import { FaToggleOn, FaToggleOff } from "react-icons/fa6";

const AccountInfo = ({ user }) => {
  return (
    <React.Fragment>
      <div>
        <h5 className="fs-20 mb-4 mt-4">Account Information</h5>
        <div className="d-flex justify-content-between">
          <Label>Email Verified</Label>
          <span>
            {user?.accountStatus?.emailVerified === true
              ? "Verified"
              : "Not Verified"}
          </span>
        </div>
        <div className="d-flex justify-content-between">
          <Label>Account Verification</Label>
          <span>{capitalize(user?.identityVerification?.kycStatus)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <Label>Status</Label>
          <span>{capitalize(user?.accountStatus?.status)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <Label>Ban</Label>
          <span>
            {user?.accountStatus?.banned === true ? (
              <FaToggleOn size={30} style={{ color: "green" }} />
            ) : (
              <FaToggleOff size={30} style={{ color: "grey" }} />
            )}
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AccountInfo;
