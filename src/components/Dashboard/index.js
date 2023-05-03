import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserNames,
  clearExpenses,
  clearUsers,
  setIsExpenseTableVisible,
  setIsPeopleCountFormVisible,
  setIsPeopleNameFormVisible,
} from "../Actions/addNewExpenseAction";
import Expenses from "../Expenses";
import Navbar from "../Navbar";
import NumberOfPeople from "../NumberOfPeople";
import "./Dashboard.css";
import { addMembers, readMembers } from "../../networkRequests";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    isExpenseTableVisible,
    isPeopleCountFormVisible,
    isPeopleNameFormVisible,
    users,
  } = useSelector((state) => state.expensesReducer);
  const { loggedInUserId } = useSelector(
    (state) => state.authenticationReducer
  );
  const [localUsers, setLocalUsers] = useState(users);
  const [isUsernamesSubmitted, setIsUsernamesSubmitted] = useState(false);

  const getExistingMemberDetails = async () => {
    const { success, result } = await readMembers({ userId: loggedInUserId });
    if (success && result !== "Not found") {
      setLocalUsers(result);
      dispatch(addUserNames(result));
      dispatch(setIsExpenseTableVisible(true));
      dispatch(setIsPeopleCountFormVisible(true));
      dispatch(setIsPeopleNameFormVisible(true));
    } else {
      setLocalUsers([]);
    }
  };

  useEffect(() => {
    setIsUsernamesSubmitted(true);
    getExistingMemberDetails();
  }, []);

  const createNUsers = (count) => {
    return Array.from({ length: count }, () => ({
      id: crypto.randomUUID(),
      name: "",
    }));
  };

  const updateUserName = (userId, name) => {
    setLocalUsers((previousUsers) => {
      let indexOfUser = previousUsers.findIndex((user) => {
        return user.id === userId;
      });
      let newUsers = [...previousUsers];
      newUsers[indexOfUser] = { ...previousUsers[indexOfUser], name: name };
      return newUsers;
    });
  };

  const addUserNamesAndUpdateExpenseTableVisibility = async () => {
    setIsUsernamesSubmitted(true);
    await addMembers({
      userId: loggedInUserId,
      members: localUsers,
    });
    dispatch(addUserNames(localUsers));
    dispatch(setIsExpenseTableVisible(true));
  };

  const addNewUserFields = (count) => {
    const newUsers = createNUsers(count);
    setLocalUsers((previousUsers) => [...previousUsers, ...newUsers]);
    setIsUsernamesSubmitted(false);
  };

  const showPeopleCountForm = () => {
    dispatch(setIsExpenseTableVisible(false));
    dispatch(setIsPeopleNameFormVisible(false));
    dispatch(clearUsers());
    setLocalUsers([]);
    dispatch(clearExpenses());
    dispatch(setIsPeopleCountFormVisible(true));
  };

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="create-group">
        <button
          className="col s12 btn btn-small waves-effect indigo"
          onClick={showPeopleCountForm}
        >
          Create New Group
        </button>
      </div>
      <div className="count-and-name-of-people">
        {isPeopleCountFormVisible && (
          <NumberOfPeople addNewUserFields={addNewUserFields} />
        )}
        {isPeopleNameFormVisible && (
          <div className="names-of-people">
            <div className="usernames-parent">
              {isUsernamesSubmitted && (
                <div className="bold group-members-title">Group Members</div>
              )}
              {localUsers.map((user, index) => (
                <div key={user.id}>
                  {isUsernamesSubmitted ? (
                    <span className="usernames">{user.name}</span>
                  ) : (
                    <>
                      <label htmlFor={user.id}>{`Name of Person ${
                        index + 1
                      }`}</label>
                      <input
                        id={user.id}
                        value={user.name}
                        onChange={(e) =>
                          updateUserName(user.id, e.target.value)
                        }
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
            <button
              className="col s12 btn btn-medium waves-effect indigo group-members-name-submit"
              onClick={addUserNamesAndUpdateExpenseTableVisibility}
            >
              Done
            </button>
          </div>
        )}
      </div>
      {isExpenseTableVisible && <Expenses />}
    </div>
  );
};

export default Dashboard;
