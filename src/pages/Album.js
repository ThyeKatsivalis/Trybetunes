import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../Carregando';

class Album extends Component {
  state = {
    resultado: null,
    melodies: [],
    myFavorites: [],
    loading: false,
  };

  componentDidMount() {
    this.takeResult();
  }

  takeResult = async () => {
    const { match: { params: { id } } } = this.props;
    const resultado = await getMusics(id);
    const melodie = resultado.filter((track) => track.kind === 'song');
    const favorite = await getFavoriteSongs();
    this.setState({
      melodies: melodie,
      myFavorites: favorite,
      resultado,
      loading: false,
    });
  };

  myTopFavorites = async (music, checked) => {
    this.setState({ loading: true });
    const { myFavorites } = this.state;
    if (checked) {
      myFavorites.splice(myFavorites.indexOf(music), 1);
      await removeSong(music);
      const topPreference = await getFavoriteSongs();
      this.setState({
        myFavorites: topPreference,
        loading: false,
      });
    } else {
      await addSong(music);
      const topPreference = await getFavoriteSongs();
      this.setState({
        myFavorites: topPreference,
        loading: false,
      });
    }
  };

  isChecked = (music) => {
    const { myFavorites } = this.state;
    return myFavorites.some((favoriteMusic) => music.trackId === favoriteMusic.trackId);
  };

  render() {
    const { resultado, loading, melodies } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <main>
          { resultado !== null && (
            <div className="album-card">
              <h1 data-testid="artist-name">{resultado[0].artistName}</h1>
              <h1 data-testid="album-name">{resultado[0].collectionName}</h1>
            </div>)}
          { loading ? <Carregando /> : (
            <div>
              {
                melodies.filter(({ kind }) => kind === 'song').map((music, i) => (
                  <section key={ i }>
                    <MusicCard
                      music={ music }
                      myTopFavorites={ this.myTopFavorites }
                      checked={ this.isChecked(music) }
                    />
                  </section>))
              }
            </div>)}
        </main>
      </div>
    );
  }
}
Album.defaultProps = {
  match: {},
};
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string,
  }),
};
export default Album;
