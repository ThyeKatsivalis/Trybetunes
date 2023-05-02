import React, { Component } from 'react';
import Header from '../components/Header';

class ProfileEdit extends Component {
  render() {
    return (
      <>
        <div data-testid="page-profile-edit">
          <p>Profile Edit</p>
        </div>
        <div>
          <Header />
        </div>

      </>
    );
  }
}

export default ProfileEdit;
