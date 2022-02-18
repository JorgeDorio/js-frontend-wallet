import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExpenses } from '../actions';
import fetchApi from '../services/fetch';

class ExpensesForm extends Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: 'metodo',
      tag: 'categoria',
      exchangeRates: [],
      nameCurrency: [],
    };
  }

  componentDidMount() {
    this.saveCurrencyNames();
  }

  saveCurrencyNames = async () => {
    const requestExchange = Object.keys(await fetchApi());
    const filterKey = requestExchange.filter((nome) => nome !== 'USDT');
    this.setState({
      nameCurrency: filterKey,
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  // checkId = () => {
  //   const { expenses } = this.props;
  //   const currentId = expenses.currentId === undefined ? 0 : expenses.currentId + 1;
  //   console.log(expenses);
  //   return currentId;
  // }

  handleClick = async (e) => {
    e.preventDefault();
    const { saveExpensesProps } = this.props;
    const requestExchange = await fetchApi();
    this.setState({
      exchangeRates: requestExchange,
    }, () => {
      saveExpensesProps(this.state);
      this.setState({
        value: '',
      });
    });
  }

  render() {
    const { value, description, currency, method, tag, nameCurrency } = this.state;
    return (
      <form onSubmit={ this.handleClick }>
        <input
          onChange={ this.handleChange }
          value={ value }
          placeholder="Valor"
          type="number"
          name="value"
          data-testid="value-input"
        />
        <textarea
          onChange={ this.handleChange }
          value={ description }
          placeholder="Descrição"
          data-testid="description-input"
          name="description"
        />
        <label htmlFor="currency">
          Moeda:
          <select
            onChange={ this.handleChange }
            value={ currency }
            placeholder="Moeada"
            type="text"
            data-testid="currency-input"
            name="currency"
            id="currency"
          >

            {nameCurrency.map((name) => (
              <option data-testid={ name } key={ name }>{name}</option>))}
          </select>
        </label>
        {/* <input
          onChange={ this.handleChange }
          value={ currency }
          placeholder="Moeada"
          type="text"
          data-testid="currency-input"
          name="currency"
        /> */}
        <select
          onChange={ this.handleChange }
          value={ method }
          data-testid="method-input"
          name="method"
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="Cartão de crédito'">Cartão de débito</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
        </select>
        <select
          onChange={ this.handleChange }
          value={ tag }
          data-testid="tag-input"
          name="tag"
        >
          <option value="alimentacao">Alimentação</option>
          <option value="Lazer'">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

ExpensesForm.propTypes = {
  id: PropTypes.number,
  saveExpensesProps: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  saveExpensesProps: (expenses) => dispatch(getExpenses(expenses)),
});

// const mapStateToProps = (state) => ({
//   expenses: state.wallet.expenses,
// });

export default connect(null, mapDispatchToProps)(ExpensesForm);
