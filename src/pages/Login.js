import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../services/AuthProvider';
import { withValidation } from '../hoc/widthValidation';


class Login extends Component {
  state = { 
    email: '', 
    password: ''
  };

  handleFormSubmit = event => {
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
        <div className="img-container">
          <img src={'/logo.png'} alt=""/>
        </div>
        <h1>Login</h1>
        <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            ref={this.props.register({ required: true})}
          />
          {this.props.errors.email && <span className="feedback"></span>}

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            ref={this.props.register({ required: true})}
          />
          {this.props.errors.password && <span className="feedback"></span>}
          
          {this.props.isUserInvalid && <span className="feedback-text">Enter a valid email and password</span>}
          <input className="btn btn-success" type="submit" value="Login" />
          <p>Not a user yet?</p>
          <Link to={'/signup'}>Sign up</Link>
          
        </form>
      </div>
    );
  }
}

export default withValidation(withAuth(Login));
