import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import SearchBar from './../components/SearchBar';
import SideMenu from './../components/SideMenu';
import PrivateRoute from './../components/PrivateRoute';

import Profile from './Profile';
import MyTrainings from './MyTrainings';
import Discover from './Discover';

import './../styles/navigation.scss';
import './../styles/dashboard.scss';

class Dashboard extends Component {

  render() {
    return (
      <div>
        {/* SearchBar component --> name and image here*/}
        <SearchBar userName={this.props.user.name}/>
        {/* SideMenu component --> logout here*/}
        <SideMenu logout={this.props.logout}/> 
        <div>
          <Switch>
            <PrivateRoute exact path="/" component={Profile} />
            <PrivateRoute exact path="/my-trainings" component={MyTrainings} />
            <PrivateRoute exact path="/discover" component={Discover} />   
          </Switch>
        </div>
        
          
      </div>
    );
  }
}

export default Dashboard;
