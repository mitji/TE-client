import React, {Component} from 'react';
import shortid from 'shortid';
import queryString from 'query-string';

import searchService from './../services/search-service';
import discoverService from './../services/discover-service';

import DiscoverList from './../components/DiscoverList';

import './../styles/discover.scss';

class Discover extends Component {

  state = {
    exercises: null,
    sport: 'all',
    type: 'all'
  }

  componentDidMount() {
    window.scrollTo(0,0);
    this.handleSearch();  
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      console.log('updated')
      this.handleSearch();
    }  
  }

  handleSearch = () => {
    const values = queryString.parse(this.props.location.search)
    if(values.search) {
      searchService.getResults(values.search)
        .then( (data) =>{
          //console.log('search result', data);
          this.setState({exercises: data})
        })
        .catch( (err) => console.log(err));
    }
    else {
      discoverService.getAll()
        .then( (data) => {
          this.setState({exercises: data})
        })
        .catch( (err) => console.log(err));
    }
  }

  // TODO
  // ADD SOMETHING

  // FIXME


  render() {
    console.log('exercises in parent', this.state.exercises);
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
        
        {
          this.state.exercises
           ? <DiscoverList exercises={this.state.exercises}/>
           : null
        }
        
             
      </div>
    )
  }
}

export default Discover;
