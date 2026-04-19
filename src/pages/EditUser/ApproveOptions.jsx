import React from "react";
import { Spinner } from "reactstrap";

const ApproveOptions = ({
  verifyInfo,
  approveMutation,
  acceptVerfication,
  liveServer,
  rejectMutation,
  cancelMutation,
  rejectVerfication,
  deleteVerification,
  kycStatus,
}) => {
  // console.log(verifyInfo);
  return (
    <div className="d-flex flex-column gap-2">
      <div className="d-flex align-items-center gap-2">
        {verifyInfo?.frontId && (
          <img
            className="border border-1 rounded-1"
            style={{
              width: verifyInfo?.backId ? "100%" : "50%",
              height: "100px",
            }}
            src={`${liveServer}${verifyInfo?.frontId}`}
            alt="Front ID"
          />
        )}
        {verifyInfo?.backId && (
          <img
            className="border border-1 rounded-1"
            style={{ width: "100%", height: "100px" }}
            src={`${liveServer}${verifyInfo?.backId}`}
            alt="Back ID"
            // width={100}
          />
        )}
      </div>
      {kycStatus !== "not verified" && (
        <div className="d-flex gap-2">
          <button
            disabled={
              verifyInfo?.status === "approved" ||
              verifyInfo?.status === "failed"
            }
            onClick={acceptVerfication}
            className="btn btn-secondary w-100 d-flex align-items-center justify-content-center gap-2"
          >
            {approveMutation.isPending && <Spinner size={"sm"} />}
            Approve
          </button>
          <button
            onClick={rejectVerfication}
            disabled={
              verifyInfo?.status === "approved" ||
              verifyInfo?.status === "failed"
            }
            className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2"
          >
            {rejectMutation.isPending && <Spinner size={"sm"} />}
            Reject
          </button>
          <button
            onClick={deleteVerification}
            className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2"
          >
            {cancelMutation.isPending && <Spinner size={"sm"} />}
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ApproveOptions;
