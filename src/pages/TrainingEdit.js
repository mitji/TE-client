import React, { Component } from 'react';

import trainingsService from './../services/trainings-service';
import profileService from './../services/profile-service';

import TrainingExerciseEdit from './../components/TrainingExerciseEdit';
import ExerciseList from './../components/ExerciseList';

import Select from 'react-select';

const sports = [
  { value: 'all', label: 'All' },
  { value: 'rugby', label: 'Rugby' },
  { value: 'basketball', label: 'Basketball' },
  { value: 'football', label: 'Football' },
];

class TrainingEdit extends Component {

  state = {
    training: {},
    trainingExercises: [],
    user: {},
    showEdit: false,
    exerciseToEdit: null,
    sport: {}
  }

  handleInput = e => {
    const { name, value } = e.target;
    const trainingCopy = this.state.training;
    trainingCopy[name] = value;
    this.setState({ training: trainingCopy });
  };

  handleSport = (selected) => {
    this.setState({sport: selected})
  }

  updateTraining = (e) => {
    e.preventDefault();
    const id = this.state.training._id;
    const { title, description, duration } = this.state.training;

    const sport = this.state.sport.value;

    trainingsService.modifyOne({ title, description, duration, sport }, id)
      .then( (modifiedTraining) => {
        this.setState({ training: modifiedTraining });
        this.props.history.push(`/my-trainings/${id}`);
      })
      .catch( (err) => console.log(err));
  }

  editExercise = (updatedEx) => {
    const copyTrEx = this.state.trainingExercises;

    const indexOfModified = copyTrEx.filter( (exercise, i) => {
      if (exercise._id === updatedEx._id) {
        return i
      }
    });

    copyTrEx[indexOfModified] = updatedEx;
    this.setState({trainingExercises: copyTrEx});

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

  editToggle = (exercise) => {
    const show = !this.state.showEdit;
    this.setState(
      {showEdit: show, 
      exerciseToEdit: exercise}
    );
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    const {id} = this.props.match.params;

    trainingsService.getOne(id)
      .then( (training) => {
        profileService.getUser()
          .then( (userInfo) => {
            const sport = {
              value: training.sport,
              label: `${training.sport.charAt(0).toUpperCase()}${training.sport.slice(1)}`
            };
            this.setState({training, trainingExercises: training.exercises, user: userInfo, sport});
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
        <div className="training-header">
          <h1>Edit training</h1>
          <button className="btn btn-delete" onClick={this.deleteTraining}>Delete training</button>
        </div>
        <div className="edit-training">
          {this.state.showEdit ?
            (
              <TrainingExerciseEdit 
                classToggle={this.state.showEdit} 
                click={this.editToggle}
                editExercise={this.editExercise}
                exercise={this.state.exerciseToEdit}
              />
            )
            :null
          }
        
          <section className="edit-training__info">
            <form onSubmit={this.updateTraining} class="input-form">
              <label htmlFor="">Title</label>
              <input class="input" type="text" value={training.title} name="title" onChange={this.handleInput} />
              <label htmlFor="">Description</label>
              <textarea value={training.description} name="description" onChange={this.handleInput}/>
              <div className="inline-display">
                <label htmlFor="">Duration</label>
                <input className="input" type="number" value={training.duration} name="duration" onChange={this.handleInput} required/>
                <span>min</span>
              </div>
              <label htmlFor="">Sport</label>
                  <Select
                    className="select"
                    value={this.state.sport}
                    onChange={this.handleSport}
                    options={sports}
                    placeholder={training.sport}
                    required
                  />
              <button className="btn btn-success">Save</button>
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
                            <span>{exercise.duration} | <span className={`item-type ${exercise.type}`}>{exercise.type}</span></span>
                            <p><strong>Sport: </strong>{exercise.sport}</p>
                            <p>{exercise.description}</p>    
                          </div>
                          <div className="training-info__exercises__buttons">
                            <button className="btn btn-edit" onClick={() => this.editToggle(exercise)}>Edit</button>
                            <button className="btn-icon" onClick={() => this.removeExerciseFromTraining(exercise._id)}>
                              <img src={"/bin.png"} alt="remove-exercise" className="btn-icon__action"/>
                            </button>
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

export default TrainingEdit;