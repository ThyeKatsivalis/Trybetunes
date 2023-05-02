import React, { Component } from 'react';
import Carregando from '../Carregando';
import { getUser } from '../services/userAPI';
import NavLinks from './NavLinks';

class Header extends Component {
  state = {
    saveLogin: '',
    loading: true,
  };

  async componentDidMount() {
    const saveName = await getUser();
    this.setState({ saveLogin: saveName.name }, this.setState({ loading: false }));
  }

  render() {
    const { saveLogin, loading } = this.state;
    if (loading) return <Carregando />;
    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">
          { saveLogin }
        </h1>
        <NavLinks />
      </header>
    );
  }
}

export default Header;
