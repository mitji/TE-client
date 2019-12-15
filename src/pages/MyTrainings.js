import React, {Component} from 'react';
import trainingService from './../services/trainings-service';

import TrainingCard from './../components/TrainingCard';
import './../styles/training.scss';

class MyTrainings extends Component {

  state = {
    trainings: []
  }
 
  componentDidMount() {
    trainingService.getAll()
      .then( (trainings) => {
        this.setState({trainings: trainings});
      })
      .catch( (err) => console.log(err));
  };

  render() {
    const userTrainings = this.state.trainings;
    console.log('user trainings', userTrainings);
    return(
      <div className="content">
        <h1>My Trainings</h1>
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