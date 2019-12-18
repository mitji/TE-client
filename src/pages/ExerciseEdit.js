import React, { Component } from 'react';
import exercisesService from './../services/exercises-service'

class ExerciseEdit extends Component {

  state = {
    exercise: {}
  }

  handleInput = e => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

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

  deleteExercise = () => {
    exercisesService.deleteOne(this.state.exercise._id)
      .then( () => {
        this.props.history.push('/profile')
      })
      .catch( (err) => console.log(err));
  } 

  componentDidMount() {
    window.scrollTo(0, 0)
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

        <button className="btn-icon" onClick={() => this.props.history.goBack()}>
          <img src={'/arrow.svg'} className="back-icon" alt=""/>
        </button>

        <h1>Exercise details</h1>

        <form onSubmit={this.updateExercise}>
          <label htmlFor="">Title</label>
          <input type="text" value={this.state.exercise.title} name="title" onChange={this.handleInput} />
          <label htmlFor="">Description</label>
          <textarea value={this.state.exercise.description} name="description" onChange={this.handleInput}/>
          <label htmlFor="">Duration</label>
          <input type="number" value={this.state.exercise.duration} name="duration" onChange={this.handleInput}/>
          <label htmlFor="">Sport</label>
          <select name="sport" id="" ref="sport" value={this.state.exercise.sport} onChange={this.handleInput}>
            <option value="all">All</option>
            <option value="basketball">Basketball</option>
            <option value="rugby">Rugby</option>
            <option value="football">Football</option>
          </select>
          <label htmlFor="">Type</label>
          <select name="type" id="" ref="type" value={this.state.exercise.type} onChange={this.handleInput}>
            <option value="all">All</option>
            <option value="skills">Skills</option>
            <option value="attack">Attack</option>
            <option value="defense">Defense</option>
            <option value="sc">Strength $ Conditioning</option>
            <option value="stretch">Stretch</option>
            <option value="recovery">Recovery</option>
          </select>
          <label htmlFor="">Video</label>
          <input type="text" name="video_url" value={this.state.exercise.video_url} onChange={this.handleInput}/>
          <label htmlFor="">Image</label>
          <input type="text" name="img_url" value={this.state.exercise.img_url} onChange={this.handleInput}/>
          <label htmlFor="">Share</label>
          <label class="switch">
            <input type="checkbox" name="share" checked={this.state.exercise.share} onChange={this.handleInput}/>
            <span class="slider round"></span>
          </label>
          <button className="btn">Save</button>
        </form>

        <button className="btn btn-delete" onClick={this.deleteExercise}>Delete</button>

      </main>
    )
  }
}

export default ExerciseEdit;