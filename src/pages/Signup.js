import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../services/AuthProvider';

class Signup extends Component {
  state = { 
    email: '', 
    name: '',
    lastName: '',
    password: '' 
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, name, lastName, password } = this.state;
    //  console.log('Signup -> form submit', { username, password });
    this.props.signup({ email, name, lastName, password }); // props.signup is Provided by withAuth() and Context API
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, name, lastName, password } = this.state;
    return (
      <div>
        <h1>Sign Up</h1>
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

          <input type="submit" value="Signup" />
        </form>

        <p>Already have account?</p>
        <Link to={'/login'}> Login</Link>
      </div>
    );
  }
}

export default withAuth(Signup);
