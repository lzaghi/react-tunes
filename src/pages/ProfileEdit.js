import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import styles from './styles/ProfileEdit.module.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
      email: '',
      image: null,
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
      },
    );
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  onImageChange = ({ target }) => {
    const file = target.files[0];
    this.setState({ image: URL.createObjectURL(file) });
  };

  validaEmail = (email) => {
    const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  validaBotao = () => {
    const { name, email, description } = this.state;
    const filled = name.length > 0
      && this.validaEmail(email)
      // && image
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

  handleEnterKey = (event) => {
    if (event.key === 'Enter' && !this.validaBotao()) {
      event.preventDefault();
      this.onSave();
    }
  };

  render() {
    const { loading, name, email, description } = this.state;
    return (
      <div className={ styles.wrapper } data-testid="page-profile-edit">
        <Header />
        <div className={ styles.freeSpace }>
          <div className={ styles.bgTop } />
          { loading
            ? <div className={ styles.loading }><Loading /></div>
            : (
              <form className={ styles.editContainer }>
                <p className={ styles.editP }>Edite seu perfil</p>
                <label className={ styles.label } htmlFor="name">
                  Nome
                  <input
                    className={ styles.editInput }
                    data-testid="edit-input-name"
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={ name }
                    onChange={ this.onInputChange }
                    onKeyDown={ this.handleEnterKey }
                  />
                </label>
                <label className={ styles.label } htmlFor="email">
                  Email
                  <input
                    className={ styles.editInput }
                    data-testid="edit-input-email"
                    type="text"
                    name="email"
                    defaultValue={ email }
                    onChange={ this.onInputChange }
                    onKeyDown={ this.handleEnterKey }
                  />
                </label>
                <label className={ styles.label } htmlFor="description">
                  Descrição
                  <textarea
                    className={ styles.editTextarea }
                    data-testid="edit-input-description"
                    type="text"
                    name="description"
                    defaultValue={ description }
                    onChange={ this.onInputChange }
                    onKeyDown={ this.handleEnterKey }
                    maxLength="500"
                  />
                </label>
                <label className={ styles.label } htmlFor="image">
                  Imagem
                  <input
                    className={ styles.imageInput }
                    data-testid="edit-input-image"
                    type="file"
                    name="image"
                    onChange={ this.onImageChange }
                  />
                </label>
                <button
                  className={ styles.editButton }
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
