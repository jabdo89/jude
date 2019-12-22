import React, { Component, Fragment } from 'react';
import firebase from 'firebase';
import { Router, Redirect } from '@reach/router';
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
    const { user } = this.state;
    // REQUIRED: Define a criteria to show company, admin or student layout

    const isStudent = false;
    const isCompany = Boolean(user);
    const isAdmin = false;

    if (isCompany /* COMPANY CRITERIA */) {
      return <Company />;
    }

    if (isStudent /* STUDENT CRITERIA */) {
      // Fill in the future with student router
      return <Fragment />;
    }

    if (isAdmin /* STUDENT CRITERIA */) {
      // Fill in the future with admin router
      return <Fragment />;
    }

    return (
      <Router>
        <LoginScreen path="/login" />
        <Redirect noThrow from="*" to="/login" />
      </Router>
    );
  }
}

export default App;
