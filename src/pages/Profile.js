import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from '../Carregando';

class Profile extends Component {
  state = { userClient: null };

  componentDidMount() {
    this.recoverUser();
  }

  recoverUser = async () => {
    const getListen = await getUser();
    this.setState({ userClient: getListen });
  };

  render() {
    const { userClient } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <p>Perfil</p>
        <section>
          { userClient !== null ? (
            <div>
              <h2>{userClient.name}</h2>
              <p>{userClient.email}</p>
              <p>{userClient.description}</p>
              <img
                data-testid="profile-image"
                src={ userClient.image }
                alt="Imagem do usuário"
              />
            </div>
          ) : <Carregando />}
        </section>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}
export default Profile;
