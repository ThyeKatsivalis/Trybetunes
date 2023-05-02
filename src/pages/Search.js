import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Albums from '../components/Albums';
import Carregando from '../Carregando';

class Search extends Component {
  state = {
    searchArtistcBtn: true,
    artistNamed: '',
    loading: undefined,
    resultApi: [],
    GreatestHit: false,
    surName: '',
  };

  artistEnableBtn = ({ target }) => {
    this.setState({
      artistNamed: target.value,
    });
    if (target.value.length > 1) {
      this.setState({ searchArtistcBtn: false, artistNamed: target.value });
    } else {
      this.setState({ searchArtistcBtn: true, artistNamed: target.value });
    }
  };

  artistAlbumFinder = async (artistNamed) => {
    this.setState({ loading: true });
    const resultApi = await searchAlbumsAPI(artistNamed);
    this.setState({
      resultApi,
      GreatestHit: true,
      loading: false,
      surName: artistNamed,
      artistNamed: '',
    });
  };

  render() {
    const {
      searchArtistcBtn,
      artistNamed,
      resultApi,
      loading,
      GreatestHit,
      surName: artistName } = this.state;
    return (
      <>
        <div data-testid="page-search">
          Search
        </div>
        <div>
          <Header />
        </div>
        <section className="search-form">
          <label htmlFor="search-artist-input">
            Pesquisar Artista:
            <input
              id="search-artist-input"
              type="text"
              data-testid="search-artist-input"
              placeholder="nome do artista"
              value={ artistNamed }
              onChange={ this.artistEnableBtn }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ searchArtistcBtn }
            onClick={ () => this.artistAlbumFinder(artistNamed) }
          >
            Pesquisar
          </button>
          { loading === true && <Carregando /> }
          { GreatestHit && <Albums resultApi={ resultApi } artistName={ artistName } /> }
        </section>
      </>
    );
  }
}

export default Search;
