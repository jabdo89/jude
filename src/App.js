import React, { Component } from "react";
import firebase from "firebase";
import Prueba from "./prueba.js";
import LoginScreen from "./LoginScreen.js";

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
        console.log(user);
        console.log("hey");
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }
  render() {
    console.log(this.state.user);
    let action;
    if (this.state.user) {
      action = <Prueba />;
    } else {
      action = <LoginScreen />;
    }

    return <div> {action} </div>;
  }
}

export default App;
