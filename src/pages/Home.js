import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { withAuth } from '../services/AuthProvider';

import Dashboard from './Dashboard';

class Home extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <div>
        {isLoggedin ? (
          <Redirect to="/profile" />
        ) : (
          <div>
            <Link to="/login">
              {' '}
              <button className="btn">Login</button>{' '}
            </Link>
            <br />
            <Link to="/signup">
              {' '}
              <button className="btn">Signup</button>{' '}
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(Home);
