import React, { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import { liveServer } from "../../config";
import { useMutation } from "@tanstack/react-query";
import { verifyUserAddress } from "../../services/users";
import ErrorToast from "../../Components/Common/ErrorToast";
import SuccessToast from "../../Components/Common/SuccessToast";

const ApproveAddressOptions = ({ user }) => {
  const [error, setError] = useState("");

  const verifyAccountAddress = useMutation({
    mutationFn: verifyUserAddress,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    },
  });

  const handleSubmit = (actionType) => {
    if (!actionType) {
      setError("Incomplete data!");
      return;
    }
    const data = { action: actionType, userId: user._id };

    verifyAccountAddress.mutate(data);
  };

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [error]);

  return (
    <div>
      <hr />

      <h6>Document Type: {user?.contactInfo?.idType}</h6>
      <h6>Verification status: {user?.contactInfo?.status}</h6>
      <img
        src={`${liveServer}${user?.contactInfo?.docPath}`}
        alt="Document"
        style={{
          width: "100%",
          height: "100px",
          objectFit: "cover",
        }}
      />
      <div className="d-flex align-items-center gap-2 ">
        <button
          className="btn btn-success "
          onClick={() => handleSubmit("accept")}
          disabled={
            verifyAccountAddress.isPending ||
            user?.contactInfo?.status !== "pending"
          }
        >
          {verifyAccountAddress.isPending &&
          verifyAccountAddress.variables?.action === "accept" ? (
            <Spinner size="sm" />
          ) : (
            "Accept"
          )}
        </button>
        <button
          type="button"
          className="btn btn-danger "
          onClick={() => handleSubmit("reject")}
          disabled={
            verifyAccountAddress.isPending ||
            user?.contactInfo?.status !== "pending"
          }
        >
          {verifyAccountAddress.isPending &&
          verifyAccountAddress.variables?.action === "reject" ? (
            <Spinner size="sm" />
          ) : (
            "Reject"
          )}
        </button>
      </div>
      {error && <ErrorToast errMsg={error} onClose={() => setError("")} />}
      {error && (
        <SuccessToast
          msg={"Account updated"}
          onClose={() => verifyAccountAddress.reset()}
        />
      )}
    </div>
  );
};

export default ApproveAddressOptions;
