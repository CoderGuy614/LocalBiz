import React from "react";
import Button from "react-bootstrap/Button";

import * as queryString from "query-string";

const FBLogin2 = () => {
  const stringifiedParams = queryString.stringify({
    client_id: `${process.env.REACT_APP_ID}`,
    redirect_uri: "https://localhost:3000/authenticate/facebook/",
    scope: ["email", "public_profile", "user_friends"].join(","), // comma seperated string
    response_type: "code",
    auth_type: "rerequest",
    display: "popup",
  });

  const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;

  return (
    <div
      className="fb-login-button"
      data-size="large"
      data-button-type="continue_with"
      data-layout="default"
      data-auto-logout-link="false"
      data-use-continue-as="false"
      data-width=""
    ></div>
  );
};

export default FBLogin2;
