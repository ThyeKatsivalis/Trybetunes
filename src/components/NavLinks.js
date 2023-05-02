import { Component } from 'react';
import { Link } from 'react-router-dom';

class NavLinks extends Component {
  render() {
    return (
      <div className="header-nav">
        <ul>
          <Link to="/search">
            <li data-testid="link-to-search">Buscar</li>
          </Link>
          <Link to="/profile">
            <li data-testid="link-to-profile">Perfil</li>
          </Link>
          <Link to="/favorites">
            <li data-testid="link-to-favorites">Favoritas</li>
          </Link>
        </ul>
      </div>
    );
  }
}
export default NavLinks;
