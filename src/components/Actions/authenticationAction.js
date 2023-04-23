import { AUTHENTICATION_ACTION_TYPES } from "../../Constants";

export const loginAction = (mailId) => {
  return {
    type: AUTHENTICATION_ACTION_TYPES.LOGIN,
    payload: {
      isAuthenticated: true,
      loggedInUserMailId: mailId,
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
export const addNewUser = (name, contactNumber, mailId, password) => {
  return {
    type: AUTHENTICATION_ACTION_TYPES.ADD_NEW_USER,
    payload: {
      name: name,
      contactNumber: contactNumber,
      mailId: mailId,
      password: password,
    },
  };
};
