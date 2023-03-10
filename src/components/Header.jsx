import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  handleExpenses = () => {
    const { totalExpenses } = this.props;
    return totalExpenses.reduce((acc, expense) => (
      acc + Number(expense.value) * Number(expense.exchangeRates[expense.currency].ask)
    ), 0);
  };

  render() {
    const { email, totalExpenses } = this.props;
    return (
      <header>
        <p data-testid="email-field">{email}</p>

        <p data-testid="total-field">
          {totalExpenses.length > 0
            ? (this.handleExpenses()).toFixed(2)
            : 0}
        </p>

        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  total: PropTypes.number,
}.isRequired;

function mapStateToProps(state) {
  return {
    email: state.user.email,
    totalExpenses: state.wallet.expenses,
  };
}

export default connect(mapStateToProps)(Header);
