import React, { Component } from 'react';
import { withAuth } from '../services/AuthProvider';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = { 
    email: '', 
    password: ''
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="auth-container">
        <h1>Login</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />

          <input className="submit-btn" type="submit" value="Login" />
          <p>Not a user yet?</p>
          <Link to={'/signup'}>Sign up</Link>
        </form>
      </div>
    );
  }
}

export default withAuth(Login);
