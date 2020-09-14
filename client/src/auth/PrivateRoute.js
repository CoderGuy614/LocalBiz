import React, { useContext, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { loadUser, user, token, isAuthenticated } = authContext;

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
          if (!isAuthenticated) {
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            );
          } else {
            return (
              <Component
                authUserId={user._id}
                token={token}
                isAuthenticated={isAuthenticated}
                {...props}
              />
            );
          }
        }
      }}
    />
  );
};

export default PrivateRoute;
