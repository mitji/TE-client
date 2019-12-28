import React, { Component } from 'react';
import Select from 'react-select';
import getVideoId from 'get-video-id';

import { withValidation } from '../hoc/widthValidation';
import exercisesService from './../services/exercises-service';


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

class ExerciseEdit extends Component {

  state = {
    exercise: {},
    sport: {},
    type: {},
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

  updateExercise = (e) => {
    const id = this.state.exercise._id;

    let {title, description, duration, video_url, img_url, share} = this.state.exercise; 
    const sport = this.state.sport.value;
    const type = this.state.type.value;
    const videoId = getVideoId(video_url);
    switch(videoId.service) {
      case 'youtube':
          video_url = `https://www.youtube.com/embed/${videoId.id}`;
        break;
      case 'vimeo':
          video_url = `https://player.vimeo.com/video/${videoId.id}`;
        break;
      default:
          video_url = '';
    }
    
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
        const sport = {
          value: exercise.sport,
          label: `${exercise.sport.charAt(0).toUpperCase()}${exercise.sport.slice(1)}`
        };
        const type = {
          value: exercise.type,
          label: `${exercise.type.charAt(0).toUpperCase()}${exercise.type.slice(1)}`
        };
        this.setState({exercise, sport, type});
      })
      .catch( (err) => console.log(err));
  }

  render() {
    return(
      <main className="content">

        <button className="btn-icon" onClick={() => this.props.history.goBack()}>
          <img src={'/arrow.svg'} className="back-icon" alt=""/>
        </button>
        <div className="inline-display">
          <h1>Exercise edit</h1>
          <button className="btn btn-delete" onClick={this.deleteExercise}>Delete</button>
        </div>

        <form onSubmit={this.props.handleSubmit(this.updateExercise)} className="input-form">
        <label htmlFor="">Title</label>
          <input className="input" type="text" value={this.state.exercise.title} 
                  name="title" 
                  onChange={this.handleInput} 
                  ref={this.props.register({ required: true})}
          />
          {this.props.errors.title && <span className="feedback"></span>}
          
          <label htmlFor="">Description</label>
          <textarea value={this.state.exercise.description} 
                    name="description" 
                    onChange={this.handleInput} 
                    ref={this.props.register({ required: true})}
          />
          {this.props.errors.description && <span className="feedback feedback--description"></span>}
          
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
            <input className="input" type="number" 
                    value={this.state.exercise.duration} 
                    name="duration" 
                    onChange={this.handleInput}
                    ref={this.props.register({ required: true})}
            />
            <span>min</span>
            <label name="share">Share</label>
            <label className="switch">
              <input type="checkbox" name="share" checked={this.state.exercise.share} onChange={this.handleInput}/>
              <span className="slider round"></span>
            </label>
          </div>
          {this.props.errors.duration && <span className="feedback feedback--duration"></span>}
          {
            this.state.isLoading 
              ? (<button disabled className="btn btn-success loading-gif-btn">
                  <img className="loading-gif" src={'/loading.gif'} alt="loading"/>
                </button>)
              : <button className="btn btn-success">Save</button>
            }
        </form>
      </main>
    )
  }
}

export default withValidation(ExerciseEdit);