import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './../components/PrivateRoute';



class SideMenu extends Component {
  render() {
    
    return (
      
      <section className="sidebar">
        <img className="logo" src="" alt="logo"/>
        <div className="sidebar__links-wrapper">
          <Link to="/"><h4>Profile</h4></Link>
          <Link to="/my-trainings"><h4>My trainings</h4></Link>
          <Link to="/discover"><h4>Discover</h4></Link>
          <Link to="#"><h4>Articles</h4></Link>
          <button onClick={this.props.logout}>Logout</button>
        </div>

      </section>
    )
  }
}

export default SideMenu;