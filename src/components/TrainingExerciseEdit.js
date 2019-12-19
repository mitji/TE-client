import React, { Component } from 'react';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

import exercisesService from './../services/exercises-service'

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

class TrainingExerciseEdit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      exercise: null,
      focusInput: undefined,
      sport: {},
      type: {}
    }

    this.references = {
      title: React.createRef(), 
      description: React.createRef(), 
      duration: React.createRef(), 
      sport: React.createRef(), 
      type: React.createRef(), 
      video_url: React.createRef(),
      img_url: React.createRef(), 
      share: React.createRef(),
    }
    

    this.focusTextInput = this.focusTextInput.bind(this);

  }

  focusTextInput () {
    const { focusInput } = this.state;
    if (focusInput) {

      const currentInput = this.references[focusInput].current;

      currentInput.focus();
      currentInput.selectionStart = currentInput.value.length;
    }
    
  }
  
  updateExercise = (e) => {
    e.preventDefault();
    const id = this.state.exercise._id;
    const {title, description, duration, sport, type, video_url, img_url, share} = this.state.exercise;
    exercisesService.modifyOne({title, description, duration, sport, type, video_url, img_url, share}, id)
      .then( (updatedExercise) => { 
        this.props.editExercise(updatedExercise)
        this.props.click();
      })
      .catch( (err) => console.log(err));
  }

  handleChange = e => {
    e.preventDefault();
    
    const { name, value } = e.target;
    console.log(name,value);

    const exerciseCopy = this.state.exercise;
    exerciseCopy[name] = value;
    if (name !== 'duration') {
      this.setState({ exercise: exerciseCopy, focusInput: name });
    } else {
      this.setState({ exercise: exerciseCopy});
    }
  };

  handleSport = (selected) => {
    this.setState({sport: selected})
  }

  handleType = (selected) => {
    this.setState({type: selected})
  }

  fileOnchange = (event) => {    
    const file = event.target.files[0];
    const uploadData = new FormData()
    uploadData.append('photo', file)

    exercisesService.uploadImage(uploadData)
      .then((img_url) => {
        const exerciseCopy = this.state.exercise;
        exerciseCopy.img_url = img_url;
        this.setState({ exercise: exerciseCopy })
        console.log(img_url)
      })
      .catch((error) => console.log(error))
  }

  componentDidUpdate() {
    this.focusTextInput();
  }

  componentDidMount() {
    const exercise = this.props.exercise;
    const sport = {
      value: exercise.sport,
      label: `${exercise.sport.charAt(0).toUpperCase()}${exercise.sport.slice(1)}`
    };
    const type = {
      value: exercise.type,
      label: `${exercise.type.charAt(0).toUpperCase()}${exercise.type.slice(1)}`
    };
    this.setState({exercise, sport, type});
  }

  render() {
    return(
      <div className = { this.props.classToggle ? "edit-exercise show" : "edit-exercise hidden"} key={shortid.generate()}>
        <div className="edit-exercise__backdrop" onClick={this.props.click}></div>
        
        <div className="edit-exercise__form-container">
          <h2>Edit exercise</h2>
          <button className="btn close-btn" onClick={this.props.click}>X</button>

          {(this.state.exercise === null) ?
            <h1>loading</h1>
            : (
              <form onSubmit={this.updateExercise} className="input-form">
                <label htmlFor="">Title</label>
                <input className="input" type="text" value={this.state.exercise.title} name="title" onChange={this.handleChange} ref={this.references['title']} />
                <label htmlFor="">Description</label>
                <textarea value={this.state.exercise.description} name="description" onChange={this.handleChange}  ref={this.references['description']}/>
                <label htmlFor="">Duration</label>
                <input className="input" type="number" value={this.state.exercise.duration} name="duration" onChange={this.handleChange}/>
                <label htmlFor="">Sport</label>
                  <Select
                    className="select"
                    value={this.state.sport}
                    onChange={this.handleSport}
                    options={sports}
                    placeholder={this.state.exercise.sport}
                    required
                  />
                <label htmlFor="">Type</label>
                  <Select
                    className="select"
                    value={this.state.type}
                    onChange={this.handleType}
                    options={type}
                    required
                  />
                <label htmlFor="">Video</label>
                <input className="input" type="text" name="video_url" value={this.state.exercise.video_url} onChange={this.handleChange}  ref={this.references['video_url']}/>
                <label htmlFor="">Image</label>
                {
                  this.state.exercise.img_url
                  ? <span>You can't add a new picture!</span>
                  : <input type="file" className="custom-file-input" id="customFile" name='img_url' onChange={(event)=>this.fileOnchange(event)} />
                }
                <button className="btn btn-success">Save</button>
              </form>
            )
          }
        </div>
      </div>
    )
  }
}

export default TrainingExerciseEdit;