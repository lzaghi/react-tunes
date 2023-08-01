import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import styles from './styles/Profile.module.css';
import img from '../utils/profile.svg';

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
          ? <div className={ styles.loading }><Loading /></div>
          : (
            <div className={ styles.profileContainer }>
              <div className={ styles.user }>
                <img
                  className={ styles.image }
                  data-testid="profile-image"
                  src={ user.image || img }
                  alt="foto perfil"
                />
                <p
                  className={ styles.name }
                  data-testid="header-user-name"
                >
                  { user.name }
                </p>
              </div>
              <p className={ styles.emailContainer }>
                <span className={ styles.email }>Email: </span>
                {user.email || '-'}
              </p>
              <p className={ styles.descContainer }>
                <span className={ styles.desc }>Description: </span>
                {user.description || '-'}
              </p>
              <Link className={ styles.link } to="/profile/edit">editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
