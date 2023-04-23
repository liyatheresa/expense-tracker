import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { APPLICATION_PATHS } from "../../Constants";
import { addNewUser } from "../Actions/authenticationAction";
import MandatoryField from "../MandatoryField";
import SimpleModal from "../SimpleModal";
import "./UserRegistration.css";

const UserRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [mailId, setMailId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  let { users } = useSelector((state) => state.authenticationReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newUserRegistration = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords does not match");
      return;
    }
    let isUserExists = users.some((user) => user.mailId === mailId);
    if (isUserExists) {
      alert("User already exists");
      navigate(APPLICATION_PATHS.LOGIN);
      return;
    }
    let name = `${firstName} ${lastName}`;
    dispatch(addNewUser(name, contactNumber, mailId, newPassword));
    setIsUserRegistered(true);
  };
  return (
    <div>
      <form className="col s12" onSubmit={newUserRegistration}>
        <h4 className="center-align">User Registration</h4>
        <span className="back-to-login">
          <Link to={APPLICATION_PATHS.LOGIN}>Back to Login</Link>
        </span>
        <div className="row">
          <div className="input-field col s6">
            <input
              required
              id="firstName"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="active" htmlFor="firstName">
              First Name <MandatoryField />
            </label>
          </div>
          <div className="input-field col s6">
            <input
              required
              id="lastName"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
            <label className="active" htmlFor="lastName">
              Last Name <MandatoryField />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              required
              id="contactNumber"
              type="number"
              onChange={(e) => setContactNumber(e.target.value)}
            />
            <label className="active" htmlFor="contactNumber">
              Phone No <MandatoryField />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              required
              type="email"
              id="email"
              onChange={(e) => setMailId(e.target.value)}
            />
            <label className="active" htmlFor="email">
              Email <MandatoryField />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              required
              id="password"
              type="password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label className="active" htmlFor="password">
              Password <MandatoryField />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              required
              id="confirmPassword"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label className="active" htmlFor="confirmPassword">
              Confirm Password <MandatoryField />
            </label>
          </div>
        </div>
        <div className="row">
          <input
            type="submit"
            value="Register"
            className="col s12 btn btn-medium waves-effect indigo"
          />
        </div>
      </form>
      {isUserRegistered && (
        <SimpleModal
          timeoutDelay={3000}
          onTimeout={() => {
            navigate(APPLICATION_PATHS.LOGIN);
          }}
          body="User Registration Successful"
          closeModal={() => setIsUserRegistered(false)}
        />
      )}
    </div>
  );
};

export default UserRegistration;
