import React, { Component } from 'react';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

import discoverService from './../services/discover-service';

import DiscoverCard from './../components/DiscoverCard';

class DiscoverList extends Component {

  state = {
    exercises: []
  }

  componentDidMount() {
    window.scrollTo(0,0);
    if(!this.props.filtered) {
      discoverService.getAll()
      .then( (data) => {
        this.setState({exercises: data})
      })
      .catch( (err) => console.log(err));
    } 
    
  }

  render() {
    const exercisesList = this.state.exercises;
    console.log('exercises -->', exercisesList)
    return(
      <div className="discover-list">
        {
          exercisesList ?
          (
            exercisesList.map( exercise => {
              return (
                <DiscoverCard exercise={exercise} key={shortid.generate()}/>
              )
            })
            
          )
          : <h2>No results :(</h2>
        }  

        {/* this is to make the flexbox items to be one after the other when the row has less than 4 elements */}
        <i aria-hidden="true"></i>
        <i aria-hidden="true"></i>

      </div>
    )

  }
}

export default DiscoverList;