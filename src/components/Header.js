import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import styles from './styles/Header.module.css';
import whiteLogo from '../utils/logo-white.png';
import logo from '../utils/logo.png';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.setState(
      { loading: true, nome: '' },
      async () => {
        const data = await getUser();
        this.setState({ loading: false, nome: data.name });
      },
    );
  }

  toggleMenu = (status) => {
    const nav = document.getElementsByClassName(styles.header)[0];
    nav.classList.toggle(`${styles['menu-expanded']}`, status);
  };

  render() {
    const { loading, nome } = this.state;

    return (
      <nav className={ styles.header }>
        <header className={ styles['top-bar'] }>
          <img
            className={ styles.whiteLogo }
            src={ whiteLogo }
            alt="trybe tunes logo"
          />
          <img
            className={ styles.normalLogo }
            src={ logo }
            alt="trybe tunes logo"
          />
          <button
            type="button"
            className={ styles.open }
            onClick={ () => this.toggleMenu(true) }
          >
            <span className={ `material-symbols-outlined ${styles.icon}` }>
              menu
            </span>
          </button>
          <button
            type="button"
            className={ styles.close }
            onClick={ () => this.toggleMenu(false) }
          >
            <span className={ `material-symbols-outlined ${styles.icon}` }>
              close
            </span>
          </button>
        </header>

        <div className={ styles.burger }>
          <div className={ styles.links }>
            <div className={ styles.linkBox }>
              <span className={ `material-symbols-outlined ${styles.iconSm}` }>
                search
              </span>
              <Link
                data-testid="link-to-search"
                to="/search"
                className={ styles.link }
                onClick={ () => this.toggleMenu(false) }
              >
                Pesquisa
              </Link>
            </div>
            <div className={ styles.linkBox }>
              <span className={ `material-symbols-outlined ${styles.iconSm}` }>
                favorite
              </span>
              <Link
                data-testid="link-to-favorites"
                to="/favorites"
                className={ styles.link }
                onClick={ () => this.toggleMenu(false) }
              >
                Favoritas
              </Link>
            </div>
            <div className={ styles.linkBox }>
              <span className={ `material-symbols-outlined ${styles.iconSm}` }>
                person
              </span>
              <Link
                data-testid="link-to-profile"
                to="/profile"
                className={ styles.link }
                onClick={ () => this.toggleMenu(false) }
              >
                Perfil

              </Link>
            </div>
          </div>

          <div data-testid="header-component" className={ styles.user }>
            { loading
              ? <Loading />
              : (
                <h2 data-testid="header-user-name">{ nome }</h2>
              )}
          </div>
        </div>

      </nav>
    );
  }
}

export default Header;
