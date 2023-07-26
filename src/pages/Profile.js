import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      user: {},
    };
  }

  componentDidMount() {
    this.setState(
      { loading: true },
      async () => {
        const data = await getUser();
        this.setState({ loading: false, user: data });
      },
    );
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading
          ? <Loading />
          : (
            <div>
              <p data-testid="header-user-name">{ user.name }</p>
              <img data-testid="profile-image" src={ user.image } alt="foto perfil" />
              <p>{ user.email }</p>
              <p>{ user.description }</p>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
