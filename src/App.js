import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage/index.js";
import Dashboard from "./components/Dashboard";
import UserRegistration from "./components/UserRegistration/index.js";
import IndividualExpenses from "./components/IndividualExpenses/index.js";
import PrivateRoute from "./PrivateRoute.js";
// import SimpleCounter from './views/SimpleCounter';
// import TodoList from './views/TodoList';
// import NameCard from './views/NameCard';
import "./App.css";
import { AUTHENTICATION_PATHS } from "./Constants.js";
import { useSelector } from "react-redux";

function App() {
  const { isTotalExpenseCalculated } = useSelector(
    (state) => state.expensesReducer
  );
  return (
    <Router>
      <div className="App">
        <main className="container">
          <Routes>
            <Route
              path={AUTHENTICATION_PATHS.HOME}
              element={<Navigate to={AUTHENTICATION_PATHS.LOGIN} replace />}
            />
            <Route path={AUTHENTICATION_PATHS.LOGIN} element={<LoginPage />} />
            <Route
              path={AUTHENTICATION_PATHS.REGISTRATION}
              element={<UserRegistration />}
            />
            <Route
              path={AUTHENTICATION_PATHS.INDIVIDUAL_EXPENSES}
              element={
                isTotalExpenseCalculated ? (
                  <IndividualExpenses />
                ) : (
                  <Navigate to={AUTHENTICATION_PATHS.LOGIN} />
                )
              }
            />
          </Routes>
          <PrivateRoute
            path={AUTHENTICATION_PATHS.DASHBOARD}
            component={<Dashboard />}
          />
          {/* Please check /views/SimpleCounter.js for detail*/}
          {/* <SimpleCounter /> */}
          {/* <div className="divider"></div> */}
          {/* Please check /views/NameCard.js for detail*/}
          {/* <NameCard /> */}
          {/* <div className="divider"></div> */}
          {/* Please check /views/TodoList.js for detail*/}
          {/* <TodoList /> */}
        </main>
      </div>
    </Router>
  );
}

export default App;
