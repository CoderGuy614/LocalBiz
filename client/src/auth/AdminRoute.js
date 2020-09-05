import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { user, isAuthenticated, loadUser, loading } = authContext;

  // useEffect(() => {
  //   loadUser();
  // }, [user]);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && !user && !loading ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AdminRoute;
