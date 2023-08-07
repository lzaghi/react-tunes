import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import styles from './styles/Login.module.css';
import logo from '../utils/logo.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isButtonDisabled: true,
      nome: '',
      loading: false,
    };
  }

  handleButton = ({ target }) => {
    const minimum = 3;
    if (target.value.length >= minimum) {
      this.setState({ isButtonDisabled: false, nome: target.value });
    } else {
      this.setState({ isButtonDisabled: true, nome: target.value });
    }
  };

  login = () => {
    const { nome } = this.state;
    const { history } = this.props;

    this.setState(
      { loading: true },
      async () => {
        await createUser({ name: nome });
        this.setState({ loading: false });
        history.push('/search');
      },
    );
  };

  handleEnterKey = (event) => {
    const { isButtonDisabled } = this.state;
    if (event.key === 'Enter' && !isButtonDisabled) {
      event.preventDefault();
      this.login();
    }
  };

  render() {
    const { isButtonDisabled, loading } = this.state;
    return (
      <div className={ styles.background }>
        <div data-testid="page-login" className={ styles.loginCard }>
          <form className={ styles.content }>
            <img src={ logo } alt="trybe tunes logo" />
            <input
              className={ styles.nameInput }
              data-testid="login-name-input"
              type="text"
              onChange={ this.handleButton }
              onKeyDown={ this.handleEnterKey }
              placeholder="Qual é o seu nome?"
            />
            <button
              className={ styles.loginButton }
              data-testid="login-submit-button"
              type="button"
              disabled={ isButtonDisabled }
              onClick={ this.login }
            >
              Entrar
            </button>
          </form>
        </div>
        { loading && <div className={ styles.loginLoader }><Loading /></div> }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
