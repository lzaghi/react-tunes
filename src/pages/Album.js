import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      loading: false,
      listaFavs: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const data = await getMusics(match.params.id);
    this.setState(
      { musics: data, loading: true },
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
      <div data-testid="page-album">
        <Header />
        { loading
          ? <Loading />
          : (
            musics.length > 0 && (
              musics.map((music, index) => (
                index === 0
                  ? (
                    <div key={ index }>
                      <h3 data-testid="artist-name">{music.artistName}</h3>
                      <h4 data-testid="album-name">{music.collectionName}</h4>
                    </div>)
                  : (
                    <MusicCard
                      key={ index }
                      music={ music }
                      index={ index }
                      listaFavs={ listaFavs }
                      handleListUpdating={ this.handleListUpdating }
                    />)
              ))
            )
          )}
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
