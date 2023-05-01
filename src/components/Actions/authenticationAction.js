import { AUTHENTICATION_ACTION_TYPES } from "../../Constants";

export const loginAction = (userId, userName) => {
  return {
    type: AUTHENTICATION_ACTION_TYPES.LOGIN,
    payload: {
      loggedInUserId: userId,
      loggedInUserName: userName,
    },
  };
};

export const logoutAction = () => {
  return {
    type: AUTHENTICATION_ACTION_TYPES.LOGOUT,
  };
};

export const setLoggedIn = () => {
  return {
    type: AUTHENTICATION_ACTION_TYPES.SETLOGGEDIN,
    payload: { isAuthenticated: true },
  };
};
