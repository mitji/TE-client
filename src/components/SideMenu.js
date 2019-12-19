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
            <div className="logo-container">
              <img className="logo" src={'/logo.png'} alt="logo"/>
            </div>
            <div className="sidebar__links-wrapper">
              <NavLink to="/profile" activeClassName="selected"><h4>Profile</h4></NavLink>
              <NavLink to="/my-trainings" activeClassName="selected"><h4>My trainings</h4></NavLink>
              <NavLink to="/discover" activeClassName="selected"><h4>Discover</h4></NavLink>
              <div className="logout">
                <button className="btn-icon" onClick={this.props.logout}>
                  <img src={"/logout.png"} alt="logout" className="btn-icon__action"/>
                </button>
              </div>
            </div>
          </section>
        )
        : null}
      </div>
      
    )
  }
}

export default withAuth(SideMenu);