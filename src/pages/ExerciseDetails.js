import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import exercisesService from './../services/exercises-service'

class ExerciseDetails extends Component {

  state = {
    exercise: {}
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    const {id} = this.props.match.params; // get id from url
    exercisesService.getOne(id)
      .then( (exercise) => {
        this.setState({exercise})
      })
      .catch( (err) => console.log(err));
  }

  render() {
    const exercise = this.state.exercise;
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
            </div>
          )
          : null
        }
        <button onClick={() => this.props.history.push('/profile')}>Back</button>

      </main>
    )
  }
}

export default ExerciseDetails;