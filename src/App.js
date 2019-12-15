import React, { Fragment, Component } from 'react';
import firebase from 'firebase';
import LoginScreen from './views/login';
import Company from './views/company';

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    let action;
    const { user } = this.state;
    if (user) {
      action = <Company />;
    } else {
      action = <LoginScreen />;
    }

    return <Fragment> {action} </Fragment>;
  }
}

export default App;
