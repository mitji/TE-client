import React, { Component } from 'react';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

import profileService from './../services/profile-service';


import './../styles/navigation.scss';
import './../styles/dashboard.scss';
import './../styles/profile.scss';

import TrainingCard from './../components/TrainingCard';
import ExerciseList from './../components/ExerciseList';

class Dashboard extends Component {

  state = {
    user: {},
    savedExercisesLength: 0
  }

  updateLength = () => {
    let length = this.state.savedExercisesLength;
    length -= 1;
    this.setState({savedExercisesLength: length});
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    profileService.getUser()
      .then( (userInfo) => {
        this.setState({user: userInfo});
        this.setState({savedExercisesLength: userInfo.savedExercises.length})
      })
      .catch( (err) => console.log(err));    
  };

  render() {
    const userExercises = this.state.user.exercises;
    const savedExercises = this.state.user.savedExercises;
    const userTrainings = this.state.user.trainings;

    return (
      <main className="content">
          <h1>Profile</h1>
        <div className="profile-container">
          {/* List of user Trainings */}
          <div className="profile-column"> 
          <div className="header">
            {
              userTrainings 
                ? <h2>Your Trainings ({userTrainings.length})</h2>
                : <h2>Your Trainings (0)</h2>
                
            }
          </div>
             
            { userTrainings ?
              (
                <div className="training-container">
                {userTrainings.map( training => {
                  return (
                    <TrainingCard training={training} key={shortid.generate()}/>
                  )
                })}
                </div>
              )
              : null
            }
          </div>
          {/* List of user Exercises */}
          <div className="profile-column"> 
            <div className="header">
              {
                userExercises 
                  ? <h2>Your Exercises ({userExercises.length})</h2>
                  : <h2>Your Exercises (0)</h2>
              }   
              <Link className="btn btn-create" to={'/profile/new-exercise'}>New</Link>  
            </div>
                  
            { userExercises ?
              (
                <ExerciseList exercises={userExercises} userId={this.state.user._id}/>
              )
              : null
            }
          </div>
          {/* List of user saved exercises */}
          <div className="profile-column">
          <div className="header">
            {
              savedExercises 
                ? <h2>Saved Exercises ({this.state.savedExercisesLength})</h2>
                : <h2>Saved Exercises (0)</h2>
            } 
          </div>
             
            { 
              savedExercises ?
                (
                  <ExerciseList exercises={savedExercises} userId={this.state.user._id} updateLength={this.updateLength}/>
                )
              : null
            }
          </div>
        </div> 
      </main>
    );
  }
}

export default Dashboard;