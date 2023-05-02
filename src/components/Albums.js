import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Albums extends Component {
  pullArtistAlbum = () => {
    const { resultApi } = this.props;
    return (
      resultApi.map(({ artistName, collectionName, artworkUrl100, collectionId }) => (
        <Link
          key={ collectionId }
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <div
            className="album-card"
          >
            <h1>{ artistName }</h1>
            <h3>{ collectionName }</h3>
            <img src={ artworkUrl100 } alt="Capa de Álbum" />
          </div>
        </Link>
      )));
  };

  render() {
    const { resultApi, artistName } = this.props;
    return (
      <div>
        <p>
          { `Resultado de álbuns de: ${artistName}` }
        </p>
        <section className="Albums">
          {resultApi.length > 0 ? this.pullArtistAlbum()
            : <p>Nenhum álbum foi encontrado</p>}
        </section>
      </div>
    );
  }
}

Albums.propTypes = {
  artistName: PropTypes.string.isRequired,
  resultApi: PropTypes.shape({
    map: PropTypes.func,
    length: PropTypes.number,
  }).isRequired,
};

export default Albums;
