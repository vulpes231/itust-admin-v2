import React, { useEffect } from "react";
import { Label } from "reactstrap";
import { FaToggleOn, FaToggleOff } from "react-icons/fa6";

const Settings = ({ settings }) => {
  // useEffect(() => {
  //   if (settings) {
  //     console.log(settings);
  //   }
  // }, [settings]);
  return (
    <React.Fragment>
      <div>
        <h5 className="fs-20 mb-4 mt-4">User Settings</h5>
        <div className="d-flex justify-content-between">
          <Label>Drip Mode</Label>
          <span>
            {settings?.trading?.isDripEnabled === true ? "On" : "Off"}
          </span>
        </div>
        <div className="d-flex justify-content-between">
          <Label>Options Mode</Label>
          <span>
            {settings?.trading?.isOptionsEnabled === true ? "On" : "Off"}
          </span>
        </div>
        <div className="d-flex justify-content-between">
          <Label>Wallet Connected</Label>
          <span>{settings?.wallet?.isConnected === true ? "Yes" : "No"}</span>
        </div>
        <div className="d-flex justify-content-between">
          <Label>Bank Deposit Lock</Label>
          <span>
            {settings?.locks?.bankDeposit?.isLocked === true ? (
              <FaToggleOn size={30} style={{ color: "green" }} />
            ) : (
              <FaToggleOff size={30} style={{ color: "grey" }} />
            )}
          </span>
        </div>
        <div className="d-flex justify-content-between">
          <Label>Cash Deposit Lock</Label>
          <span>
            {settings?.locks?.cash?.isLocked === true ? (
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

export default Settings;
