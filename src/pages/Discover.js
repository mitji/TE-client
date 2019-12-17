import React, {Component} from 'react';
import shortid from 'shortid';

import DiscoverList from './../components/DiscoverList';

import './../styles/discover.scss';

class Discover extends Component {

  state = {
    //publicExercises: [],
    sport: 'all',
    type: 'all'
  }

  componentDidMount() {
    window.scrollTo(0,0);
  }

  render() {
    console.log(this.state.sport, this.state.type)
    return(
      <div className="content">
        <h1>Discover page</h1>

        <form onSubmit={this.filter}>
          <select name="" id="" ref="sport" onChange={(e) => this.setState({ sport: e.target.value })}>
            <option value="" default>All</option>
            <option value="basketball">Basketball</option>
            <option value="rugby">Rugby</option>
            <option value="football">Football</option>
          </select>
          <select name="" id="" ref="type" onChange={(e) => this.setState({ type: e.target.value })}>
            <option value="all" default>All</option>
            <option value="skills">Skills</option>
            <option value="attack">Attack</option>
            <option value="defense">Defense</option>
            <option value="strength">Strength $ Conditioning</option>
            <option value="stretc">Stretch</option>
            <option value="recovery">Recovery</option>
          </select>

          <button className="btn">Filter</button>
        </form>
        
        <DiscoverList/>
             
      </div>
    )
  }
}

export default Discover;
