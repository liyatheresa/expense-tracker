import { UserSchema, GroupExpensesSchema } from "./schemas.js";
import mongoose from "mongoose";

export const getUserModel = () => {
  const User = mongoose.model("users", UserSchema);
  return User;
};

export const getGroupExpensesModel = () => {
  const groupExpenses = mongoose.model("group-expenses", GroupExpensesSchema);
  return groupExpenses;
};
