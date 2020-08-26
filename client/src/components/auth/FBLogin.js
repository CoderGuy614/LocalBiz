import React from "react";
import Button from "react-bootstrap/Button";

import * as queryString from "query-string";

const FBLogin = () => {
  const stringifiedParams = queryString.stringify({
    client_id: `${process.env.REACT_APP_ID}`,
    redirect_uri: "https://localhost:3000/authenticate/facebook/",
    scope: ["email", "user_friends"].join(","), // comma seperated string
    response_type: "code",
    auth_type: "rerequest",
    display: "popup",
  });

  const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;

  return (
    <div>
      <Button block href={facebookLoginUrl} className="mb-4">
        Continue With Facebook{" "}
        <i className="fab fa-facebook-square" style={{ marginLeft: "5px" }}></i>
      </Button>
    </div>
  );
};

export default FBLogin;
