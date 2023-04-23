import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APPLICATION_PATHS, AUTH_STATUS_KEY } from "../../Constants";
import "./LoginPage.css";
import { loginAction, setLoggedIn } from "../Actions/authenticationAction";

const LoginPage = () => {
  const [userMailId, setUserMailId] = useState("");
  const [password, setPassword] = useState("");

  const { users, isAuthenticated } = useSelector(
    (state) => state.authenticationReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const authStatusKey = localStorage.getItem(AUTH_STATUS_KEY);
    if (authStatusKey === null) {
      localStorage.setItem(AUTH_STATUS_KEY, false);
      return;
    }
    if (authStatusKey === "true") {
      navigate(APPLICATION_PATHS.DASHBOARD);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem(AUTH_STATUS_KEY) === "true") {
      dispatch(setLoggedIn());
      return;
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    let userToLogin = users.find((user) => user.mailId === userMailId);
    if (!userToLogin) {
      alert("User not found");
      return;
    }
    if (userToLogin.password !== password) {
      alert("Incorrect credentials");
      return;
    }
    sessionStorage.setItem(AUTH_STATUS_KEY, true);
    dispatch(loginAction(userToLogin.mailId));
    navigate(APPLICATION_PATHS.DASHBOARD);
  };

  const registerNewUser = () => {
    navigate(APPLICATION_PATHS.REGISTRATION);
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h5 className="center-align black-text white title">User Login</h5>
      <div className="row">
        <div className="input-field col s12">
          <input
            required
            type="email"
            pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            value={userMailId}
            onChange={(e) => setUserMailId(e.target.value)}
          />
          <label className="active" htmlFor="userName">
            Email Id
          </label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input
            required
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="active" htmlFor="password">
            Password
          </label>
        </div>
      </div>
      <div className="submit-and-register-buttons">
        <input
          type="submit"
          value="Login"
          className="col s12 btn btn-medium waves-effect indigo"
        />
        <a onClick={registerNewUser} className="link-to-user-reg">
          Register as new user
        </a>
      </div>
    </form>
  );
};

export default LoginPage;
