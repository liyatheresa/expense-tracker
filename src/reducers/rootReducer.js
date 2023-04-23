import characterReducer from "./characterReducer";
import counterReducer from "./counterReducer";
import todoReducer from "./todoReducer";
import { combineReducers, createStore } from "redux";
import authenticationReducer from "./authenticationReducer";
import expensesReducer from "./expensesReducer";

//Combine all the sub reducers
const rootReducer = combineReducers({
  characters: characterReducer,
  myCounter: counterReducer,
  todos: todoReducer,
  authenticationReducer: authenticationReducer,
  expensesReducer: expensesReducer,
});

const store = createStore(rootReducer);

export { store };
