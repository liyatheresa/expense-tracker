import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH_STATUS_KEY } from "../../Constants";
import { APPLICATION_PATHS } from "../../Constants";
import {
  setIsExpenseTableVisible,
  setIsPeopleCountFormVisible,
  setIsPeopleNameFormVisible,
} from "../Actions/addNewExpenseAction";
import { logoutAction } from "../Actions/authenticationAction";
import SimpleModal from "../SimpleModal";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogoutConfirmationVisible, setIsLogoutConfirmationVisible] =
    useState(false);
  const { users, loggedInUserMailId } = useSelector(
    (state) => state.authenticationReducer
  );

  let userToLogin = users.find((user) => user.mailId === loggedInUserMailId);

  const handleLogout = () => {
    localStorage.setItem(AUTH_STATUS_KEY, false);
    dispatch(setIsExpenseTableVisible(false));
    dispatch(setIsPeopleCountFormVisible(false));
    dispatch(setIsPeopleNameFormVisible(false));
    dispatch(logoutAction());
    navigate(APPLICATION_PATHS.LOGIN);
  };
  return (
    <nav className="nav-bar">
      <div className="user-profile">
        <i className="small material-icons profile-icon">account_circle</i>
        <span>{userToLogin.name}</span>
      </div>
      <div className="nav-title">Expense Tracker</div>
      <button
        className="col s12 btn btn-medium waves-effect indigo logout-button"
        onClick={() => setIsLogoutConfirmationVisible(true)}
      >
        Logout
      </button>
      {isLogoutConfirmationVisible && (
        <SimpleModal
          title="Confirm Logout"
          body="Are you sure you want to logout?"
          okText="Logout"
          onOk={handleLogout}
          closeModal={() => setIsLogoutConfirmationVisible(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
