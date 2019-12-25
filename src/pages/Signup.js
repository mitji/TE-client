import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../services/AuthProvider';
import { withValidation } from '../hoc/widthValidation';

class Signup extends Component {
  state = { 
    email: '', 
    name: '',
    lastName: '',
    password: '' 
  };

  handleFormSubmit = () => {
    const { email, name, lastName, password } = this.state;
    //  console.log('Signup -> form submit', { username, password });
    console.log({ email, name, lastName, password });
    //this.props.signup({ email, name, lastName, password }); // props.signup is Provided by withAuth() and Context API
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, name, lastName, password } = this.state;
    return (
      <div className="auth-container">
        <div className="img-container">
          <img src={'/logo.png'} alt=""/>
        </div>
        <h1>Sign Up</h1>
        <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            ref={this.props.register({ required: true })}
          />
          {this.props.errors.email &&  this.props.errors.email.type === 'required' && <p>This is required</p>}
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            ref={this.props.register({ required: true })}
          />

          <label>Last name:</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
            ref={this.props.register({ required: true })}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            ref={this.props.register({ required: true })}
          />

          <input className="btn btn-success" type="submit" value="Signup" />
        </form>

        <p>Already have account?</p>
        <Link to={'/login'}> Login</Link>
      </div>
    );
  }
}

export default withValidation(withAuth((Signup)));
