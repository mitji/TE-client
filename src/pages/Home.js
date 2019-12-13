import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { withAuth } from '../services/AuthProvider';

import Dashboard from './Dashboard';

class Home extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <div>
        {isLoggedin ? (
            <Dashboard user={user} logout={logout}/>
        ) : (
          <div>
            <Link to="/login">
              {' '}
              <button>Login</button>{' '}
            </Link>
            <br />
            <Link to="/signup">
              {' '}
              <button>Signup</button>{' '}
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(Home);
