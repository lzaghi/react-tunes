import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      isButtonDisabled: true,
      input: '',
      loading: false,
      consultado: '',
    };
  }

  handleButton = ({ target }) => {
    const minimum = 2;
    if (target.value.length >= minimum) {
      this.setState({ isButtonDisabled: false, input: target.value });
    } else {
      this.setState({ isButtonDisabled: true, input: target.value });
    }
  };

  getAlbumList = () => {
    const { input } = this.state;
    this.setState(
      { loading: true, consultado: input },
      async () => {
        const data = await searchAlbumsAPI(input);
        console.log(data);
        this.setState({
          loading: false,
          valida: data.length > 0 ? 'tem' : 'vazio',
          data,
          input: '',
        });
      },
    );
  };

  render() {
    const { isButtonDisabled, input, loading, valida, data, consultado } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading
          ? <Loading />
          : (
            <form>
              <input
                data-testid="search-artist-input"
                type="text"
                onChange={ this.handleButton }
                value={ input }
              />
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ isButtonDisabled }
                onClick={ this.getAlbumList }
              >
                Pesquisar
              </button>
            </form>
          )}
        { valida === 'tem' && (
          <div>
            <p>{`Resultado de álbuns de: ${consultado}`}</p>
            {data.map(({ collectionName, collectionId, artworkUrl100 }, index) => (
              <div key={ index }>
                <p>{ `Álbum ${index + 1}: ${collectionName} `}</p>
                <img src={ artworkUrl100 } alt={ collectionName } />
                <Link
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `/album/${collectionId}` }
                >
                  Ir para álbum
                </Link>
              </div>
            ))}
          </div>
        )}
        { valida === 'vazio' && (
          <p>Nenhum álbum foi encontrado</p>
        )}

      </div>
    );
  }
}

export default Search;
