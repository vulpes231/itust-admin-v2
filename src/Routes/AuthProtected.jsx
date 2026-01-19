import React, { useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";
import { setAuthorization } from "../helpers/api_helper";
import { useProfile } from "../Components/Hooks/UserHooks";
import { useMutation } from "@tanstack/react-query";
import { logoutAdmin } from "../services/auth";

const AuthProtected = (props) => {
  const { token } = useProfile();
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: logoutAdmin,
    onError: (err) => setError(err.message),
  });

  useEffect(() => {
    if (token) {
      setAuthorization(token);
    } else if (!token) {
      mutation.mutate();
    }
  }, [token]);

  /*
    Navigate is un-auth access protected routes via url
    */

  if (!token) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {" "}
            <Component {...props} />{" "}
          </>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
