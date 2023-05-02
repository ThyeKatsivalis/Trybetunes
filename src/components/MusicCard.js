import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  componentDidMount() {
    getFavoriteSongs();
  }

  render() {
    const { music: timeMusic, myTopFavorites, checked } = this.props;
    const { trackName, artistName,
      artworkUrl100, previewUrl, trackId } = timeMusic;
    return (
      <div className="track-card">
        <p>
          <strong>{ trackName }</strong>
          -
          { artistName }
        </p>
        <img src={ artworkUrl100 } alt="Capa de Álbum" />
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite-checkbox">
          { checked ? (<input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id="favorite-checkbox"
            onChange={ () => myTopFavorites(timeMusic, checked) }
            checked
          />) : (<input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id="favorite-checkbox"
            onChange={ () => myTopFavorites(timeMusic, checked) }
          />
          )}
          Favorita
        </label>

      </div>
    );
  }
}

MusicCard.defaultProps = { myTopFavorites: () => {}, checked: false };
MusicCard.propTypes = {
  music: PropTypes.shape({
    collectionId: PropTypes.number,
    trackName: PropTypes.string,
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  myTopFavorites: PropTypes.func,
  checked: PropTypes.bool,
};
export default MusicCard;
