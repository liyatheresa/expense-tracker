import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsPeopleNameFormVisible } from "../Actions/addNewExpenseAction";
import "./NumberOfPeople.css";

const NumberOfPeople = ({ addNewUserFields }) => {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const submitPeopleCount = () => {
    addNewUserFields(count);
    dispatch(setIsPeopleNameFormVisible(true));
  };

  return (
    <div className="number-of-people">
      <div>
        <label htmlFor="numOfPeople" className="number-of-people-label">
          No of people
        </label>
        <input
          id="numOfPeople"
          type="number"
          min="1"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
      </div>
      <span className="submit-people-count">
        <i className="material-icons" onClick={submitPeopleCount}>
          check
        </i>
      </span>
    </div>
  );
};

export default NumberOfPeople;
