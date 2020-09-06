import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loadUser, loading } = authContext;

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated || loading ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
