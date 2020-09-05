import React, { useReducer } from "react";
import { signup, signin, logout } from "../../auth/apiAuth";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: null,
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = () => {
    if (typeof window !== "undefined" && localStorage.getItem("jwt")) {
      try {
        console.log("LOAD USER JWT", localStorage.getItem("jwt"));
        dispatch({
          type: USER_LOADED,
          payload: localStorage.getItem("jwt"),
        });
      } catch (err) {
        dispatch({ type: AUTH_ERROR, payload: err });
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
      loadUser();
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
      console.log("LOGIN TOKEN", token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: token,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err,
      });
    }
  };

  //Logout a user
  const signOut = async () => {
    const response = await logout();
    console.log("LOGOUT RESPONSE", response);
    try {
      dispatch({
        type: LOGOUT,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
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
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        loadUser,
        register,
        login,
        signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
