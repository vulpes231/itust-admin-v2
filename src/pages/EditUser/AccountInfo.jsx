import { capitalize } from "lodash";
import React, { useEffect, useState } from "react";
import { Label } from "reactstrap";
import { FaToggleOn, FaToggleOff } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { banUser } from "../../services/userSettings";
import ErrorToast from "../../Components/Common/ErrorToast";
import SuccessToast from "../../Components/Common/SuccessToast";

const AccountInfo = ({ user }) => {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: banUser,
    onError: (err) => setError(err.message),
  });

  const handleBan = (e) => {
    e.preventDefault();
    if (!user) {
      setError("User ID required!");
      return;
    }
    const userId = user._id;
    mutation.mutate(userId);
  };

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [error]);

  useEffect(() => {
    if (mutation.isSuccess) {
      const tmt = setTimeout(() => {
        mutation.reset();
        window.location.reload();
      }, 1000);
      return () => clearTimeout(tmt);
    }
  }, [mutation.isSuccess]);

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
              <button
                style={{ border: "none", background: "transparent" }}
                onClick={handleBan}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <FaToggleOn size={30} style={{ color: "grey" }} />
                ) : (
                  <FaToggleOn size={30} style={{ color: "green" }} />
                )}
              </button>
            ) : (
              <button
                style={{ border: "none", background: "transparent" }}
                onClick={handleBan}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <FaToggleOff size={30} style={{ color: "black" }} />
                ) : (
                  <FaToggleOff size={30} style={{ color: "grey" }} />
                )}
              </button>
            )}
          </span>
        </div>
      </div>
      {error && (
        <ErrorToast
          errMsg={error}
          onClose={() => setError("")}
          isOpen={error !== ""}
        />
      )}
      {mutation.isSuccess && (
        <SuccessToast
          msg={"Ban Updated."}
          onClose={() => mutation.reset()}
          isOpen={mutation.isSuccess}
        />
      )}
    </React.Fragment>
  );
};

export default AccountInfo;
