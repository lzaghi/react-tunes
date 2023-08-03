import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import styles from './styles/Search.module.css';

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

  handleEnterKey = (event) => {
    const { isButtonDisabled } = this.state;
    if (event.key === 'Enter' && !isButtonDisabled) {
      event.preventDefault();
      this.getAlbumList();
    }
  };

  getAlbumList = () => {
    const { input } = this.state;
    this.setState(
      { loading: true, consultado: input, status: '' },
      async () => {
        const data = await searchAlbumsAPI(input);

        this.setState({
          loading: false,
          status: data.length > 0 ? 'found' : 'not found',
          data,
          input: '',
          isButtonDisabled: true,
        });
      },
    );
  };

  render() {
    const { isButtonDisabled, input, loading, status, data, consultado } = this.state;
    return (
      <div className={ styles.wrapper } data-testid="page-search">
        <Header />
        <div className={ styles.freeSpace }>
          <div className={ styles.bgTop } />
          <form className={ styles.searchForm }>
            <input
              data-testid="search-artist-input"
              className={ styles.searchInput }
              type="text"
              onChange={ this.handleButton }
              onKeyDown={ this.handleEnterKey }
              value={ input }
              placeholder="Nome do artista"
            />
            <span className={ `material-symbols-outlined ${styles.icon}` }>
              search
            </span>
            <button
              data-testid="search-artist-button"
              className={ styles.searchButton }
              type="button"
              disabled={ isButtonDisabled }
              onClick={ this.getAlbumList }
            >
              Procurar
            </button>
          </form>
          { loading && <div className={ styles.loading }><Loading /></div> }
          { status === 'found' && (
            <div className={ styles.searchResult }>
              <p className={ styles.searchP }>
                <span className={ styles.resultP }>Resultado de álbuns de: </span>
                <span className={ styles.queryP }>{ consultado }</span>
              </p>
              <div />
              <div className={ styles.searchCards }>
                {data.map(
                  ({ artistName, collectionName, collectionId, artworkUrl100 }, idx) => (
                    <Link
                      data-testid={ `link-to-album-${collectionId}` }
                      to={ `/album/${collectionId}` }
                      key={ idx }
                      className={ styles.album }
                    >
                      <img src={ artworkUrl100 } alt={ collectionName } />
                      <div className={ styles.albumInfo }>
                        <p className={ styles.albumName }>{ collectionName }</p>
                        <p className={ styles.artistName }>{ artistName}</p>
                      </div>
                      {/* <Link
                    data-testid={ `link-to-album-${collectionId}` }
                    to={ `/album/${collectionId}` }
                  >
                    Ir para álbum
                  </Link> */}
                    </Link>
                  ),
                )}
              </div>
            </div>
          )}
          { status === 'not found' && (
            <p className={ styles.error }>Nenhum álbum foi encontrado...</p>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
