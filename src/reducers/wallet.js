// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { GET_WALLET_CURRENCIES, GET_WALLET_EXPENSES } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_WALLET_CURRENCIES:
    return {
      ...state,
      currencies: payload,
    };
  case GET_WALLET_EXPENSES:
    return {
      ...state,
      expenses: payload,
    };
  default:
    return state;
  }
};

export default wallet;
