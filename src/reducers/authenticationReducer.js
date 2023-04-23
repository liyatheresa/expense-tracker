import { AUTHENTICATION_ACTION_TYPES } from "../Constants";

const initState = {
  users: [
    {
      name: "Liya Theresa",
      contactNumber: 9447355144,
      mailId: "liya.theresa@gmail.com",
      password: "abc",
      id: crypto.randomUUID(),
    },
  ],
  isAuthenticated: false,
  loggedInUserMailId: "",
};

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case AUTHENTICATION_ACTION_TYPES.LOGIN:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        loggedInUserMailId: action.payload.loggedInUserMailId,
      };
    case AUTHENTICATION_ACTION_TYPES.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loggedInUserMailId: null,
      };
    case AUTHENTICATION_ACTION_TYPES.SETLOGGEDIN:
      return { ...state, isAuthenticated: true };
    case AUTHENTICATION_ACTION_TYPES.ADD_NEW_USER:
      let userData = {
        name: action.payload.name,
        contactNumber: action.payload.contactNumber,
        mailId: action.payload.mailId,
        password: action.payload.password,
      };
      return { ...state, users: [...state.users, userData] };
    default:
      return state;
  }
};

export default loginReducer;
