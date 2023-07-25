import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      check: true,
    };
  }

  getProp = (target) => {
    const { removeElement } = this.props;
    removeElement(target);
  };

  handleRemove = (target) => {
    const { music, removeElement } = this.props;
    this.setState(
      {
        loading: true,
      },
      async () => {
        await removeSong(music);
        if (typeof removeElement !== 'undefined') this.getProp(target);
        this.setState({ loading: false });
      },
    );
  };

  addToFavorites = ({ target }) => {
    const { music } = this.props;
    const { check } = this.state;
    console.log(target);
    this.setState(
      (prev) => (
        { check: !prev.check }
      ),
      (check
        && (
          this.setState(
            {
              loading: true,
            },
            async () => {
              await addSong(music);
              this.setState({ loading: false });
            },
          )
        )
        // : (
        //   this.setState(
        //     {
        //       loading: true,
        //     },
        //     async () => {
        //       await removeSong(music);
        //       removeElement(target);
        //       this.setState({ loading: false });
        //     },
        //   )
        // )
      ),
    );
    if (!target.checked) this.handleRemove(target);
  };

  checksList = () => {
    const { music, listaFavs } = this.props;
    const bool = listaFavs.some((faixa) => faixa.trackId === music.trackId);
    return bool;
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
        { this.checksList()

          ? (
            <label
              data-testid={ `checkbox-music-${trackId}` }
              htmlFor={ index.toString() }
            >
              Favorita
              <input
                type="checkbox"
                name="fav"
                id={ index.toString() }
                onChange={ this.addToFavorites }
                checked={ check }
              />
            </label>
          )
          : (
            <label
              data-testid={ `checkbox-music-${trackId}` }
              htmlFor={ index.toString() }
            >
              Favorita
              <input
                type="checkbox"
                name="fav"
                id={ index.toString() }
                onChange={ this.addToFavorites }
                checked={ !check }
                // onClick={ removeElement }
              />
            </label>)}
        { loading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  listaFavs: PropTypes.arrayOf(PropTypes.shape({
    some: PropTypes.func,
  })).isRequired,
  index: PropTypes.number.isRequired,
  music: PropTypes.shape({
    trackName: PropTypes.string,
    trackId: PropTypes.number,
    previewUrl: PropTypes.string,
  }).isRequired,
  removeElement: PropTypes.func.isRequired,
};

export default MusicCard;
