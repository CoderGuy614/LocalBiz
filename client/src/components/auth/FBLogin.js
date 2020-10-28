import React, { useState, useEffect, useContext } from "react";
import { FacebookProvider, LoginButton } from "react-facebook";
import axios from "axios";
import AuthContext from "../../context/auth/authContext";

const FBLogin = () => {
  const authContext = useContext(AuthContext);
  const { register, login } = authContext;
  const [user, setUser] = useState(null);
  const handleResponse = (data) => {
    console.log(data);
    if (data.profile) {
      setUser(data.profile);
    }
  };

  const handleError = (error) => {
    console.log(error);
  };

  useEffect(() => {
    if (user && user.email) {
      checkExisting(user.email);
    }
    //eslint-disable-next-line
  }, [user]);

  //Checks if the user has already signed up before, if not it adds them to the DB with their FB account info.
  const checkExisting = async (email) => {
    const isExisting = await axios.get(
      `${process.env.REACT_APP_API_URL}/checkExisting?email=${email}`
    );
    if (!isExisting.data) {
      signupNewFacebookUser();
    } else {
      login({ email: user.email, password: user.id });
      return isExisting;
    }
  };

  const signupNewFacebookUser = () => {
    const name = user.name;
    const password = user.id;
    const email = user.email;
    const avatar = user.picture.data.url;
    const fbSignup = true;
    register({ name, email, password, fbSignup, avatar });
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
