import React, { useEffect, useState } from "react";
import {
  getVerificationDetails,
  verifyuserAccount,
} from "../../services/verification";
import { getAccessToken } from "../../helpers/api_helper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Col, Input, Label, Row, Spinner } from "reactstrap";
import { useFormik } from "formik";
import { format } from "date-fns";

import * as Yup from "yup";
import { devServer, liveServer } from "../../config";
import ErrorToast from "../../Components/Common/ErrorToast";
import SuccessToast from "../../Components/Common/SuccessToast";

const Verification = ({ user }) => {
  const tk = getAccessToken();
  const userId = user?._id;

  const [error, setError] = useState("");

  const { data: verifyInfo } = useQuery({
    queryFn: () => getVerificationDetails(userId),
    queryKey: ["verifyInfo"],
    enabled: !!tk && !!user,
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: verifyInfo?.fullname || "",
      idType: verifyInfo?.idType || "",
      status: verifyInfo?.status || "",
      idNumber: verifyInfo?.idNumber || "",
      frontId: verifyInfo?.frontId || "",
      backId: verifyInfo?.backId || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
    }),
  });

  const mutation = useMutation({
    mutationFn: verifyuserAccount,
    onError: (err) => setError(err.message),
  });

  const handleSubmit = (e, act) => {
    e.preventDefault();
    if (!verifyInfo || !userId || !act) {
      setError("Incomplete data!");
      return;
    }
    const data = {
      action: act,
      verifyId: verifyInfo._id,
      userId: userId,
    };
    console.log(data);
    mutation.mutate(data);
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
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [mutation.isSuccess]);
  return (
    <React.Fragment>
      {user?.identityVerification?.kycStatus !== "not verified" && (
        <div>
          <h5 className="fs-20 mb-4 mt-4">Verification Information</h5>
          <div className="mb-3">
            <Row>
              <Col md={6}>
                <Label htmlFor="idType">ID Type</Label>
                <Input
                  value={validation.values.idType}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  readOnly
                  name="idType"
                />
              </Col>
              <Col md={6}>
                <Label htmlFor="idNumber">ID Number</Label>
                <Input
                  value={validation.values.idNumber}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  readOnly
                  name="idNumber"
                />
              </Col>
            </Row>
          </div>
          <div className="mb-3">
            <Row>
              <Col md={6}>
                <Label htmlFor="idType">Full Name</Label>
                <Input
                  value={validation.values.fullName}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  readOnly
                  name="fullname"
                />
              </Col>
              <Col md={6}>
                <Label htmlFor="status">Status</Label>
                <Input
                  value={validation.values.status}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  readOnly
                  name="status"
                />
              </Col>
            </Row>
          </div>
          <div className="mb-3 mt-4 ">
            <Col>
              <Col className="d-flex align-items-center justify-content-between gap-2 p-2">
                <Label htmlFor="idType">Front ID</Label>
                <figure
                  style={{ width: "100px", height: "60px" }}
                  className="bg-info-subtle d-flex align-items-center justify-content-center"
                >
                  <img
                    src={`${liveServer}${verifyInfo?.frontId}`}
                    alt="front-id"
                    width={40}
                    height={40}
                  />
                </figure>
              </Col>
              <Col className="d-flex align-items-center justify-content-between gap-2 p-2">
                <Label htmlFor="status">Back ID</Label>

                <figure
                  style={{ width: "100px", height: "60px" }}
                  className="bg-info-subtle d-flex align-items-center justify-content-center"
                >
                  <img
                    src={`${liveServer}${verifyInfo?.backId}`}
                    alt="back-id"
                    width={40}
                    height={40}
                  />
                </figure>
              </Col>
            </Col>
          </div>

          {verifyInfo && verifyInfo.status === "pending" && (
            <Row>
              <Col md={6}>
                <button
                  type="button"
                  disabled={mutation.isPending}
                  className="btn btn-success w-100"
                  onClick={(e) => handleSubmit(e, "approve")}
                >
                  {mutation.isPending ? (
                    <Spinner size="sm" className="me-2">
                      Loading...
                    </Spinner>
                  ) : null}
                  Approve
                </button>
              </Col>
              <Col md={6}>
                <button
                  type="button"
                  disabled={mutation.isPending}
                  className="btn btn-danger w-100"
                  onClick={(e) => handleSubmit(e, "reject")}
                >
                  {mutation.isPending ? (
                    <Spinner size="sm" className="me-2">
                      Loading...
                    </Spinner>
                  ) : null}
                  Reject
                </button>
              </Col>
            </Row>
          )}
          {error && (
            <ErrorToast
              errMsg={error}
              onClose={() => setError("")}
              isOpen={error !== ""}
            />
          )}
          {mutation.isSuccess && (
            <SuccessToast
              msg={"Account Verified."}
              onClose={() => mutation.reset()}
              isOpen={mutation.isSuccess}
            />
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default Verification;
