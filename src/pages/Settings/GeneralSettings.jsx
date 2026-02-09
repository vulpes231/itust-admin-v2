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
import ErrorToast from "../../Components/Common/ErrorToast";
import SuccessToast from "../../Components/Common/SuccessToast";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { getSettings } from "../../services/generalSettings";

const GeneralSettings = () => {
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [error, setError] = useState("");

  const tk = getAccessToken();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
    }),
  });

  const mutation = useMutation({
    mutationFn: verifyuserAccount,
    onError: (err) => setError(err.message),
  });

  const { data: settings } = useQuery({
    queryFn: getSettings,
    queryKey: ["globalWalletSettings"],
    enabled: !!tk,
  });

  const handleSubmit = (e, act) => {
    e.preventDefault();
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

  // useEffect(() => {
  //   if (settings) console.log(settings);
  // }, [settings]);

  return (
    <React.Fragment>
      <div>
        <div></div>
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
    </React.Fragment>
  );
};

export default GeneralSettings;
