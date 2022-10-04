import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const data = await getMusics(match.params.id);
    console.log(data);
    this.setState({ musics: data });
  }

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { musics.length > 0 && (
          musics.map((music, index) => (
            index === 0
              ? (
                <div key={ index }>
                  <h3 data-testid="artist-name">{music.artistName}</h3>
                  <h4 data-testid="album-name">{music.collectionName}</h4>
                </div>)
              : <MusicCard key={ index } music={ music } index={ index } />
          ))
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
