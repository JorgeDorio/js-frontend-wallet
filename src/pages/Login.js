import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      logged: false,
      buttonDisabled: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
  }

  onChangeEmail({ target }) {
    const email = target.value;
    this.emailValidation();
    this.setState({
      email,
    });
  }

  onChangePassword({ target }) {
    const password = target.value;
    this.setState({
      password,
    }); this.emailValidation();
  }

  emailValidation=() => {
    const { email, password } = this.state;
    const minCaracteres = 5;
    // Linha abaixo: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/;
    const emailValid = regex.test(email);
    if (password.length >= minCaracteres && emailValid === true) {
      this.setState(() => ({
        buttonDisabled: false,
      }));
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  handleSubmit() {
    const { dispatchSetValue } = this.props;
    const { email } = this.state;
    dispatchSetValue(email);
    this.setState({
      logged: true,
    });
  }

  render() {
    const { buttonDisabled, email, password, logged } = this.state;
    if (logged) return <Redirect to="/carteira" />;
    return (
      <form className="Login-input">
        <input
          type="email"
          data-testid="email-input"
          placeholder="Email"
          value={ email }
          onChange={ this.onChangeEmail }
          required
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Senha"
          value={ password }
          onChange={ this.onChangePassword }
          minLength="4"
          required
        />
        <button
          type="button"
          disabled={ buttonDisabled }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatchSetValue: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: (email) => dispatch(userLogin(email)),

});

export default connect(null, mapDispatchToProps)(Login);
