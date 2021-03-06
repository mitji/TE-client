import React, { Component } from 'react';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

import profileService from './../services/profile-service';

import './../styles/dashboard.scss';

class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exerciseArr: this.props.exercises,
      listLength: this.props.exercises.length
    }
  }

  unsaveExercise(id) {
    
    profileService.unsaveExercise(id)
      .then( (user) => {
        const savedExercises = user.savedExercises;
        this.props.updateLength();
        this.setState({exerciseArr: savedExercises});
      })
      .catch( (err) => console.log(err));
  }

  render() {
    const exerciseArr = this.state.exerciseArr;
    return(
      <div className="list-container">
        {exerciseArr.map( exercise => {
          return (
            <div>
              <div className="list-container__item" key={shortid.generate()}>
                <Link to={`/profile/${exercise._id}`}>
                  <p><strong>{exercise.title}</strong></p>
                  <div><span><img src={'/stopwatch.png'} className='stopwatch-icon'/>{exercise.duration} min</span>   |   <span className={`item-type ${exercise.type}`}>{exercise.type}</span></div>
                  {
                    (exercise.author._id !== this.props.userId) ?
                    (
                      <div>
                        <p><strong>Author: </strong>{exercise.author.name} {exercise.author.lastName}</p>
                      </div>
                    )
                    : null
                  }
                </Link>
                {
                  (exercise.author._id !== this.props.userId && !this.props.inEditTraining) ?
                    (
                      <button className="btn-icon" onClick={() => this.unsaveExercise(exercise._id)}>
                        <img src={"/bin.png"} alt="unsave" className="btn-icon__action"/>
                      </button>
                    )
                  : null
                }     
                {
                  this.props.inEditTraining
                    ? <button className="btn-icon" onClick={()=>this.props.addExercise(exercise._id)}>
                        <img src={"/add.png"} alt="" className="btn-icon__action"/>
                      </button>
                    : null
                }
              </div>
              
              </div>
          )
        })}
        </div>
    )

  }
}

export default ExerciseList;