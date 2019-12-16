import React, {Component} from 'react';
import exercisesService from './../services/exercises-service';

class ExerciseNew extends Component {

  state = {
    exercise: []
  }
 
  handleInput = (e) => {
    const { name, value } = e.target;
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
                  
      </div>
    )
  }
}

export default ExerciseNew;