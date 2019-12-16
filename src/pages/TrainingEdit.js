import React, { Component } from 'react';

import trainingsService from './../services/trainings-service';
import profileService from './../services/profile-service';

import ExerciseList from './../components/ExerciseList';

class TrainingEdit extends Component {

  state = {
    training: {},
    trainingExercises: [],
    user: {}
  }

  handleInput = e => {
    const { name, value } = e.target;
    const trainingCopy = this.state.training;
    trainingCopy[name] = value;
    this.setState({ training: trainingCopy });
  };

  updateTraining = (e) => {
    e.preventDefault();
    const id = this.state.training._id;
    const { title, description, duration, sport } = this.state.training;

    trainingsService.modifyOne({ title, description, duration, sport }, id)
      .then( (modifiedTraining) => {
        this.setState({ training: modifiedTraining });
        this.props.history.push(`/my-trainings/${id}`);
      })
      .catch( (err) => console.log(err));
  }

  addExercise = (exerciseId) => {
    const trainingId = this.state.training._id;

    trainingsService.addExercise(trainingId, exerciseId)
      .then( (result) => {
        const trainingExercises = result.data.exercises;
        this.setState({trainingExercises});
      })
      .catch( (err) => console.log(err));
  }

  deleteTraining = (e) => {
    e.preventDefault();
    const trainingId = this.state.training._id;
    trainingsService.deleteOne(trainingId)
      .then( () => this.props.history.push('/my-trainings'))
      .catch( (err) => console.log(err));
  }

  removeExerciseFromTraining = (exerciseId) => {
    console.log('in')
    trainingsService.deleteExercise(this.state.training._id, exerciseId)
      .then( (data) => {
        const trainingExercises = data.exercises;
        this.setState({trainingExercises});
      })
      .catch( (err) => console.log(err));
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    const {id} = this.props.match.params;

    trainingsService.getOne(id)
      .then( (training) => {
        profileService.getUser()
          .then( (userInfo) => {
            this.setState({training});
            this.setState({trainingExercises: training.exercises});
            this.setState({user: userInfo});
          })
          .catch( (err) => console.log(err));
      })
    
  }

  render() {
    const training = this.state.training;
    const trainingExercises = this.state.trainingExercises;
    const userExercises = this.state.user.exercises;
    const savedExercises = this.state.user.savedExercises;

    
    return(
      <main className="content edit-training">
        <section className="edit-training__info">
          <form onSubmit={this.updateTraining}>
            <label htmlFor="">Title</label>
            <input type="text" value={training.title} name="title" onChange={this.handleInput} />
            <label htmlFor="">Description</label>
            <textarea value={training.description} name="description" onChange={this.handleInput}/>
            <label htmlFor="">Duration</label>
            <input type="number" value={training.duration} name="duration" onChange={this.handleInput}/>
            <label htmlFor="">Sport</label>
            <input type="text" name="sport" value={training.sport} onChange={this.handleInput}/>
            <button>Save</button>
            <button onClick={() => this.props.history.goBack()}>Back</button>
            <button onClick={this.deleteTraining}>Delete training</button>
          </form>
          <div className="exercises-edit">
            {
              trainingExercises ?
                (
                  trainingExercises.map( (exercise, i) => {
                    return (
                      <div className="training-info__exercises" key={i}>
                        <h4>{exercise.title}</h4>
                        <span className={`item-type ${exercise.type}`}>{exercise.type}</span>
                        <p>{exercise.description}</p>
                        <p><strong>Sport: </strong>{exercise.sport}</p>
                        <button onClick={() => this.removeExerciseFromTraining(exercise._id)}>Remove</button>
                      </div>
                    )
                  })
                
                )
                  
              : null
            }
          </div>
        </section>
        <section className="edit-training__user-exercises">
          {
            userExercises 
              ? <h2>Your Exercises ({userExercises.length})</h2>
              : <h2>Your Exercises (0)</h2>  
          }  
          { userExercises ?
                (
                  <ExerciseList
                    exercises={userExercises}
                    userId={this.state.user._id} 
                    inEditTraining={true}
                    addExercise={this.addExercise}
                  />
                )
                : null
              }
        </section>
        <section className="edit-training__saved-exercises">
          {
            savedExercises
              ? <h2>Saved Exercises ({savedExercises.length})</h2>
              : <h2>Saved Exercises (0)</h2>
          }
          {
            savedExercises ?
              (
                <ExerciseList
                  exercises={savedExercises}
                  userId={this.state.user._id} 
                  inEditTraining={true}
                  addExercise={this.addExercise}
                />
              )
            : null
          }
        </section>
      </main>
    )
  }
}

export default TrainingEdit;