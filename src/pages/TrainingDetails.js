import React, { Component } from 'react';
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
        <button className="btn-icon" onClick={() => this.props.history.push('/my-trainings')}>
          <img src={'/arrow.svg'} className="back-icon" alt=""/>
        </button>
        {
          training ?
          (
            <div className="training-info">
              <div className="training-info__header">   
                <div className="training-header">
                  <h1>{training.title}</h1>
                  <Link to={`/my-trainings/${training._id}/edit`}><button className="btn btn-edit">Edit</button></Link>
                </div>
              
                <div className="inline-display inline-display--details">
                  <p>
                    <strong>Sport: </strong>{training.sport}
                    <span>|</span>
                    <span><img src={'/stopwatch.png'} className='stopwatch-icon'/>{training.duration} min</span>      
                  </p>
                </div>
              </div>
              <h4>Description</h4>
              <p>{training.description}</p>

              <h4>Exercises</h4>
              <div className="training-ex-list">
                {training.exercises.map( (exercise, i) => {
                  return (
                    
                      <div className="list-container__item list-container__item--training" key={i}>
                        <Link to={`/profile/${exercise._id}`}>
                          <div className="inline-display">
                            <p><strong>{i+1}. {exercise.title}</strong></p>
                            <span className={`item-type ${exercise.type}`}>{exercise.type}</span>
                          </div>
                          <p><strong>Sport: </strong>{exercise.sport}</p>
                          <span><img src={'/stopwatch.png'} className='stopwatch-icon'/>{exercise.duration} min</span>
                          <p>{exercise.description}</p>
                          
                        </Link>
                      </div>
                  )
                })}
                <i aria-hidden="true"></i>
                <i aria-hidden="true"></i>
              </div>
            </div>          
          )
          : null
        }
        
      </div>
    )
    
  }
}

export default TrainingDetails;