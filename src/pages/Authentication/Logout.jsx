import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import withRouter from "../../Components/Common/withRouter";
import { useMutation } from "@tanstack/react-query";
import { logoutAdmin } from "../../services/admin";

const Logout = (props) => {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: logoutAdmin,
    onError: (err) => setError(err.message),
  });

  if (mutation.isSuccess) {
    return <Navigate to="/login" />;
  }

  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Logout);
