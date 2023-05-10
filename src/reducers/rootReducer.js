import { combineReducers, createStore } from "redux";
import authenticationReducer from "./authenticationReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import expensesReducer from "./expensesReducer";

const config = {
  key: "root",
  storage,
  whitelist: ["authenticationReducer"],
};

//Combine all the sub reducers
const rootReducer = combineReducers({
  authenticationReducer: authenticationReducer,
  expensesReducer: expensesReducer,
});

const persistedReducer = persistReducer(config, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
