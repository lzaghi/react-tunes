import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      listaFavs: [],
    };
  }

  async componentDidMount() {
    this.setState(
      { loading: true },
      async () => {
        const lista = await getFavoriteSongs();
        console.log(lista);
        this.setState({ loading: false, listaFavs: lista });
      },
    );
  }

  removeElement = ({ target }) => {
    target.parentNode.parentNode.remove();
  };

  render() {
    const { loading, listaFavs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading
          ? <Loading />
          : (
            listaFavs.map((music, index) => (
              <MusicCard
                key={ index }
                music={ music }
                index={ index }
                listaFavs={ listaFavs }
                removeElement={ this.removeElement }
              />
            ))
          )}
      </div>
    );
  }
}

export default Favorites;
