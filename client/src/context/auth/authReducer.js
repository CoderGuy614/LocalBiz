import {
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../types";
import { setJwt } from "../../auth/apiAuth";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        token: JSON.parse(action.payload).token,
        user: JSON.parse(action.payload).user,
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        user: null,
        error: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      setJwt(action.payload);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};
