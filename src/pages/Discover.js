import React, {Component} from 'react';
import shortid from 'shortid';

import discoverService from './../services/discover-service';
import exercisesService from '../services/exercises-service';

class Discover extends Component {

  state = {
    publicExercises: []
  }

  componentDidMount() {
    discoverService.getAll()
      .then( (data) => {
        this.setState({publicExercises: data})
      })
      .catch( (err) => console.log(err));
  }

  render() {
    const publicExercises = this.state.publicExercises;
    return(
      <div className="content">
        <h1>Discover page</h1>
        {/* this will be inside discoverCard */}
        {
          publicExercises ?
          (
            publicExercises.map( exercise => {
              return (
                <div  key={shortid.generate()}>
                  <h4>{exercise.title}</h4>
                  <p>{exercise.duration} min | {exercise.sport}</p>
                  <p>{exercise.type}</p>
                  <p>By {exercise.author.name} {exercise.author.lastName}</p>
                </div>
                
              )
            })
          )
          : null
        }
      </div>
    )
  }
}

export default Discover;
