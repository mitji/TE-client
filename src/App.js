import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import "./App.scss";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import MyTrainings from './pages/MyTrainings';
import Discover from './pages/Discover';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
          {/* <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/my-trainings" component={MyTrainings} />
          <PrivateRoute exact path="/discover" component={Discover} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
