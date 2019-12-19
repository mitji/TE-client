import React, {Component} from 'react';
import exercisesService from './../services/exercises-service';

import Select from 'react-select';

const sports = [
  { value: 'all', label: 'All' },
  { value: 'rugby', label: 'Rugby' },
  { value: 'basketball', label: 'Basketball' },
  { value: 'football', label: 'Football' },
];

const type = [
  { value: 'all', label: 'All' },
  { value: 'skills', label: 'Skills' },
  { value: 'attack', label: 'Attack' },
  { value: 'defense', label: 'Defense' },
  { value: 'sc', label: 'Strength & Conditioning' },
  { value: 'stretch', label: 'Stretch' },
  { value: 'recovery', label: 'Recovery' },
];

class ExerciseNew extends Component {

  state = {
    exercise: [],
    sport: 'all',
    type: 'all',
    isLoading: false
  }
 
  handleInput = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const exerciseCopy = this.state.exercise;
    exerciseCopy[name] = value;
    this.setState({ exercise: exerciseCopy });
  };

  handleSport = (selected) => {
    this.setState({sport: selected})
  }

  handleType = (selected) => {
    this.setState({type: selected})
  }

  fileOnchange = (event) => {
    this.setState({isLoading: true});
    const file = event.target.files[0];
    const uploadData = new FormData()
    uploadData.append('photo', file)

    exercisesService.uploadImage(uploadData)
      .then((img_url) => {
        const exerciseCopy = this.state.exercise;
        exerciseCopy.img_url = img_url;
        this.setState({ exercise: exerciseCopy, isLoading: false})
      })
      .catch((error) => console.log(error))
  }

  saveExercise = (e) => {
    e.preventDefault();
    const {title, description, duration, video_url, img_url, share} = this.state.exercise; 
    const  sport  = this.state.sport.value;
    const  type  = this.state.type.value;
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
        <button className="btn-icon" onClick={() => this.props.history.goBack()}>
          <img src={'/arrow.svg'} className="back-icon" alt=""/>
        </button>
        <h1>New exercise</h1>
        <form onSubmit={this.saveExercise} className="input-form">
          <label htmlFor="">Title</label>
          <input className="input" type="text" value={this.state.exercise.title} name="title" onChange={this.handleInput} required/>
          <label htmlFor="">Description</label>
          <textarea value={this.state.exercise.description} name="description" onChange={this.handleInput} required/>
          
          <div className="inline-display">
            <div className="inline-display__column">
              <label htmlFor="">Sport</label>
                <Select
                  className="select"
                  value={this.state.sport}
                  onChange={this.handleSport}
                  options={sports}
                  required
                />
            </div>
            <div className="inline-display__column">          
                <label htmlFor="">Type</label>
                <Select
                  className="select"
                  value={this.state.type}
                  onChange={this.handleType}
                  options={type}
                  required
                />
            </div>

          </div>
          <label htmlFor="">Video</label>
          <input className="input" type="text" name="video_url" value={this.state.exercise.video_url} onChange={this.handleInput}/>
          <label htmlFor="">Image</label>
          <input type="file" className="custom-file-input" id="customFile" name='img_url' onChange={(event)=>this.fileOnchange(event)} />
          <div className="inline-display">
            <label htmlFor="">Duration</label>
            <input className="input" type="number" value={this.state.exercise.duration} name="duration" onChange={this.handleInput} required/>
            <span>min</span>
            <label name="share">Share</label>
            <label className="switch">
              <input type="checkbox" name="share" checked={this.state.exercise.share} onChange={this.handleInput}/>
              <span className="slider round"></span>
            </label>
          </div>
          {
            this.state.isLoading 
              ? (<span className="btn btn-success loading-gif-btn">
                  <img className="loading-gif" src={'/loading.gif'} alt="loading"/>
                </span>)
              : <button className="btn btn-success">Save</button>
          }
          
        </form>                
      </div>
    )
  }
}

export default ExerciseNew;