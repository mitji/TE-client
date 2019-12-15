import React, { Component } from 'react';
import { withAuth } from '../services/AuthProvider';

class SearchBar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <div>
        {isLoggedin ? 
          (
            <nav>
              <input type="text" placeholder="Search exercise..."/>
              <p>Hi {user.name}</p>
            </nav>
          ) 
          : null
        }
      </div>
      
    )
  }
}

export default withAuth(SearchBar);
