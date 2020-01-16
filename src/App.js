import React, { Component, Fragment } from 'react';
import firebase from 'firebase';
import Loader, { LoaderContainer } from '@common/loader';
import Company from './views/company';
import Authentication from './views/authentication';

class App extends Component {
  state = {
    user: null,
    loading: true
  };

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user, loading: false });
      } else {
        this.setState({ user: null, loading: false });
      }
    });
  }

  render() {
    const { user, loading } = this.state;
    // REQUIRED: Define a criteria to show company, admin or student layout
    // @Ernesto Remove Loading (App Does not render until user is logged in)
    const isStudent = false;
    const isCompany = Boolean(user);
    const isAdmin = false;

    if (loading) {
      return (
        <LoaderContainer>
          <Loader my="45vh" />
        </LoaderContainer>
      );
    }

    if (isCompany /* COMPANY CRITERIA */) {
      return <Company />;
    }

    if (isStudent /* STUDENT CRITERIA */) {
      // Fill in the future with student router
      return <Fragment />;
    }

    if (isAdmin /* ADMIN CRITERIA */) {
      // Fill in the future with admin router
      return <Fragment />;
    }

    return <Authentication />;
  }
}

export default App;
