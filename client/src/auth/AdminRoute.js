import React, { useContext, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { user, loadUser, isAuthenticated } = authContext;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
    setLoading(false);
    //eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!loading) {
          if ((user && user.role !== 1) || !isAuthenticated) {
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            );
          } else {
            return <Component {...props} />;
          }
        }
      }}
    />
  );
};

export default AdminRoute;
