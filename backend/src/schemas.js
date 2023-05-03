import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  name: String,
  contactNumber: Number,
  mailId: String,
  password: String,
  id: String,
});

export const GroupExpensesSchema = new mongoose.Schema({
  userId: String,
  members: [{ id: String, name: String }],
  expenses: [
    {
      id: String,
      type: {
        type: String,
      },
      amount: String,
      paidBy: String,
    },
  ],
});
