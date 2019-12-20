import React, { Component } from 'react';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

class TrainingCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userTraining: this.props.training
    }
  }
  render() {
    const training = this.state.userTraining;

    return(
      <div className="training-card" key={shortid.generate()}>
        <Link to={`/my-trainings/${training._id}`}>
          <div className="training-card__header">
            <h4>{training.title}</h4>
            <span><img src={'/stopwatch.png'} className='stopwatch-icon'/>{training.duration} min</span>
          </div>
            {training.exercises.map( (exercise, i) => {
              return (
                <div className="training-card__exercise inline-display" key={i}>
                  <p>{exercise.title}</p>
                  <span className={`item-type ${exercise.type}`}>{exercise.type}</span>
                </div>
              )
            })}
        </Link>
      </div>
    )

  }
}

export default TrainingCard;