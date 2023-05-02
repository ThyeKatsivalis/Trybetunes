import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong, addSong } from '../services/favoriteSongsAPI';
import Carregando from '../Carregando';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  state = {
    myFavorites: [],
    loading: true,
  };

  componentDidMount() {
    this.theFavorites();
  }

  theFavorites = async () => {
    const myTopPreference = await getFavoriteSongs();
    this.setState({ myFavorites: myTopPreference, loading: false });
  };

  myTopFavorites = async (music, checked) => {
    this.setState({ loading: true });
    if (!checked) await addSong(music);
    if (checked) await removeSong(music);
    const newFavorites = await getFavoriteSongs();
    this.setState({
      loading: false,
      myFavorites: newFavorites,
    });
  };

  isChecked = (music) => {
    const { myFavorites } = this.state;
    return myFavorites.some((favoriteMusic) => music.trackId === favoriteMusic.trackId);
  };

  render() {
    const { myFavorites, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Favoritas</p>
        { loading && <Carregando />}
        <ul>
          { myFavorites.map((favorite, i) => (
            <section key={ i }>
              <MusicCard
                music={ favorite }
                myTopFavorites={ this.myTopFavorites }
                checked={ this.isChecked(favorite) }
              />
            </section>
          )) }
        </ul>
      </div>
    );
  }
}
export default Favorites;
