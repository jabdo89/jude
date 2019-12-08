import React, { Component } from "react";
import firebase from "firebase";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

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
    return <div> {this.state.user ? <div>Yes</div> : <div>No</div>} </div>;
  }
}

export default App;
