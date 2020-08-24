import React, { useState, useEffect } from "react";
import * as queryString from "query-string";
import axios from "axios";

const LoginSuccess = () => {
  const [user, setUser] = useState(null);

  const urlParams = queryString.parse(window.location.search);
  console.log(`The code is: ${urlParams.code}`);

  useEffect(() => {
    getAccessTokenFromCode(urlParams.code).then((token) => {
      getFacebookUserData(token).then((user) => setUser(user));
    });
  }, []);

  useEffect(() => {
    if (user) {
      checkCurrentUser(user.email).then((response) =>
        console.log(response.data.user)
      );
    }
  }, [user]);

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

  const getFacebookUserData = async (access_token) => {
    const { data } = await axios({
      url: "https://graph.facebook.com/me",
      method: "get",
      params: {
        fields: ["id", "email", "first_name", "last_name"].join(","),
        access_token: access_token,
      },
    });
    console.log(data); // { id, email, first_name, last_name }
    return data;
  };

  const checkCurrentUser = async (email) => {
    const isRegistered = await axios.get(
      `${process.env.REACT_APP_API}/checkStatus?email=${email}`
    );
    return isRegistered;
  };

  return (
    <div>
      {user ? `${user.email} Logged in with Facebook` : "Welcome Guest!"}
    </div>
  );
};

export default LoginSuccess;
