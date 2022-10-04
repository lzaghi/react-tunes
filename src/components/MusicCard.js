import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  addToFavorites = () => {
    const { music } = this.props;
    this.setState(
      {
        loading: true,
      },
      async () => {
        await addSong(music);
        this.setState({ loading: false });
      },
    );
  };

  render() {
    const { music: { trackName, trackId, previewUrl }, index } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ index.toString() }>
          Favorita
          <input
            type="checkbox"
            name="fav"
            id={ index.toString() }
            onChange={ this.addToFavorites }
          />
        </label>
        { loading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  index: PropTypes.number.isRequired,
  music: PropTypes.shape({
    trackName: PropTypes.string,
    trackId: PropTypes.number,
    previewUrl: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
