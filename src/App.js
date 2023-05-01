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
import "./App.css";
import { APPLICATION_PATHS, AUTH_STATUS_KEY } from "./Constants.js";
import { useSelector } from "react-redux";

function App() {
  const { loggedInUserId } = useSelector(
    (state) => state.authenticationReducer
  );
  const isLoggedIn = !!loggedInUserId;
  return (
    <Router>
      <div className="App">
        <main className="container">
          <Routes>
            <Route
              path={APPLICATION_PATHS.DASHBOARD}
              element={
                isLoggedIn ? (
                  <Dashboard />
                ) : (
                  <Navigate to={APPLICATION_PATHS.LOGIN} replace />
                )
              }
            />
            <Route
              path={APPLICATION_PATHS.INDIVIDUAL_EXPENSES}
              element={
                isLoggedIn ? (
                  <IndividualExpenses />
                ) : (
                  <Navigate to={APPLICATION_PATHS.LOGIN} replace />
                )
              }
            />
            <Route
              path={APPLICATION_PATHS.HOME}
              element={
                <Navigate
                  to={
                    isLoggedIn ? (
                      <Navigate to={APPLICATION_PATHS.DASHBOARD} />
                    ) : (
                      APPLICATION_PATHS.LOGIN
                    )
                  }
                  replace
                />
              }
            />
            <Route
              path={APPLICATION_PATHS.LOGIN}
              element={
                isLoggedIn ? (
                  <Navigate to={APPLICATION_PATHS.DASHBOARD} />
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route
              path={APPLICATION_PATHS.REGISTRATION}
              element={<UserRegistration />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
