import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

// Referência: Os requisitos 6,7 e 8 foram feitos com auxílio do colega de turma Abner Sousa, da turma 17, além de me ajudar com o conserto de bugs de alguns requesitos

class Table extends React.Component {
  handleDelete = ({ target }) => {
    const { totalExpenses, getUpdateExpense } = this.props;
    const removeExpanse = totalExpenses
      .filter((expense) => expense.id !== Number(target.id));
    getUpdateExpense(removeExpanse);
  };

  render() {
    const { totalExpenses } = this.props;
    return (
      <section>
        <tbody>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {totalExpenses && totalExpenses.map((expense) => (
            <tr
              key={ expense.id }
              id={ expense.id }
            >
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>
                {(Number(expense.value)
                * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  id={ expense.id }
                  onClick={ this.handleDelete }
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  totalExpenses: state.wallet.expenses,
});

Table.propTypes = {
  getUpdateExpense: PropTypes.func.isRequired,
  totalExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  getUpdateExpense: (id) => dispatch(deleteExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
