import React, { useContext, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { loadUser, isAuthenticated } = authContext;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
    setLoading(false);
  }, [isAuthenticated]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!loading) {
          if (!isAuthenticated) {
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

export default PrivateRoute;
