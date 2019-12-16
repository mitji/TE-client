import React, {Component} from 'react';
import shortid from 'shortid';

import DiscoverCard from './../components/DiscoverCard';

import discoverService from './../services/discover-service';

import './../styles/discover.scss';

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
            <div class="discover-list">
              {
                publicExercises.map( exercise => {
                  return (
                    <DiscoverCard exercise={exercise} />
                    
                  )
                })
              }
            </div>
            
          )
          : null
        }
      </div>
    )
  }
}

export default Discover;
