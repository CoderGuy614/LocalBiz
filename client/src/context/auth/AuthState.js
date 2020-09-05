import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import { USER_LOADED, AUTH_ERROR } from "../types";

const AuthState = (props) => {
  const initialState = {
    token: null,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = () => {
    if (typeof window !== "undefined" && localStorage.getItem("jwt")) {
      try {
        dispatch({
          type: USER_LOADED,
          payload: localStorage.getItem("jwt"),
        });
      } catch (err) {
        dispatch({ type: AUTH_ERROR });
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        error: state.error,
        loadUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
