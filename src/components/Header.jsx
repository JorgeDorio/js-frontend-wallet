import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    const currentEmail = email === '' ? 'Local do email' : email;
    // const balance = total === 0 ? 0 : (total).toFixed(2);
    return (
      <header>
        <p data-testid="email-field">{currentEmail}</p>
        <div className="currentBalance">
          <p data-testid="total-field">{Number(total).toFixed(2)}</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
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
    total: state.wallet.total,
  };
}

export default connect(mapStateToProps)(Header);
