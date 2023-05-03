import { EXPENSES_ACTION_TYPES } from "../../Constants";

export const addNewExpense = (newExpense) => {
  return {
    type: EXPENSES_ACTION_TYPES.ADD_NEW_EXPENSE,
    payload: newExpense,
  };
};
export const updateExpense = (newExpenses) => {
  return {
    type: EXPENSES_ACTION_TYPES.UPDATE_EXPENSE_TYPE,
    payload: newExpenses,
  };
};
export const updateAmount = (newExpenses) => {
  return {
    type: EXPENSES_ACTION_TYPES.UPDATE_EXPENSE_AMOUNT,
    payload: newExpenses,
  };
};
export const updateExpenses = (newExpenses) => {
  return {
    type: EXPENSES_ACTION_TYPES.UPDATE_EXPENSES,
    payload: newExpenses,
  };
};
export const navigateToIndividualExpensesPage = () => {
  return {
    type: EXPENSES_ACTION_TYPES.NAVIGATE_TO_INDIVIDUAL_EXPENSES_PAGE,
  };
};
export const addUserNames = (usernames) => {
  return {
    type: EXPENSES_ACTION_TYPES.SET_USER_NAMES,
    payload: usernames,
  };
};
export const clearExpenses = () => {
  return {
    type: EXPENSES_ACTION_TYPES.CLEAR_EXPENSES,
  };
};
export const setUserExpenses = (userExpenses) => {
  return {
    type: EXPENSES_ACTION_TYPES.SET_USER_EXPENSES,
    payload: userExpenses,
  };
};
export const addTotalExpense = (totalExpense) => {
  return {
    type: EXPENSES_ACTION_TYPES.ADD_TOTAL_EXPENSE,
    payload: totalExpense,
  };
};
export const setIsExpenseTableVisible = (visibility) => {
  return {
    type: EXPENSES_ACTION_TYPES.SET_IS_EXPENSE_TABLE_VISIBLE,
    payload: visibility,
  };
};
export const setIsPeopleCountFormVisible = (visibility) => {
  return {
    type: EXPENSES_ACTION_TYPES.SET_IS_PEOPLE_COUNT_FORM_VISIBLE,
    payload: visibility,
  };
};
export const setIsPeopleNameFormVisible = (visibility) => {
  return {
    type: EXPENSES_ACTION_TYPES.SET_IS_PEOPLE_NAME_FORM_VISIBLE,
    payload: visibility,
  };
};
export const clearUsers = () => {
  return {
    type: EXPENSES_ACTION_TYPES.CLEAR_USERS,
  };
};
