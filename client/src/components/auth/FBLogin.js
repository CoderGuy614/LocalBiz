import React, { useState } from "react";
import { FacebookProvider, LoginButton } from "react-facebook";

const FBLogin = () => {
  const [error, setError] = useState("");
  const handleResponse = (data) => {
    console.log(data);
  };

  const handleError = (error) => {
    setError({ error });
  };

  return (
    <FacebookProvider appId="1684933758328613">
      <LoginButton
        scope="email"
        onCompleted={handleResponse}
        onError={handleError}
        className="btn btn-secondary mb-4 btn-block"
      >
        <span>
          Continue With Facebook
          <i
            className="fab fa-facebook-square"
            style={{ marginLeft: "5px" }}
          ></i>
        </span>
      </LoginButton>
    </FacebookProvider>
  );
};

export default FBLogin;
