import { USER_LOADED, AUTH_ERROR } from "../types";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        token: JSON.parse(action.payload).token,
        user: JSON.parse(action.payload).user,
      };
    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        user: null,
        error: true,
      };
    default:
      return state;
  }
};
