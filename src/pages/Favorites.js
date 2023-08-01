import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import styles from './styles/Favorites.module.css';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
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
        this.setState({ loading: false, listaFavs: lista });
      },
    );
  }

  componentDidUpdate() {
    const { listaFavs } = this.state;
    const newList = JSON.parse(localStorage.getItem('favorite_songs'));
    if (JSON.stringify(newList) !== JSON.stringify(listaFavs)) {
      this.setState({ listaFavs: newList });
    }
  }

  handleListUpdating = (newList) => {
    this.setState({ listaFavs: newList });
  };

  render() {
    const { loading, listaFavs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className={ styles.favContainer }>
          <p className={ styles.favP }>Músicas favoritas</p>
          {!loading && (
            !listaFavs.length ? (
              <p className={ styles.noFav }>
                Você ainda não tem nenhuma música favorita...
              </p>
            ) : (
              listaFavs.map((music, index) => (
                <MusicCard
                  key={ index }
                  music={ music }
                  index={ index }
                  listaFavs={ listaFavs }
                  handleListUpdating={ this.handleListUpdating }
                  props={ this.props }
                />
              ))))}
        </div>
        { loading
          && <div className={ styles.loading }><Loading /></div>}
      </div>
    );
  }
}

export default Favorites;
