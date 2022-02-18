// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { DELETE_EXPENSE,
  GET_WALLET_CURRENCIES,
  GET_WALLET_EXPENSES } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_WALLET_CURRENCIES:
    return {
      ...state,
      currencies: payload,
    };
  case GET_WALLET_EXPENSES:
    return { ...state,
      expenses: [...state.expenses,
        payload],
      total:
      state.total + Number(payload.value)
      * Number(payload.exchangeRates[payload.currency].ask) };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...payload],
    };
  default:
    return state;
  }
};

export default wallet;
