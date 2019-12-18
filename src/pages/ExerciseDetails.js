import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import exercisesService from './../services/exercises-service';
import profileService from './../services/profile-service';
import discoverService from './../services/discover-service';

class ExerciseDetails extends Component {

  state = {
    exercise: {},
    userId: '',
    isSaved: null
  }

  saveExercise = (e) => {
    e.preventDefault();
    console.log('in');
    const id = this.state.exercise._id;
    discoverService.save(id)
      .then( () => {
        this.setState({isSaved: true});
        console.log('added to favourites');
      })
      .catch( (err) => console.log(err));
  }

  unsaveExercise = (e) => {
    e.preventDefault();
    const id = this.state.exercise._id;
    profileService.unsaveExercise(id)
      .then( () => {
        this.setState({isSaved: false});
      })
      .catch( (err) => console.log(err));
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    const {id} = this.props.match.params; // get exercise id from url
    exercisesService.getOne(id)
      .then( (exercise) => {
        profileService.getUser()
          .then( (user) => {
            const isSaved = user.savedExercises.some( savedEx => {
              return savedEx._id === exercise._id;
            });
            this.setState({exercise, userId: user._id, isSaved});
          })
          .catch( (err) => console.log(err));
      })
  }

  render() {
    const exercise = this.state.exercise;
    const userId = this.state.userId;
    console.log('is saved?', this.state.isSaved);
    return(
      <main className="content">
        <button className="btn-icon" onClick={() => this.props.history.goBack()}>
          <img src={'/arrow.svg'} className="back-icon" alt=""/>
        </button>
        <h1>Exercise details</h1>
        { 
          exercise ?
          ( <div>
              <h2>{exercise.title}</h2>
              {
                (!exercise.share) 
                ? <Link to={`/profile/${exercise._id}/edit`}><button className="btn btn-edit">Edit</button></Link>
                : null
              }
              <p>{exercise.description}</p>
              <p><strong>Duration:</strong> {exercise.duration}</p>
              {
                exercise.img_url
                 ? <img className="edit-exercise__img" src={exercise.img_url} alt='exercise'/>
                 : <h4>No image provided</h4>
              }
              {
                exercise.video_url
                 ? <iframe width="400" height="250" src={exercise.video_url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allow="fullscreen"></iframe>

                 : <h4>No video provided</h4>
              }
              
              {
                (exercise.author !== userId) ?
                  (
                    <div>
                    {
                      !this.state.isSaved
                        ? <button className="btn btn-success" onClick={this.saveExercise}>Save</button>
                        : <button className="btn btn-delete" onClick={this.unsaveExercise}>Unsave</button>
                    }
                    <h4>Comments</h4>
                    </div>
                  )
                  : null
              }
            </div>
          )
          : null
        }
      </main>
    )
  }
}

export default ExerciseDetails;