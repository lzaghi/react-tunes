import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import styles from './styles/Album.module.css';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      musics: [],
      loading: true,
      listaFavs: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const data = await getMusics(match.params.id);
    this.setState(
      { musics: data },
      async () => {
        const lista = await getFavoriteSongs();
        this.setState({ loading: false, listaFavs: lista });
      },
    );
  }

  handleListUpdating = (newList) => {
    this.setState({ listaFavs: newList });
  };

  render() {
    const { musics, loading, listaFavs } = this.state;
    return (
      <div className={ styles.wrapper } data-testid="page-album">
        <Header />
        <div className={ styles.freeSpace }>
          <div className={ styles.bgTop } />
          { loading
            ? <div className={ styles.loading }><Loading /></div>
            : (
              <div>
                { musics.length > 0 && (
                  <div className={ styles.album }>
                    <img
                      src={ musics[0].artworkUrl100 }
                      alt={ musics[0].collectionName }
                    />
                    <div className={ styles.albumInfo }>
                      <h4 data-testid="album-name">{musics[0].collectionName}</h4>
                      <h3 data-testid="artist-name">{musics[0].artistName}</h3>
                    </div>
                  </div>)}
                <div className={ styles.albumContainer }>
                  {
                    musics.length > 0 && (
                      musics.map((music, index) => (
                        index > 0
                        && <MusicCard
                          key={ music }
                          music={ music }
                          index={ index }
                          listaFavs={ listaFavs }
                          handleListUpdating={ this.handleListUpdating }
                          props={ this.props }
                        />)))

                  }
                </div>
              </div>

            )}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
