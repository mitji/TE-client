//	services
//AuthProvider.js

import React from 'react';
import authService from './auth-service'; // IMPORT functions for axios requests to API
const { Consumer, Provider } = React.createContext();

// HOC to create Consumer
const withAuth = WrappedComponent => {
  return class extends React.Component {
    render() {
      return (
        <Consumer>
          {/* <Consumer> component provides callback which receives Providers "value" object */}
          {/* (value) => { <WrappedComponent />}  */}
          {({ login, signup, user, logout, isLoggedin, isLoading, isUserInvalid }) => {
            return (
              <WrappedComponent
                login={login}
                signup={signup}
                user={user}
                logout={logout}
                isLoggedin={isLoggedin}
                isLoading={isLoading}
                isUserInvalid={isUserInvalid}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

// Provider --> provides my hoc with functions
class AuthProvider extends React.Component {
  state = { 
    isLoggedin: false, 
    user: null, 
    isLoading: true,
    isUserInvalid: false,
  };

  componentDidMount() {
    authService.me()
      .then(user =>
        this.setState({ isLoggedin: true, user: user, isLoading: false }),
      )
      .catch(err =>
        this.setState({ isLoggedin: false, user: null, isLoading: false }),
      );
  }

  signup = user => {
    const { email, name, lastName, password } = user;

    authService.signup({ email, name, lastName, password })
      .then(user => this.setState({ isLoggedin: true, user }))
      .catch(err => console.log(err));
  };

  login = user => {
    const { email, password } = user;

    authService.login({ email, password })
      .then(user => this.setState({ isLoggedin: true, user }))
      .catch(err => {
        this.setState({isUserInvalid: true})
        console.log(err)
      });
  };

  logout = () => {
    authService.logout()
      .then(() => this.setState({ isLoggedin: false, user: null }))
      .catch(err => console.log(err));
  };

  render() {
    const { isLoading, isLoggedin, user, isUserInvalid} = this.state;
    const { login, logout, signup } = this;

    return (
      <Provider value={{ isLoading, isLoggedin, user, isUserInvalid, login, logout, signup}}>
        {this.props.children}
      </Provider>
    );
  }
}

export { Consumer, withAuth };

export default AuthProvider;
