import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import exercisesService from './../services/exercises-service';
import profileService from './../services/profile-service';

class ExerciseDetails extends Component {

  state = {
    exercise: {},
    userId: ''
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    const {id} = this.props.match.params; // get exercise id from url
    exercisesService.getOne(id)
      .then( (exercise) => {
        profileService.getUser()
          .then( (user) => {
            this.setState({exercise})
            this.setState({userId: user._id})
          })
          .catch( (err) => console.log(err));
      })
  }

  render() {
    const exercise = this.state.exercise;
    const userId = this.state.userId;
    return(
      <main className="content">
        <h1>Exercise details</h1>
        { 
          exercise ?
          ( <div>
              <h2>{exercise.title}</h2>
              {
                (!exercise.share) 
                ? <Link to={`/profile/${exercise._id}/edit`}><button>Edit</button></Link>
                : null
              }
              <p>{exercise.description}</p>
              <p><strong>Duration:</strong> {exercise.duration}</p>
              {
                (exercise._id !== userId) ?
                (
                  <button>Save</button>
                )
                : null
              }
            </div>
          )
          : null
        }
        <button onClick={() => this.props.history.goBack()}>Back</button>

      </main>
    )
  }
}

export default ExerciseDetails;