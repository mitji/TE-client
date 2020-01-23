import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import exercisesService from './../services/exercises-service';
import profileService from './../services/profile-service';
import discoverService from './../services/discover-service';

import CommentsList from './../components/CommentsList';

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
    return(
      <main className="content">
        <button className="btn-icon" onClick={() => this.props.history.goBack()}>
          <img src={'/arrow.svg'} className="back-icon" alt=""/>
        </button>
        {/* <h1>Exercise details</h1> */}
          <div>
              <div className="profile-header profile-header--details">
                <div className="profile-header--details__info">
                  <h1>{exercise.title}</h1>
                  <span className={`item-type ${exercise.type}`}>{exercise.type}</span>
                  {
                    (!exercise.share) 
                      ? <Link to={`/profile/${exercise._id}/edit`}><button className="btn btn-edit">Edit</button></Link>
                      : null
                  }
                </div>
                
                <div className="inline-display inline-display--details">
                  <p>
                    <strong>Sport: </strong>{exercise.sport}
                    <span>|</span>
                    <span><img src={'/stopwatch.png'} className='stopwatch-icon'/>{exercise.duration} min</span>      
                  </p>
                </div>
              </div>
              
              <h4>Description</h4>
              <p>{exercise.description}</p>
              <div className="inline-display">
                <div className="inline-display__media">
                  <h4>Image</h4>
                  {
                    exercise.img_url
                    ? <img className="edit-exercise__img" src={exercise.img_url} alt='exercise'/>
                    : <p><strong>No image provided</strong></p>
                  }
                </div>
                <div className="inline-display__media">
                  <h4>Video</h4>
                  {
                    exercise.video_url
                    ? <iframe width="400" height="250" src={exercise.video_url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allow="fullscreen"></iframe>

                    : <p><strong>No video provided</strong></p>
                  }
                </div>
              </div>
              
              
              {
                (exercise.author !== userId) ?
                  (
                    <div>
                    {
                      !this.state.isSaved
                        ? <button className="btn btn-success" onClick={this.saveExercise}>Save</button>  
                        : <button className="btn btn-delete" onClick={this.unsaveExercise}>Unsave</button>
                          
                    }
                    </div>
                  )
                  : null
              }
              {
                (exercise.author !== userId) 
                  ? <CommentsList exerciseId={this.props.match.params}/>
                  : null
              }
            </div>
      </main>
    )
  }
}

export default ExerciseDetails;