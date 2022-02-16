// Coloque aqui suas actions

import { GET_WALLET_CURRENCIES, GET_WALLET_EXPENSES, USER_LOGIN } from './actionTypes';

export const getLogin = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

export const getCurrencies = (currencies) => ({
  type: GET_WALLET_CURRENCIES,
  payload: currencies,
});
export const getExpenses = (expenses) => ({
  type: GET_WALLET_EXPENSES,
  payload: expenses,
});
