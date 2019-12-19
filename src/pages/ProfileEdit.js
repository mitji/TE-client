import React, { Component } from 'react';

import authService from './../services/auth-service';

class ProfileEdit extends Component {

  state = { 
    email: '', 
    name: '',
    lastName: '',
    password: '' 
  };

  handleFormSubmit = () => {
    const { email, name, lastName, password } = this.state;
    authService.edit({ email, name, lastName, password })
      .then( (user) => {
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
        <button className="btn-icon" onClick={() => this.props.history.push('/profile')}>
          <img src={'/arrow.svg'} className="back-icon" alt=""/>
        </button>
        <h1>Edit profile</h1>
        <form onSubmit={this.handleFormSubmit} className="input-form">
          <label>Email:</label>
          <input
            className="input"
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <label>Name:</label>
          <input
            className="input"
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />

          <label>Last name:</label>
          <input
            className="input"
            type="text"
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
          />

          <label>Password:</label>
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />

          <input className="btn btn-success btn-success--edit" type="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default ProfileEdit;





