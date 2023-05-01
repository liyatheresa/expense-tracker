import {
  ADD_EXPENSES,
  ADD_MEMBERS,
  CREATE_NEW_USER,
  READ_EXPENSES,
  READ_MEMBERS,
  USER_LOGIN,
} from "./endpoints";
import { callApi } from "./utils";

export const createNewUser = async (user) => {
  const result = await callApi("POST", CREATE_NEW_USER, user);
  if (result.status === 200) {
    return { success: true, result: result.data };
  }
  return { success: false };
};

export const userLogin = async (credentials) => {
  const result = await callApi("POST", USER_LOGIN, credentials);
  if (result.status === 200) {
    return { success: true, result: result.data };
  }
  return { success: false };
};

export const addMembers = async (members) => {
  const result = await callApi("POST", ADD_MEMBERS, members);
  if (result.status === 200) {
    return { success: true, result: result.data };
  }
  return { success: false };
};

export const addExpenses = async (expenses) => {
  const result = await callApi("POST", ADD_EXPENSES, expenses);
  if (result.status === 200) {
    return { success: true, result: result.data };
  }
  return { success: false };
};

export const readMembers = async (userId) => {
  const result = await callApi("POST", READ_MEMBERS, userId);
  if (result.status === 200) {
    return { success: true, result: result.data };
  }
  return { success: false };
};

export const readExpenses = async (userId) => {
  const result = await callApi("POST", READ_EXPENSES, userId);
  if (result.status === 200) {
    return { success: true, result: result.data };
  }
  return { success: false };
};
