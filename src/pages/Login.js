import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../Carregando';

class Login extends Component {
  state = {
    conditionToAllow: true,
    saveName: '',
    loading: false,
  };

  allowInputName = ({ target }) => {
    const maximunNameCharacteres = 3;
    if (target.value.length >= maximunNameCharacteres) {
      this.setState({ conditionToAllow: false, saveName: target.value });
    }
  };

  saveUserNameFunction = async () => {
    const { history } = this.props;
    this.setState({ loading: true });
    const { saveName } = this.state;
    await createUser({ name: saveName });
    this.setState({ loading: false });
    history.push('/search');
  };

  render() {
    const { conditionToAllow, loading } = this.state;
    if (loading) return <Carregando />;
    return (
      <div data-testid="page-login">
        <p>Login</p>
        <input data-testid="login-name-input" onChange={ this.allowInputName } />
        <button
          data-testid="login-submit-button"
          disabled={ conditionToAllow }
          onClick={ this.saveUserNameFunction }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape,
  push: PropTypes.func,
}.isRequired;

export default Login;
