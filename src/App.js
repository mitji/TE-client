import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import "./App.scss";
import "./styles/auth.scss";

import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';

// Routes
import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

import SearchBar from './components/SearchBar';
import SideMenu from './components/SideMenu';

import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import MyTrainings from './pages/MyTrainings';
import Discover from './pages/Discover';
import ExerciseDetails from './pages/ExerciseDetails';
import ExerciseNew from './pages/ExerciseNew';
import ExerciseEdit from './pages/ExerciseEdit';
import TrainingDetails from './pages/TrainingDetails';
import TrainingNew from './pages/TrainingNew';
import TrainingEdit from './pages/TrainingEdit';


import './styles/buttons.scss';

class App extends Component {

  state = {
    searchResult: []
  }

  submitSearch = (e, searchStr) => {
    e.preventDefault();
    this.props.history.push(`/discover?search=${searchStr}`);
  }

  render() {
    return (
      <div className="App">
        {/* SearchBar component --> search, name and image here*/}
        <SearchBar submit={this.submitSearch}/>
        {/* SideMenu component --> logout here*/}
        <SideMenu/>
        <Switch>
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />
          
          <PrivateRoute exact path="/" component={Home} />
          {/* Navigation routes */}
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/my-trainings" component={MyTrainings} />
          <PrivateRoute exact path="/discover" component={Discover}/>

          {/* INNER ROUTES */}
          {/* -- Profile -- */}
          <PrivateRoute exact path="/profile/new-exercise" component={ExerciseNew} />
          <PrivateRoute exact path="/profile/edit" component={ProfileEdit} />
          <PrivateRoute exact path="/profile/:id" component={ExerciseDetails} />
          <PrivateRoute exact path="/profile/:id/edit" component={ExerciseEdit} />

          {/* -- My trainings -- */}
          <PrivateRoute exact path="/my-trainings/new-training" component={TrainingNew} />
          <PrivateRoute exact path="/my-trainings/:id" component={TrainingDetails} />
          <PrivateRoute exact path="/my-trainings/:id/edit" component={TrainingEdit} />

          {/* -- Discover -- */}
          <PrivateRoute exact path="/discover/:id" component={ExerciseDetails} />
          {/* -- Forum -- */}
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
