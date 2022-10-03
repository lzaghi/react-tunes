import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.setState(
      { loading: true, nome: '' },
      async () => {
        const data = await getUser();
        this.setState({ loading: false, nome: data.name });
      },
    );
  }

  render() {
    const { loading, nome } = this.state;

    return (
      <>
        <header data-testid="header-component">
          { loading
            ? <Loading />
            : (
              <h2 data-testid="header-user-name">{ nome }</h2>
            )}
        </header>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </>
    );
  }
}

export default Header;
