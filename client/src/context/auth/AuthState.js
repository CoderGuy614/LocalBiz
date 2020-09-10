import React, { useReducer } from "react";
import { signup, signin, isAuthenticated, logout } from "../../auth/apiAuth";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  USER_LOADED,
  AUTH_ERROR,
  CLEAR_ERRORS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_LOADING,
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

  //Register User

  const register = async (user) => {
    setLoading();
    try {
      const response = await signup(user);
      if (response.error) {
        dispatch({
          type: REGISTER_FAIL,
          payload: response.error,
        });
      } else {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: response,
        });
        loadUser();
      }
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err,
      });
    }
  };

  //Login User
  const login = async (user) => {
    setLoading();
    const response = await signin(user);
    if (response.error) {
      console.log(response.error);
      return dispatch({
        type: LOGIN_FAIL,
        payload: response.error,
      });
    }
    try {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err,
      });
    }
  };

  //Check For Token - Authenticate a user
  const loadUser = () => {
    setLoading();
    const isAuth = isAuthenticated();
    try {
      dispatch({
        type: USER_LOADED,
        payload: isAuth,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err,
      });
    }
  };

  //Logout a user
  const signOut = async () => {
    setLoading();
    const response = await logout();
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

  // Clear Errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

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
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
