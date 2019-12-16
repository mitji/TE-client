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
      <div className="discover-card" key={shortid.generate()}>
        <Link to={`/discover/${exercise._id}`}>
          <div className="discover-card__header">
            <h4>{exercise.title}</h4>
            <p>{exercise.duration} min | {exercise.sport}</p>
            <p>{exercise.type}</p>
            <p>By {exercise.author.name} {exercise.author.lastName}</p>
          </div>
        </Link>
      </div>
    )

  }
}

export default DiscoverCard;