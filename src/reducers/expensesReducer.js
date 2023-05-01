import { EXPENSES_ACTION_TYPES } from "../Constants";
const initState = {
  expenses: [],
  isTotalExpenseCalculated: false,
  users: [],
  userExpenses: [],
  totalExpense: null,
  isExpenseTableVisible: false,
  isPeopleCountFormVisible: false,
  isPeopleNameFormVisible: false,
  countOfPeople: 1,
};

const expensesReducer = (state = initState, action) => {
  switch (action.type) {
    case EXPENSES_ACTION_TYPES.ADD_NEW_EXPENSE:
      let newExpense = action.payload;
      return { ...state, expenses: [...state.expenses, newExpense] };

    case EXPENSES_ACTION_TYPES.UPDATE_EXPENSE_AMOUNT:
    case EXPENSES_ACTION_TYPES.UPDATE_EXPENSE_TYPE:
    case EXPENSES_ACTION_TYPES.UPDATE_EXPENSES:
      let newExpenses = action.payload;
      return { ...state, expenses: newExpenses };

    case EXPENSES_ACTION_TYPES.NAVIGATE_TO_INDIVIDUAL_EXPENSES_PAGE:
      return { ...state, isTotalExpenseCalculated: true };

    case EXPENSES_ACTION_TYPES.SET_USER_NAMES:
      return { ...state, users: action.payload };

    case EXPENSES_ACTION_TYPES.CLEAR_EXPENSES:
      return { ...state, expenses: [] };

    case EXPENSES_ACTION_TYPES.SET_USER_EXPENSES:
      return { ...state, userExpenses: action.payload };

    case EXPENSES_ACTION_TYPES.ADD_TOTAL_EXPENSE:
      return { ...state, totalExpense: action.payload };

    case EXPENSES_ACTION_TYPES.SET_IS_EXPENSE_TABLE_VISIBLE:
      return { ...state, isExpenseTableVisible: action.payload };

    case EXPENSES_ACTION_TYPES.SET_IS_PEOPLE_COUNT_FORM_VISIBLE:
      return { ...state, isPeopleCountFormVisible: action.payload };

    case EXPENSES_ACTION_TYPES.SET_IS_PEOPLE_NAME_FORM_VISIBLE:
      return { ...state, isPeopleNameFormVisible: action.payload };

    case EXPENSES_ACTION_TYPES.CLEAR_USERS:
      return { ...state, users: [] };

    default:
      return state;
  }
};

export default expensesReducer;
