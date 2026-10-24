import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Alert, Col, Spinner } from "reactstrap";
import { approveWalletConnection } from "../../services/users";

const ManageConnection = ({ settings }) => {
  const [action, setAction] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: approveWalletConnection,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setAction("");
      window.location.reload();
    },
  });

  const handleSubmit = (act) => {
    console.log(act);
    setAction(act);

    const form = { action: act, userId: settings?.userId };
    mutation.mutate(form);
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
    <Col md={6}>
      {settings?.wallet?.status === "pending" && (
        <div className=" mt-3 d-flex flex-column gap-2">
          {error && <Alert className="text-danger">{error}</Alert>}
          {mutation.isSuccess && (
            <Alert className="text-success">Connection success</Alert>
          )}
          <div className="bg-light d-flex gap-2 p-4">
            <button
              className="btn btn-secondary d-flex align-items-center gap-2 justify-content-center"
              onClick={() => {
                handleSubmit("accept");
              }}
              disabled={mutation.isPending && action === "accept"}
            >
              {mutation.isPending && action === "accept" && (
                <Spinner size={"sm"} />
              )}
              Accept
            </button>
            <button
              className="btn btn-danger d-flex align-items-center gap-2 justify-content-center"
              onClick={() => {
                handleSubmit("reject");
              }}
              disabled={mutation.isPending && action === "reject"}
            >
              {mutation.isPending && action === "reject" && (
                <Spinner size={"sm"} />
              )}
              Reject
            </button>
          </div>
        </div>
      )}
    </Col>
  );
};

export default ManageConnection;
