import React, { Component } from 'react';
import exercisesService from './../services/exercises-service'

class ExerciseEdit extends Component {

  state = {
    exercise: {}
  }

  handleInput = e => {
    const { name, value } = e.target;
    const exerciseCopy = this.state.exercise;
    exerciseCopy[name] = value;
    this.setState({ exercise: exerciseCopy });
  };

  updateExercise = (e) => {
    e.preventDefault();
    const id = this.state.exercise._id;
    const {title, description, duration, sport, type, video_url, img_url, share} = this.state.exercise;
    
    exercisesService.modifyOne({title, description, duration, sport, type, video_url, img_url, share}, id)
      .then( (updatedExercise) => {
        this.setState({ exercise: updatedExercise });
        this.props.history.goBack();
      })
      .catch( (err) => console.log(err));
  }

  componentDidMount() {
    const {id} = this.props.match.params; // get id from url
    exercisesService.getOne(id)
      .then( (exercise) => {
        this.setState({exercise: exercise});
      })
      .catch( (err) => console.log(err));
  }

  render() {
    return(
      <main className="content">
        <h1>Exercise details</h1>

        <form onSubmit={this.updateExercise}>
          <label htmlFor="">Title</label>
          <input type="text" value={this.state.exercise.title} name="title" onChange={this.handleInput} />
          <label htmlFor="">Description</label>
          <textarea value={this.state.exercise.description} name="description" onChange={this.handleInput}/>
          <label htmlFor="">Duration</label>
          <input type="number" value={this.state.exercise.duration} name="duration" onChange={this.handleInput}/>
          <label htmlFor="">Sport</label>
          <input type="text" name="sport" value={this.state.exercise.sport} onChange={this.handleInput}/>
          <label htmlFor="">Type</label>
          <input type="text" name="type" value={this.state.exercise.type} onChange={this.handleInput}/>
          <label htmlFor="">Video</label>
          <input type="text" name="video_url" value={this.state.exercise.video_url} onChange={this.handleInput}/>
          <label htmlFor="">Image</label>
          <input type="text" name="img_url" value={this.state.exercise.img_url} onChange={this.handleInput}/>
          <label htmlFor="">Share</label>
          <input type="text" name="share" value={this.state.exercise.share} onChange={this.handleInput}/>
          <button>Save</button>
        </form>

        <button onClick={() => this.props.history.goBack()}>Back</button>

      </main>
    )
  }
}

export default ExerciseEdit;