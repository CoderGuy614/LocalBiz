import React, { useState, useEffect } from "react";
import * as queryString from "query-string";
import axios from "axios";

const LoginSuccess = () => {
  const [token, setToken] = useState(null);

  const urlParams = queryString.parse(window.location.search);
  console.log(`The code is: ${urlParams.code}`);

  useEffect(() => {
    getAccessTokenFromCode(urlParams.code).then((token) => setToken(token));
  }, []);

  const getAccessTokenFromCode = async (code) => {
    const { data } = await axios({
      url: "https://graph.facebook.com/v4.0/oauth/access_token",
      method: "get",
      params: {
        client_id: process.env.REACT_APP_ID,
        client_secret: process.env.REACT_APP_SECRET,
        redirect_uri: "https://localhost:3000/authenticate/facebook/",
        code,
      },
    });
    console.log(data); // { access_token, token_type, expires_in }
    return data.access_token;
  };

  return <div>LOGGED IN SUCCESFULLY! The code is {urlParams.code}</div>;
};

export default LoginSuccess;
