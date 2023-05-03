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
  loggedInUserId: "",
  loggedInUserName: "",
};

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case AUTHENTICATION_ACTION_TYPES.LOGIN:
      return {
        ...state,
        loggedInUserId: action.payload.loggedInUserId,
        loggedInUserName: action.payload.loggedInUserName,
      };
    default:
      return state;
  }
};

export default loginReducer;
