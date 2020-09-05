import {
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../types";
import { setJwt } from "../../auth/apiAuth";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        token: JSON.parse(action.payload).token,
        user: JSON.parse(action.payload).user,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      setJwt(action.payload);
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
