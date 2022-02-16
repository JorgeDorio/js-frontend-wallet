/* eslint-disable indent */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getLogin } from '../actions';

const minPasswdLen = 5;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isRedirect: false,
      btnIsDisable: true,
      email: '',
      password: '',
    };
  }

  checkInput = () => {
    const { password, email } = this.state;
    // Linha abaixo: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/;
    const emailValid = regex.test(email);

    if (password.length > minPasswdLen && emailValid) {
      this.setState({
        btnIsDisable: false,
      });
    } else {
      this.setState({
        btnIsDisable: true,
      });
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.checkInput);
  }

  handleClick = (e) => {
    e.preventDefault();
    const { getEmail } = this.props;
    const { email } = this.state;
    this.setState({
      isRedirect: true,
    });
    getEmail(email);
  }

  render() {
    const { isRedirect, email, password, btnIsDisable } = this.state;
    if (isRedirect) return <Redirect to="/carteira" />;
    return (
      <form onSubmit={ this.handleClick }>
        <input
          placeholder="Email"
          data-testid="email-input"
          value={ email }
          onChange={ this.handleChange }
          name="email"
          type="email"
        />
        <input
          placeholder="Password"
          value={ password }
          onChange={ this.handleChange }
          name="password"
          type="password"
          data-testid="password-input"
        />
        <button
          type="submit"
          disabled={ btnIsDisable }
        >
          Entrar
        </button>
      </form>);
  }
}

Login.propTypes = {
  getEmail: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => dispatch(getLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);
