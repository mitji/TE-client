import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withAuth } from '../services/AuthProvider';

class SideMenu extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (     
      <div>
        {isLoggedin ?
        (
          <section className="sidebar">
            <img className="logo" src="" alt="logo"/>
            <div className="sidebar__links-wrapper">
              <NavLink to="/profile" activeClassName="selected"><h4>Profile</h4></NavLink>
              <NavLink to="/my-trainings" activeClassName="selected"><h4>My trainings</h4></NavLink>
              <NavLink to="/discover" activeClassName="selected"><h4>Discover</h4></NavLink>
              <NavLink to="#" ><h4>Articles</h4></NavLink>
              <button onClick={this.props.logout}>Logout</button>
            </div>
          </section>
        )
        : null}
      </div>
      
    )
  }
}

export default withAuth(SideMenu);