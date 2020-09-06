import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { user, loadUser, loading } = authContext;

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        (user && user.role == 1) || loading ? (
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

export default AdminRoute;
