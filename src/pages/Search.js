import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      isButtonDisabled: true,
    };
  }

  handleButton = ({ target }) => {
    const minimum = 2;
    if (target.value.length >= minimum) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  };

  render() {
    const { isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            onChange={ this.handleButton }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
