import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APPLICATION_PATHS, EXPENSE_TYPES } from "../../Constants";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewExpense,
  addTotalExpense,
  navigateToIndividualExpensesPage,
  setIsExpenseTableVisible,
  updateAmount,
  updateExpense,
  updateExpenses,
} from "../Actions/addNewExpenseAction";
import "./Expenses.css";
import { addExpenses, readExpenses } from "../../networkRequests";

const Expenses = () => {
  const [currentId, setCurrentId] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [isEditable, setIsEditable] = useState(false);
  const [editableItem, setEditableItem] = useState(false);

  const { expenses, users } = useSelector((state) => state.expensesReducer);
  const { loggedInUserId } = useSelector(
    (state) => state.authenticationReducer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getExistingExpensesDetails = async () => {
    const { success, result } = await readExpenses({ userId: loggedInUserId });
    if (success && result !== "Not found") {
      dispatch(updateExpenses(result));
    } else {
      dispatch(updateExpenses([]));
    }
  };

  useEffect(() => {
    getExistingExpensesDetails();
  }, []);

  useEffect(() => {
    let sumAmount = 0;
    expenses.forEach((expense) => {
      sumAmount = sumAmount + parseInt(expense.amount || "0");
    });
    setTotalAmount(sumAmount);
  }, [expenses]);

  const validateExpenseForm = () => {
    if (expenses.length === 0) {
      return true;
    }
    let expenseToValidate = expenses.at(-1);
    if (expenseToValidate.type === "") {
      return false;
    }
    if (expenseToValidate.amount === "") {
      return false;
    }
    return true;
  };

  const validateAndAddNewExpense = () => {
    if (!validateExpenseForm()) {
      alert("Enter expense type and amount");
      return;
    }
    let newExpense = {
      id: crypto.randomUUID(),
      type: "",
      amount: "",
      paidBy: "",
    };
    setCurrentId(newExpense.id);
    dispatch(addNewExpense(newExpense));
  };

  const updateSelectedItem = (selectedExpenseType, expenseId) => {
    let selectedExpenseIndex = expenses.findIndex(
      (expense) => expense.id === expenseId
    );
    let newExpense = {
      ...expenses[selectedExpenseIndex],
      type: selectedExpenseType.value,
    };
    let newExpenses = [...expenses];
    newExpenses[selectedExpenseIndex] = newExpense;
    dispatch(updateExpense(newExpenses));
  };

  const updateExpenseAmount = (amount, expenseId) => {
    let newExpenses = expenses.map((expense) => {
      if (expense.id === expenseId) {
        return { ...expense, amount: amount };
      }
      return expense;
    });
    dispatch(updateAmount(newExpenses));
  };

  const updatePaidBy = (name, expenseId) => {
    let newExpenses = expenses.map((expense) => {
      if (expense.id === expenseId) {
        return { ...expense, paidBy: name.value };
      }
      return expense;
    });
    dispatch(updateAmount(newExpenses));
  };

  const navigateToIndividualExpense = async () => {
    await addExpenses({
      userId: loggedInUserId,
      expenses: expenses,
    });
    dispatch(addTotalExpense(totalAmount));
    dispatch(setIsExpenseTableVisible(false));
    dispatch(navigateToIndividualExpensesPage());
    navigate(APPLICATION_PATHS.INDIVIDUAL_EXPENSES);
  };

  const options = Object.keys(EXPENSE_TYPES).map((expenseType) => ({
    value: expenseType,
    label: EXPENSE_TYPES[expenseType],
  }));

  const nonSelectedOptions = options.filter((option) => {
    let selectedExpenseTypes = expenses.map((expense) => expense.type);
    let isSelected = selectedExpenseTypes.includes(option.value);
    return !isSelected;
  });

  const listOfNames = users.map((user) => ({
    value: user.name,
    label: user.name,
  }));

  const setEditMode = (id, isEditing) => {
    if (!isEditing) {
      setIsEditable(isEditing);
      setEditableItem("");
      return;
    }
    setIsEditable(isEditing);
    setEditableItem(id);
  };

  const isItemDisabled = (id) => {
    if (id === currentId || id === editableItem) {
      return false;
    }
    return true;
  };
  return (
    <>
      <table className="total-expenses-table">
        <thead>
          <tr>
            <th>Type of expense</th>
            <th>Expense amount</th>
            <th>Paid by</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            return (
              <tr key={expense.id}>
                <td>
                  <Select
                    options={nonSelectedOptions}
                    onChange={(e) => updateSelectedItem(e, expense.id)}
                    value={options.find(
                      (option) => option.value === expense.type
                    )}
                    isDisabled={isItemDisabled(expense.id)}
                  />
                </td>
                <td>
                  {isItemDisabled(expense.id) ? (
                    <span className="expense-amount">{expense.amount}</span>
                  ) : (
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={expense.amount}
                      onChange={(e) =>
                        updateExpenseAmount(e.target.value, expense.id)
                      }
                    />
                  )}
                </td>
                <td>
                  <Select
                    options={listOfNames}
                    onChange={(e) => updatePaidBy(e, expense.id)}
                    value={listOfNames.find(
                      (option) => option.value === expense.paidBy
                    )}
                    isDisabled={isItemDisabled(expense.id)}
                  />
                </td>
                <td>
                  {isEditable && expense.id === editableItem ? (
                    <i
                      className="material-icons edit-button"
                      onClick={() => setEditMode(expense.id, false)}
                    >
                      check
                    </i>
                  ) : (
                    <i
                      className="material-icons edit-button"
                      onClick={() => setEditMode(expense.id, true)}
                    >
                      create
                    </i>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="expense-sum">{`Total: ${totalAmount}`}</td>
            <td></td>
            <td></td>
            <td className="add-new-row">
              <button
                className="btn btn-medium waves-effect indigo"
                onClick={validateAndAddNewExpense}
              >
                +
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
      <button
        className="btn btn-medium waves-effect indigo submit-expenses-form"
        onClick={navigateToIndividualExpense}
      >
        Submit
      </button>
    </>
  );
};

export default Expenses;
