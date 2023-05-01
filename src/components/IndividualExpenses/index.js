import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsExpenseTableVisible,
  setUserExpenses,
} from "../Actions/addNewExpenseAction";
import Navbar from "../Navbar";
import { PieChart } from "react-minimal-pie-chart";
import "./IndividualExpenses.css";
import { useNavigate } from "react-router-dom";
import { EXPENSE_TYPES, EXPENSE_TYPE_COLOR } from "../../Constants";

const IndividualExpenses = () => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const { users, expenses, userExpenses, totalExpense } = useSelector(
    (state) => state.expensesReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getExpenseAmount = (userId, type) => {
    const user = userExpenses.find(
      (userExpense) => userExpense.userId === userId
    );
    const expenseOfUser = user?.expenses.find(
      (expense) => expense.type === type
    );
    return expenseOfUser?.amount ?? "";
  };

  useEffect(() => {
    let newUserExpenses = users.map((user) => ({
      name: user.name,
      userId: user.id,
      expenses: expenses.map((expense) => ({
        type: expense.type,
        amount: getExpenseAmount(user.id, expense.type),
        paidBy: expense.paidBy,
      })),
    }));
    dispatch(setUserExpenses(newUserExpenses));
  }, []);

  const getExpenseByType = () => {
    let newExpensesByType = [];

    userExpenses.forEach((userExpense) => {
      userExpense.expenses.forEach((expense) => {
        let index = newExpensesByType.findIndex(
          (item) => item.type === expense.type
        );

        if (index === -1) {
          newExpensesByType.push({
            type: expense.type,
            amount: expense.amount,
            paidBy: expense.paidBy,
          });
        } else {
          newExpensesByType[index].amount =
            parseInt(newExpensesByType[index].amount) +
            parseInt(expense.amount);
        }
      });
    });
    return newExpensesByType;
  };

  const getPieChartData = () => {
    let newExpensesByType = getExpenseByType();
    const pieChartData = newExpensesByType.map((expense) => {
      return {
        title: EXPENSE_TYPES[expense.type],
        value: (expense.amount / totalExpense) * 100,
        color: EXPENSE_TYPE_COLOR[expense.type],
      };
    });
    return pieChartData;
  };

  const validateExpenseOnExceed = (expenseAmount, userId, expenseType) => {
    let individualExpenses = userExpenses.map((userExpense) =>
      userExpense.expenses.map((expense) => {
        if (expense.type === expenseType && userExpense.userId === userId) {
          return 0;
        }
        return expense.amount || 0;
      })
    );
    let sum = individualExpenses
      .map((expense) => expense.reduce((sum, i) => sum + parseInt(i || "0"), 0))
      .reduce(
        (expenseSum, individualSum) =>
          expenseSum + parseInt(individualSum || "0"),
        0
      );
    return sum + parseInt(expenseAmount || "0") <= totalExpense;
  };

  const updateUserExpenses = (userId, expenseType, expenseAmount) => {
    if (!validateExpenseOnExceed(expenseAmount, userId, expenseType)) {
      alert("The expense you added exceeded the limit");
      return;
    }
    let currentUserExpenseIndex = userExpenses.findIndex(
      (userExpense) => userExpense.userId === userId
    );
    let currentUserExpense = { ...userExpenses[currentUserExpenseIndex] };
    let currentExpenseIndex = currentUserExpense.expenses.findIndex(
      (expense) => expense.type === expenseType
    );

    let newExpenses = [...currentUserExpense.expenses];
    let currentExpense = {
      ...currentUserExpense.expenses[currentExpenseIndex],
      amount: expenseAmount,
    };
    newExpenses[currentExpenseIndex] = currentExpense;

    let newUserExpenses = [...userExpenses];
    newUserExpenses[currentUserExpenseIndex] = {
      ...currentUserExpense,
      expenses: newExpenses,
    };

    dispatch(setUserExpenses(newUserExpenses));
  };

  let comments = [];
  const generateComments = () => {
    userExpenses.forEach((userExpense) =>
      userExpense.expenses.forEach((expense) => {
        if (userExpense.name !== expense.paidBy) {
          comments.push({
            id: crypto.randomUUID(),
            lender: userExpense.name,
            amount: expense.amount,
            borrower: expense.paidBy,
            expenseType: expense.type,
          });
        }
      })
    );
    return comments;
  };

  const generateCommentsSummary = () => {
    const uniquePairs = [];

    comments.forEach((comment) => {
      const existingComment = uniquePairs.find(
        (pair) =>
          pair.lender === comment.lender && pair.borrower === comment.borrower
      );
      if (existingComment) {
        existingComment.amount =
          parseInt(existingComment.amount) + parseInt(comment.amount);
      } else {
        uniquePairs.push({
          id: comment.id,
          lender: comment.lender,
          amount: comment.amount,
          borrower: comment.borrower,
          expenseType: comment.expenseType,
        });
      }
    });
    return uniquePairs;
  };

  const createUniqueSummary = () => {
    const consolidatedReversedPairs = [];

    generateCommentsSummary().forEach((comment) => {
      const reversePairIndex = consolidatedReversedPairs.findIndex(
        (reversedComment) =>
          reversedComment.lender === comment.borrower &&
          reversedComment.borrower === comment.lender
      );

      if (reversePairIndex >= 0) {
        const reversedComment = consolidatedReversedPairs[reversePairIndex];
        const greaterAmount = Math.max(
          parseInt(comment.amount),
          parseInt(reversedComment.amount)
        );
        const smallerAmount = Math.min(
          parseInt(comment.amount),
          parseInt(reversedComment.amount)
        );

        if (parseInt(comment.amount) > parseInt(reversedComment.amount)) {
          consolidatedReversedPairs[reversePairIndex].amount =
            greaterAmount - smallerAmount;
          consolidatedReversedPairs[reversePairIndex].lender = comment.lender;
          consolidatedReversedPairs[reversePairIndex].borrower =
            comment.borrower;
        } else {
          consolidatedReversedPairs[reversePairIndex].amount =
            greaterAmount - smallerAmount;
          consolidatedReversedPairs[reversePairIndex].lender =
            reversedComment.lender;
          consolidatedReversedPairs[reversePairIndex].borrower =
            reversedComment.borrower;
        }
      } else {
        consolidatedReversedPairs.push(comment);
      }
    });

    return consolidatedReversedPairs;
  };

  const validateExpenses = () => {
    let individualExpenses = userExpenses.map((userExpense) =>
      userExpense.expenses.map((expense) => expense.amount)
    );
    let sum = individualExpenses
      .map((expense) => expense.reduce((sum, i) => sum + parseInt(i), 0))
      .reduce(
        (expenseSum, individualSum) => expenseSum + parseInt(individualSum),
        0
      );
    let expenseByType = getExpenseByType();
    let count = 0;
    expenses.forEach((expense) =>
      expenseByType.forEach((expenseType) => {
        if (expense.type === expenseType.type) {
          if (parseInt(expense.amount || "0") !== expenseType.amount) {
            alert(
              `Individual sum entered does not match the total for type ${
                EXPENSE_TYPES[expense.type]
              }`
            );
            count++;
          }
        }
      })
    );
    if (sum !== totalExpense) {
      if (sum > totalExpense) {
        alert("The expense you added exceeded the limit");
        return;
      }
      alert("The expense you added is less than the limit");
    } else {
      if (count === 0) {
        setIsCommentsVisible(true);
        generateComments();
      }
    }
  };

  const navigateToPreviousPage = () => {
    dispatch(setIsExpenseTableVisible(true));
    navigate(-1);
  };

  return (
    <div className="individual-expenses-page">
      <Navbar />
      <div>
        <span>
          <i
            className="material-icons arrow-back"
            onClick={navigateToPreviousPage}
          >
            arrow_back
          </i>
        </span>
        <table className="individual-expense-table">
          <thead>
            <tr className="dark-grey-background border-bottom">
              <th>Types of expenses</th>
              {expenses.map((expense) => (
                <th key={expense.id}>{EXPENSE_TYPES[expense.type]}</th>
              ))}
              <th>Total</th>
            </tr>
            <tr className="dark-grey-background border-bottom">
              <th>Paid by</th>
              {expenses.map((expense) => (
                <th key={expense.id}>{expense.paidBy}</th>
              ))}
              <th className="total-expense">{`${totalExpense}`}</th>
            </tr>
          </thead>
          <tbody>
            {userExpenses.map((userExpense, index) => (
              <tr
                key={userExpense.userId}
                className={`${index % 2 === 0 ? "" : "grey-background"}`}
              >
                <td>{`${userExpense.name}'s expenses`}</td>

                {userExpense.expenses.map((expense) => (
                  <td key={expense.type}>
                    <input
                      value={expense.amount}
                      onChange={(e) =>
                        updateUserExpenses(
                          userExpense.userId,
                          expense.type,
                          e.target.value
                        )
                      }
                    />
                  </td>
                ))}
                <td>
                  {userExpenses
                    .find((expense) => expense.userId === userExpense.userId)
                    .expenses.map((expense) => expense.amount)
                    .reduce((sum, amount) => sum + parseInt(amount || "0"), 0)}
                </td>
              </tr>
            ))}
            <tr className="dark-grey-background bold border-bottom">
              <td>Total Amount</td>
              {expenses.map((expense) => (
                <td key={expense.id}>{expense.amount}</td>
              ))}
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="calculate-expense">
          <button className="btn btn-medium indigo" onClick={validateExpenses}>
            Calculate expense
          </button>
        </div>
        {isCommentsVisible && (
          <div className="comments-and-pie-chart">
            <div className="comments">
              <div className="title comments-title">COMMENTS</div>
              <ul>
                {generateComments().map((comment) => (
                  <li className="comment" key={comment.id}>
                    <span className="bold">{comment.lender}</span> needs to pay{" "}
                    <span className="amount">Rs.{comment.amount}</span> to{" "}
                    <span className="bold">{comment.borrower}</span> for{" "}
                    <span
                      style={{ color: EXPENSE_TYPE_COLOR[comment.expenseType] }}
                    >
                      {EXPENSE_TYPES[comment.expenseType]}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="title comments-title summary">SUMMARY</div>
              <ul>
                {createUniqueSummary().map((comment) => (
                  <li className="comment" key={comment.id}>
                    <span className="bold">{comment.lender}</span> needs to pay{" "}
                    <span className="amount">Rs.{comment.amount}</span> to{" "}
                    <span className="bold">{comment.borrower}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pie-chart">
              <PieChart
                data={getPieChartData()}
                radius={30}
                label={({ dataEntry }) => dataEntry.title}
                labelStyle={{
                  fontSize: "3px",
                  color: "#FFFFFF",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndividualExpenses;
