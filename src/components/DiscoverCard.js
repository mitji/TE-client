import React, { Component } from 'react';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

class DiscoverCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exercise: this.props.exercise
    }
  }
  render() {
    const exercise = this.state.exercise;

    return(
      <div className="training-card" key={shortid.generate()}>
        <Link to={`/discover/${exercise._id}`}>
          <div className="exercise-card__header">
            <h4>{exercise.title}</h4>
            <span>{exercise.duration} min</span>
          </div>
        </Link>
      </div>
    )

  }
}

export default DiscoverCard;