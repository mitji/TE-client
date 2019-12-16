import React, { Component } from 'react';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

import trainingService from './../services/trainings-service';

import './../styles/navigation.scss';
import './../styles/dashboard.scss';
import './../styles/profile.scss';
import './../styles/training.scss';

class TrainingDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      training: this.props.training
    }
  }
  
  componentDidMount() {
    window.scrollTo(0, 0)
    const {id} = this.props.match.params; // get id from url
    trainingService.getOne(id)
      .then( (training) => {
        this.setState({training})      
      })
      .catch( (err) => console.log(err));
  }

  render() {
    const training = this.state.training;

    return(
      <div className="content">
        {
          training ?
          (
            <div className="training-info">
              <div className="training-info__header">
                <h1>{training.title}</h1>
                <span>{training.duration} min | {training.sport}</span>
                <Link to={`/my-trainings/${training._id}/edit`}><button>Edit</button></Link>
              </div>
              <p className="training-info__description">{training.description}</p>
              {training.exercises.map( exercise => {
                return (
                  <div className="training-info__exercises" key={shortid.generate()}>
                    <h4>{exercise.title}</h4>
                    <span className={`item-type ${exercise.type}`}>{exercise.type}</span>
                    <p>{exercise.description}</p>
                    <p><strong>Sport: </strong>{exercise.sport}</p>
                  </div>
                )
              })}
            </div>          
          )
          : null
        }
        
      </div>
    )
    
  }
}

export default TrainingDetails;