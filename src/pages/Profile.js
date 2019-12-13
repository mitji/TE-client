import React, { Component } from 'react';
import profileService from './../services/profile-service'
import shortid from 'shortid'
import './../styles/navigation.scss';
import './../styles/dashboard.scss';


class Dashboard extends Component {

  state = {
    user: {}
  }

  componentDidMount() {
    profileService.getUser()
      .then( (userInfo) => {
        this.setState({user: userInfo});
      })
      .catch( (err) => console.log(err));    
  };

  render() {
    const userExercises = this.state.user.exercises;
    const savedExercises = this.state.user.savedExercises;

    return (
      <div className="content">
          <div className="profile-column">            
            <h1>User Exercises</h1>
            { userExercises ?
              (userExercises.map( exercise => {
                return (
                  <div className="" key={shortid.generate()}>
                    <h2>{exercise.title}</h2>
                    <p>{exercise.description}</p>
                    <p><strong>Duration: </strong>{exercise.duration} min</p>
                  </div> 
                )
              }))
              : null
            }
          </div>

          <div className="profile-column">
            <h1>Saved Exercises</h1>
            {
              savedExercises ?
              (savedExercises.map( exercise => {
                return (
                  <div className="" key={shortid.generate()}>
                    <h2>{exercise.title}</h2>
                    <p>{exercise.description}</p>
                    <p><strong>Author: </strong>{exercise.author.name} {exercise.author.lastName}</p>
                    <p><strong>Duration:</strong>{exercise.duration}</p>
                  </div> 
                )
              }))
              : null
            }
          </div>
        </div>
    );
  }
}

export default Dashboard;