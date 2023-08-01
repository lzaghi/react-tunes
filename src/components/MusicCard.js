import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import styles from './styles/MusicCard.module.css';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      check: false,
    };
  }

  async componentDidMount() {
    this.handleCheckboxes();
  }

  handleCheckboxes = async () => {
    const { music } = this.props;
    const { listaFavs } = this.props;
    if (listaFavs.some((track) => track.trackId === music.trackId)) {
      this.setState({ check: true });
    }
  };

  handleFavorites = async (music) => {
    const { listaFavs, handleListUpdating } = this.props;
    const isFavorite = listaFavs.some((track) => track.trackId === music.trackId);
    this.setState({ loading: true });

    if (isFavorite) {
      await removeSong(music);
    } else {
      await addSong(music);
    }

    this.setState({ loading: false, check: !isFavorite });
    handleListUpdating(await getFavoriteSongs());

    const { props: { location: { pathname } } } = this.props;
    if (pathname === '/favorites') {
      this.handleCheckboxes();
    }
  };

  render() {
    const { music } = this.props;
    const { trackName, previewUrl } = music;
    const { loading, check } = this.state;
    return (
      <div className={ styles.card }>
        <div className={ styles.cardTop }>
          <p className={ styles.song }>{trackName}</p>
          <button
            type="button"
            onClick={ () => this.handleFavorites(music) }
            className={ styles.favButton }
          >
            <span
              className={ `material-icons-outlined ${styles.favIcon}` }
            >
              { check ? 'favorite' : 'favorite_outlined'}
            </span>
          </button>
        </div>
        <audio
          className={ styles.audio }
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        {/* <label
          data-testid={ `checkbox-music-${trackId}` }
          htmlFor={ index.toString() }
        >
          Favorita
          <input
            type="checkbox"
            name="fav"
            id={ index.toString() }
            onChange={ () => this.handleFavorites(music) }
            checked={ check }
          />
        </label> */}
        { loading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  handleListUpdating: PropTypes.func.isRequired, // index: PropTypes.number.isRequired,
  listaFavs: PropTypes.arrayOf(PropTypes.shape({
    some: PropTypes.func,
  })).isRequired,
  music: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
    trackName: PropTypes.string,
  }).isRequired,
  props: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default MusicCard;
