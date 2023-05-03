export const APPLICATION_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTRATION: "/registration",
  DASHBOARD: "/dashboard",
  INDIVIDUAL_EXPENSES: "/individual-expenses",
};
export const AUTHENTICATION_ACTION_TYPES = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SETLOGGEDIN: "SETLOGGEDIN",
  ADD_NEW_USER: "ADD_NEW_USER",
};
export const AUTH_STATUS_KEY = "AUTH_STATUS_KEY";
export const EXPENSE_TYPES = {
  FOOD: "Food",
  TRANSPORTATION: "Transportation",
  SHOPPING: "Shopping",
  ACCOMMODATION: "Accommodation",
  MEDICAL: "Medical",
};
export const EXPENSES_ACTION_TYPES = {
  ADD_NEW_EXPENSE: "ADD_NEW_EXPENSE",
  UPDATE_EXPENSE_TYPE: "UPDATE_EXPENSE_TYPE",
  UPDATE_EXPENSE_AMOUNT: "UPDATE_EXPENSE_AMOUNT",
  UPDATE_EXPENSES: "UPDATE_EXPENSES",
  NAVIGATE_TO_INDIVIDUAL_EXPENSES_PAGE: "NAVIGATE_TO_INDIVIDUAL_EXPENSES_PAGE",
  SET_USER_NAMES: "SET_USER_NAMES",
  CLEAR_EXPENSES: "CLEAR_EXPENSES",
  SET_USER_EXPENSES: "SET_USER_EXPENSES",
  ADD_TOTAL_EXPENSE: "ADD_TOTAL_EXPENSE",
  SET_IS_EXPENSE_TABLE_VISIBLE: "SET_IS_EXPENSE_TABLE_VISIBLE",
  SET_IS_PEOPLE_COUNT_FORM_VISIBLE: "SET_IS_PEOPLE_COUNT_FORM_VISIBLE",
  SET_IS_PEOPLE_NAME_FORM_VISIBLE: "SET_IS_PEOPLE_NAME_FORM_VISIBLE",
  CLEAR_USERS: "CLEAR_USERS",
};
export const EXPENSE_TYPE_COLOR = {
  FOOD: "#0FA3B1",
  TRANSPORTATION: "#8C2155",
  SHOPPING: "#F7A072",
  ACCOMMODATION: "#BBA0CA",
  MEDICAL: "#AB09CA",
};

export const mongoAtlasUri =
  "mongodb+srv://liyatheresa:FLWpIDCo1DFWUVz9@cluster0.vfpukqp.mongodb.net/?retryWrites=true&w=majority";
