import React, {Component} from 'react';

import trainingsService from './../services/trainings-service';
import profileService from './../services/profile-service';

import ExerciseList from './../components/ExerciseList';

class TrainingNew extends Component {

  state = {
    training: {},
    trainingId: '',
    trainingExercises: [],
    user: {}
  }
 
  handleInput = e => {
    const { name, value } = e.target;
    const trainingCopy = this.state.training;
    trainingCopy[name] = value;
    this.setState({ training: trainingCopy });
  };

  saveTraining = (e) => {
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

  cancelNewTraining = (e) => {
    e.preventDefault();
    const trainingId = this.state.training._id;
    trainingsService.deleteOne(trainingId)
      .then( () => this.props.history.push('/my-trainings'))
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

  removeExerciseFromTraining = (exerciseId) => {
    trainingsService.deleteExercise(this.state.training._id, exerciseId)
      .then( (data) => {
        const trainingExercises = data.exercises;
        this.setState({trainingExercises});
      })
      .catch( (err) => console.log(err));
  }

  componentDidMount() {
    window.scrollTo(0,0);
    // *LOGIC* --> with the current model, to be able to add exercises in the new training, we need to 
    // create the training when the page is loaded, so when the user saves the info, it is actually
    // updating the training that has just been created
    const title = ' ';
    const description = ' ';
    const duration = '0';
    const sport = ' ';

    trainingsService.create({title, description, duration, sport})
      .then( (newTraining) => {
        profileService.getUser()
          .then( (userInfo) => {
            this.setState({training: newTraining, 
                          trainingId: newTraining._id, 
                          trainingExercises: newTraining.exercises, 
                          user: userInfo
            });
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
      <main className="content">
        <button className="btn-icon" onClick={() => this.props.history.goBack()}>
          <img src={'/arrow.svg'} className="back-icon" alt=""/>
        </button>
        <div className="edit-training">
          <section className="edit-training__info">
            <form onSubmit={this.saveTraining}>
              <label htmlFor="">Title</label>
              <input type="text" value={training.title} name="title" onChange={this.handleInput} />
              <label htmlFor="">Description</label>
              <textarea value={training.description} name="description" onChange={this.handleInput}/>
              <label htmlFor="">Duration</label>
              <input type="number" value={training.duration} name="duration" onChange={this.handleInput}/>
              <label htmlFor="">Sport</label>
              <select name="sport" ref="sport" value={this.state.training.sport} onChange={this.handleInput}>
                <option value="">-</option>
                <option value="all">All</option>
                <option value="basketball">Basketball</option>
                <option value="rugby">Rugby</option>
                <option value="football">Football</option>
              </select>
              <button className="btn">Save</button>
              <button className="btn" onClick={() => this.props.history.goBack()}>Back</button>
              <button className="btn" onClick={this.cancelNewTraining}>Cancel</button>
            </form>
            <div className="exercises-edit">
              {
                trainingExercises ?
                  (
                    trainingExercises.map( (exercise, i) => {
                      return (
                        <div className="training-info__exercises" key={i}>
                          <div className="training-info__exercises__details">
                            <h4>{exercise.title}</h4>
                            <span className={`item-type ${exercise.type}`}>{exercise.type}</span>
                            <p>{exercise.description}</p>
                            <p><strong>Sport: </strong>{exercise.sport}</p>
                          </div>
                          <div className="training-info__exercises__buttons">
                            <button className="btn" onClick={() => this.removeExerciseFromTraining(exercise._id)}>Remove</button>
                          </div>
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
        </div>
        
      </main>
    )
  }
}

export default TrainingNew;