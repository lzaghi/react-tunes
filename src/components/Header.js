import React from 'react';
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
    console.log(nome);

    return (
      <header data-testid="header-component">
        { loading
          ? <Loading />
          : (
            <h2 data-testid="header-user-name">{ nome }</h2>
          )}

      </header>
    );
  }
}

export default Header;
