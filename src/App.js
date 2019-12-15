import React, { Component } from 'react';
import firebase from 'firebase';
import Prueba from './prueba';
import LoginScreen from './LoginScreen';

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
      action = <Prueba />;
    } else {
      action = <LoginScreen />;
    }

    return <div> {action} </div>;
  }
}

export default App;
