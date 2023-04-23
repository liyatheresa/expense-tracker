import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { AUTHENTICATION_PATHS } from "./Constants";

const PrivateRoute = ({ path, component }) => {
  const { isAuthenticated } = useSelector(
    (state) => state.authenticationReducer
  );
  return (
    <Routes>
      <Route
        path={path}
        element={
          isAuthenticated ? (
            component
          ) : (
            <Navigate to={AUTHENTICATION_PATHS.LOGIN} />
          )
        }
      />
    </Routes>
  );
};

export default PrivateRoute;
