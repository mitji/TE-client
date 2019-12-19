import React, {Component} from 'react';
import shortid from 'shortid';
import queryString from 'query-string';

import searchService from './../services/search-service';
import discoverService from './../services/discover-service';

import DiscoverList from './../components/DiscoverList';

import './../styles/discover.scss';

import Select from 'react-select';

const sports = [
  { value: 'all', label: 'All' },
  { value: 'rugby', label: 'Rugby' },
  { value: 'basketball', label: 'Basketball' },
  { value: 'football', label: 'Football' },
];

const type = [
  { value: 'all', label: 'All' },
  { value: 'skills', label: 'Skills' },
  { value: 'attack', label: 'Attack' },
  { value: 'defense', label: 'Defense' },
  { value: 'sc', label: 'Strength & Conditioning' },
  { value: 'stretch', label: 'Stretch' },
  { value: 'recovery', label: 'Recovery' },
];

class Discover extends Component {

  state = {
    allExercises: null,
    exercisesCopy: null,
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
          this.setState({allExercises: data, exercisesCopy: data})
        })
        .catch( (err) => console.log(err));
    }
    else {
      discoverService.getAll()
        .then( (data) => {
          this.setState({allExercises: data, exercisesCopy: data})
        })
        .catch( (err) => console.log(err));
    }
  }

  handleSport = (selected) => {
    this.setState({sport: selected})
  }

  handleType = (selected) => {
    this.setState({type: selected})
  }

  filter = (e) => {
    e.preventDefault();
    console.log(this.state.sport.value, this.state.type.value);
    const currentExs = this.state.allExercises;
    let filteredExs = [];

    // filter by sport --> IMPROVEBABLE
    if (this.state.sport.value === 'all') {
      filteredExs = currentExs;
    } else {
      filteredExs = currentExs.filter( ex => {
        return ex.sport === this.state.sport.value;
      })
    }

    // filter by type
    if (this.state.type.value !== 'all') {
      filteredExs = filteredExs.filter( ex => {
        return ex.type === this.state.type.value;
      })
    }

    this.setState({exercisesCopy: filteredExs});
  }

  render() {
    return(
      <div className="content">
        <h1>Discover page</h1>
        
        <form onSubmit={this.filter} className="filter-form">
          <div className="selects">
            <Select
              className="custom-select"
              value={this.state.sport}
              onChange={this.handleSport}
              options={sports}
            />
            <Select
              className="custom-select"
              value={this.state.type}
              onChange={this.handleType}
              options={type}
            />
          </div>
          <button className="btn btn-filter">Filter</button>
        </form>
        
        {
          this.state.exercisesCopy
           ? <DiscoverList exercises={this.state.exercisesCopy}/>
           : <h2>No results :(</h2>
        }
        
             
      </div>
    )
  }
}

export default Discover;
