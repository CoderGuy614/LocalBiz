import React, { useReducer } from "react";
import { signup, signin } from "../../auth/apiAuth";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: null,
    isAuthenticated: true,
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

  //Register User
  const register = async (user) => {
    try {
      const token = await signup(user);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: token,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err,
      });
    }
  };

  //Login User
  const login = async (user) => {
    try {
      const token = await signin(user);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: token,
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        loadUser,
        register,
        login,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
