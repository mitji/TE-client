import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <nav>
        <input type="text" placeholder="Search exercise..."/>
        <p>Hi {this.props.userName}</p>
      </nav>
    )
  }
}

export default SearchBar;
