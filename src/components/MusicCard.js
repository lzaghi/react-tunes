import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

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

  handleCheckboxes = () => {
    const { listaFavs, music } = this.props;
    if (listaFavs.some((track) => track.trackId === music.trackId)) {
      this.setState({ check: true });
    }
  };

  handleFavorites = async (music) => {
    const { listaFavs, handleListUpdating } = this.props;
    if (listaFavs.some((track) => track.trackId === music.trackId)) {
      this.setState(
        { loading: true },
        async () => {
          await removeSong(music);
          this.setState({ loading: false, check: false });
          handleListUpdating(await getFavoriteSongs());
          this.handleCheckboxes();
        },
      );
    } else {
      this.setState(
        { loading: true },
        async () => {
          await addSong(music);
          this.setState({ loading: false, check: true });
          handleListUpdating(await getFavoriteSongs());
          this.handleCheckboxes();
        },
      );
    }
  };

  render() {
    const { music, index } = this.props;
    const { trackName, trackId, previewUrl } = music;
    const { loading, check } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label
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
        </label>
        { loading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  handleListUpdating: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  listaFavs: PropTypes.arrayOf(PropTypes.shape({
    some: PropTypes.func,
  })).isRequired,
  music: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
    trackName: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
