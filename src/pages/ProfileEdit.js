import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
      email: '',
      image: '',
      description: '',
    };
  }

  componentDidMount() {
    this.setState(
      { loading: true },
      async () => {
        const data = await getUser();
        const { name, email, image, description } = data;
        this.setState({ loading: false, name, email, image, description });
        console.log(data);
      },
    );
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    console.log(target.name);
    this.setState({
      [name]: value,
    });
    console.log(target.value);
  };

  validaBotao = () => {
    const { name, email, image, description } = this.state;
    const filled = name.length > 0
      && email.length > 0
      && email.includes('@')
      && email.includes('.com')
      && image.length > 0
      && description.length > 0;
    return !filled;
  };

  onSave = () => {
    const { name, email, image, description } = this.state;
    const { history } = this.props;

    const userAtualizado = { name, email, image, description };
    this.setState({
      loading: true,
    }, async () => {
      await updateUser(userAtualizado);
      this.setState(
        { loading: false },
        () => {
          history.push('/profile');
        },
      );
    });
  };

  render() {
    const { loading, name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading
          ? <Loading />
          : (
            <form>
              <input
                data-testid="edit-input-name"
                type="text"
                name="name"
                defaultValue={ name }
                onChange={ this.onInputChange }
              />
              <input
                data-testid="edit-input-email"
                type="text"
                name="email"
                defaultValue={ email }
                onChange={ this.onInputChange }
              />
              <input
                data-testid="edit-input-description"
                type="text"
                name="description"
                defaultValue={ description }
                onChange={ this.onInputChange }
              />
              <input
                data-testid="edit-input-image"
                type="text"
                name="image"
                defaultValue={ image }
                onChange={ this.onInputChange }
              />
              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ this.validaBotao() }
                onClick={ this.onSave }
              >
                Salvar
              </button>
            </form>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
