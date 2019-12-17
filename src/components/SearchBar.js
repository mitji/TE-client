import React, { Component } from 'react';
import { withAuth } from '../services/AuthProvider';

class SearchBar extends Component {
  state = {
    search: ''
  }

  handleSearch = (e) => {
    const { value } = e.target;
    this.setState({search: value})
  }

  searchSubmit = (e) => {
    this.props.submit(e,this.state.search);
    this.setState({search: ''});
  }

  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <div>
        {isLoggedin ? 
          (
            <nav>
              <form onSubmit={(e) => this.searchSubmit(e)}>
                <input 
                  type="text" 
                  value={this.state.search} 
                  name="search"
                  onChange={this.handleSearch}
                  placeholder="Search by title..."/>
              </form>  
              <p>Hi {user.name}</p>
            </nav>
          ) 
          : null
        }
      </div>
      
    )
  }
}

export default withAuth(SearchBar);