import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      bool: false,
      loading: false,
    };
  }

  addToFavorites = () => {
    const { music } = this.props;
    const { bool } = this.state;
    this.setState(
      (prev) => ({
        bool: !prev.bool,
      }),
      (!bool
        ? (
          this.setState({
            loading: true,
          }),
          async () => {
            await addSong(music);
            this.setState({ loading: false });
          }
        )
        : console.log('oi')),
    );
  };

  render() {
    const { music: { trackName, trackId, previewUrl }, index } = this.props;
    const { bool, loading } = this.state;
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
            checked={ bool }
            onChange={ this.addToFavorites }
          />
        </label>
        { loading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    trackId: PropTypes.number,
    previewUrl: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
