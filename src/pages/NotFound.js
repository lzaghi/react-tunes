import React from 'react';
import Header from '../components/Header';
import styles from './styles/NotFound.module.css';

class NotFound extends React.Component {
  render() {
    return (
      <div className={ styles.wrapper } data-testid="page-not-found">
        <Header />
        <div className={ styles.freeSpace }>
          <div className={ styles.bgTop } />
          <h1 className={ styles.message }>Página não encontrada!</h1>
        </div>
      </div>
    );
  }
}

export default NotFound;
