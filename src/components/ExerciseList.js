import React, { Component } from 'react';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

import './../styles/dashboard.scss';

class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exerciseArr: this.props.exercises,
    }
  }

  render() {
    const exerciseArr = this.state.exerciseArr;
    return(
      <div className="exercises-container">
        {exerciseArr.map( exercise => {
          return (
            <div className="exercises-container__item" key={shortid.generate()}>
              <Link to={`/profile/${exercise._id}`}>
                <p>{exercise.title}</p>
                <span className={`item-type ${exercise.type}`}>{exercise.type}</span>
                <p>{exercise.description}</p>
                <p><strong>Duration: </strong>{exercise.duration} min</p>
                {
                  (exercise.author._id != this.props.userId) ?
                  (
                    <div>
                      <p><strong>Author: </strong>{exercise.author.name} {exercise.author.lastName}</p>
                      <p><strong>Duration:</strong>{exercise.duration}</p>
                    </div>
                  )
                  : null
                }
              </Link>
              {
                this.props.inEditTraining ?
                <button>Add to training</button>
                : null
              }
            </div>
          )
        })}
        </div>
    )

  }
}

export default ExerciseList;