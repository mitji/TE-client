import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import trainingService from './../services/trainings-service';

import TrainingCard from './../components/TrainingCard';
import './../styles/training.scss';

class MyTrainings extends Component {

  state = {
    trainings: []
  }
 
  componentDidMount() {
    window.scrollTo(0, 0)
    trainingService.getAll()
      .then( (trainings) => {
        this.setState({trainings: trainings});
      })
      .catch( (err) => console.log(err));
  };

  render() {
    const userTrainings = this.state.trainings;
    return(
      <div className="content">
        <div className="training-header">
          <h1>My Trainings</h1>
          <Link to={'/my-trainings/new-training'}><button className="btn btn-create">New</button></Link>
        </div>
        
        <div className="trainings-list ">
          {
            userTrainings ?
              (
                userTrainings.map( (training, index) => {
                  return <TrainingCard training={training} key={index}/>
                }) 
              )
            : <h2>No trainings</h2>
          }         
        </div>
          
      </div>
    )
  }
}

export default MyTrainings;