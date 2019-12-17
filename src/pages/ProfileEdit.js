import React, { Component } from 'react';

import authService from './../services/auth-service';

class ProfileEdit extends Component {

  state = { 
    email: '', 
    name: '',
    lastName: '',
    password: '' 
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, name, lastName, password } = this.state;
    authService.edit({ email, name, lastName, password })
      .then( (user) => {
        console.log(user)
        this.props.history.push('/profile')
      })
      .catch( (err) => console.log(err));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    authService.me()
      .then( (user) => {
        const { email, name, lastName, password } = user;
        this.setState({ email, name, lastName, password });
      })
      .catch( (err) => console.log(err));
  }

  render() {
    const { email, name, lastName, password } = this.state;
    return(
      <div className="content">
        <button className="btn-icon" onClick={() => this.props.history.goBack()}>
          <img src={'/arrow.svg'} className="back-icon" alt=""/>
        </button>
        <h1>Edit profile</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />

          <label>Last name:</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />

          <input className="submit-btn" type="submit" value="Edit" />
        </form>
      </div>
    )
  }
}

export default ProfileEdit;





