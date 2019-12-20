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
            <h4>{exercise.title}</h4>
            <div className="inline-display">
              <p><img src={'/stopwatch.png'} className='stopwatch-icon'/>{exercise.duration} min | {exercise.sport}</p>
              <span className={`item-type ${exercise.type}`}>{exercise.type}</span>
            </div>
            <p><strong>Author: </strong>{exercise.author.name} {exercise.author.lastName}</p>
        </Link>
      </div>
    )

  }
}

export default DiscoverCard;