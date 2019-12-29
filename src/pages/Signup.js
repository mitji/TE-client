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
    this.props.signup({ email, name, lastName, password }); // props.signup is Provided by withAuth() and Context API
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, name, lastName, password } = this.state;
      
    return (
      
      <div className="auth-container">

        <section>
          <div className="img-container">
            <img src={'/logo.png'} alt=""/>
          </div>
          <h1>Training made easy</h1>
          <h2>Your final training preparation tool</h2>
        </section>

        <section>
          <h2>Sign Up</h2>
          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <label>Email</label>
            <input
              name="email"
              value={email}
              onChange={this.handleChange}
              ref={this.props.register({ required: true, pattern: /^\S+@\S+$/i})}
            />
            {this.props.errors.email && <span className="feedback"></span>}
            {this.props.errors.email 
              &&  this.props.errors.email.type === 'pattern' 
              && <span className="feedback-text">Enter a valid email</span>
            }
            
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              ref={this.props.register({ required: true })}
            />
            {this.props.errors.name &&  this.props.errors.name.type === 'required' && <span className="feedback"></span>}

            <label>Last name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
              ref={this.props.register({ required: true })}
            />
            {this.props.errors.lastName &&  this.props.errors.lastName.type === 'required' && <span className="feedback"></span>}

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              ref={this.props.register({ required: true,  minLength: 6})}
            />
            {this.props.errors.password && <span className="feedback"></span>}
            {this.props.errors.password && this.props.errors.password.type === 'minLength' && <span className="feedback-text">Password must have at least 6 characters!</span>}

            <input className="btn btn-success" type="submit" value="Signup" />
          </form>
          
          <p>Already have account?</p>
          <Link to={'/login'}> Login</Link>
        </section>
      </div>
    );
  }
}

export default withValidation(withAuth((Signup)));
