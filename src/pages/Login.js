import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

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

  stateLoading = () => {
    const { nome } = this.state;
    const { history } = this.props;

    this.setState(
      { loading: true },
      async () => {
        await createUser({ name: nome });
        this.setState({ loading: false });
        history.push('/search');
        console.log(history);
      },
    );
  };

  render() {
    const { isButtonDisabled, loading } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            data-testid="login-name-input"
            type="text"
            onChange={ this.handleButton }
          />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ isButtonDisabled }
            onClick={ this.stateLoading }
          >
            Entrar
          </button>
        </form>
        { loading && <Loading /> }
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
