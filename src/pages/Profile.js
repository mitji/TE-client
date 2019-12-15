import React, { Component } from 'react';
import profileService from './../services/profile-service';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

import './../styles/navigation.scss';
import './../styles/dashboard.scss';
import './../styles/profile.scss';

import TrainingCard from './../components/TrainingCard';
import ExerciseList from './../components/ExerciseList';

class Dashboard extends Component {

  state = {
    user: {}
  }

  unsaveExercise(e, id) {
    profileService.unsaveExercise(id)
      .then( (user) => {
        //button.parentElement.remove();  
        this.setState(user);
      })
      .catch( (err) => console.log(err));
    // const exerciseContainer = e.target.parentElement;
    // exerciseContainer.parentElement.removeChild(exerciseContainer);
  }
  

  componentDidMount(id) {
    profileService.getUser()
      .then( (userInfo) => {
        this.setState({user: userInfo});
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
          <div className="profile-column"> 
            {
              userTrainings 
                ? <h2>Your Trainings ({userTrainings.length})</h2>
                : <h2>Your Trainings (0)</h2>
                
            }   
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
          <div className="profile-column"> 
            {
              userExercises 
                ? <h2>Your Exercises ({userExercises.length})</h2>
                : <h2>Your Exercises (0)</h2>
                
            }   
            <Link>Create exercise</Link>        
            { userExercises ?
              (
                <ExerciseList exercises={userExercises} userId={this.state.user._id}/>
              )
              : null
            }
          </div>

          <div className="profile-column">
            {
              savedExercises 
                ? <h2>Saved Exercises ({savedExercises.length})</h2>
                : <h2>Saved Exercises (0)</h2>
            }  
            { 
              savedExercises ?
                (
                  <ExerciseList exercises={userExercises} userId={this.state.user._id}/>
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