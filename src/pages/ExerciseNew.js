import React, {Component} from 'react';
import exercisesService from './../services/exercises-service';

class ExerciseNew extends Component {

  state = {
    exercise: []
  }
 
  handleInput = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const exerciseCopy = this.state.exercise;
    exerciseCopy[name] = value;
    this.setState({ exercise: exerciseCopy });
  };

  saveExercise = (e) => {
    e.preventDefault();
    const {title, description, duration, sport, type, video_url, img_url, share} = this.state.exercise; 
    exercisesService.create({title, description, duration, sport, type, video_url, img_url, share})
      .then( () => {
        this.props.history.push('/profile');
      })
      .catch( (err) => console.log(err));
      
  }

  componentDidMount() {
    window.scrollTo(0,0);
  }

  render() {
    return(
      <div className="content">
        <h1>New exercise</h1>
        <form onSubmit={this.saveExercise}>
          <label htmlFor="">Title</label>
          <input type="text" value={this.state.exercise.title} name="title" onChange={this.handleInput} />
          <label htmlFor="">Description</label>
          <textarea value={this.state.exercise.description} name="description" onChange={this.handleInput}/>
          <label htmlFor="">Duration</label>
          <input type="number" value={this.state.exercise.duration} name="duration" onChange={this.handleInput}/>
          <label htmlFor="">Sport</label>
          <select name="sport" id="" ref="sport" onChange={this.handleInput}>
            <option value="">-</option>
            <option value="all">All</option>
            <option value="basketball">Basketball</option>
            <option value="rugby">Rugby</option>
            <option value="football">Football</option>
          </select>
          <label htmlFor="">Type</label>
          <select name="type" id="" ref="type" onChange={this.handleInput}>
            <option value="">-</option>
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
           {/* Rounded switch  */}
          <label class="switch">
            <input type="checkbox" name="share" checked={this.state.exercise.share} onChange={this.handleInput}/>
            <span class="slider round"></span>
          </label>
          <button className="btn btn-success">Save</button>
        </form>                  
      </div>
    )
  }
}

export default ExerciseNew;