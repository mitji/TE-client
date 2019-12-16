import React, { Component } from 'react';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

import exercisesService from './../services/exercises-service'

class TrainingExerciseEdit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      exercise: null,
      focusInput: undefined,
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
    const {title, description, duration, sport, type, video_url, img_url, share} = this.state;
    
    exercisesService.modifyOne({title, description, duration, sport, type, video_url, img_url, share}, id)
      .then( (updatedExercise) => { 
        this.setState({ exercise: updatedExercise});
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
    this.setState({ exercise: exerciseCopy, focusInput: name });
  };

  componentDidUpdate() {
    this.focusTextInput();
  }

  componentDidMount() {
    const exercise = this.props.exercise;
    this.setState({exercise});   
  }


  render() {
    return(
      <div className = { this.props.classToggle ? "edit-exercise show" : "edit-exercise hidden"} key={shortid.generate()}>
        <div className="edit-exercise__backdrop" onClick={this.props.click}></div>
        
        <div className="edit-exercise__form">
          <h2>Edit exercise</h2>
          <button className="btn" onClick={this.props.click}>X</button>

          {(this.state.exercise === null) ?
            <h1>loading</h1>
            : (
              <form onSubmit={this.updateExercise} key='form1'>
                <label htmlFor="">Title</label>
                <input type="text" value={this.state.exercise.title} name="title" onChange={this.handleChange} ref={this.references['title']} />
                <label htmlFor="">Description</label>
                <textarea value={this.state.exercise.description} name="description" onChange={this.handleChange}  ref={this.references['description']}/>
                <label htmlFor="">Duration</label>
                <input type="number" value={this.state.exercise.duration} name="duration" onChange={this.handleChange}  ref={this.references['duration']}/>
                <label htmlFor="">Sport</label>
                <input type="text"  value={this.state.exercise.sport} name="sport" onChange={this.handleChange}  ref={this.references['sport']}/>
                <label htmlFor="">Type</label>
                <input type="text"  value={this.state.exercise.type} name="type" onChange={this.handleChange}  ref={this.references['type']}/>
                <label htmlFor="">Video</label>
                <input type="text" name="video_url" value={this.state.exercise.video_url} onChange={this.handleChange}  ref={this.references['video_url']}/>
                <label htmlFor="">Image</label>
                <input type="text" name="img_url" value={this.state.exercise.img_url} onChange={this.handleChange}  ref={this.references['img_url']}/>          
                <button className="btn">Save</button>
              </form>
            )
          }
        </div>
      </div>
    )
  }
}

export default TrainingExerciseEdit;