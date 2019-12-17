import React, { Component } from 'react';
import shortid from 'shortid';
import { Link } from 'react-router-dom';


import DiscoverCard from './../components/DiscoverCard';

class DiscoverList extends Component {

  render() {
    const exercisesList = this.props.exercises;
    return(
      <div className="discover-list">
        {
          exercisesList.length!==0 ?
          (
            exercisesList.map( exercise => {
              return <DiscoverCard exercise={exercise} key={shortid.generate()}/>
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