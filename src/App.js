import React, { Component, Fragment } from 'react';
import firebase from 'firebase';
import Loader, { LoaderContainer } from '@common/loader';
import DashboardLayout from '@layouts/dashboard';
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
    const isStudent = false;
    const isCompany = Boolean(user);
    const isAdmin = false;

    // @Ernesto Remove Loading (App Does not render until user is logged in)
    // @Abdo Can't remove Loading (Routes bounce to students because of redirect before load authentication)
    if (loading) {
      return (
        <LoaderContainer>
          <Loader my="45vh" />
        </LoaderContainer>
      );
    }

    if (isCompany /* COMPANY CRITERIA */) {
      return (
        <DashboardLayout company>
          <Company />
        </DashboardLayout>
      );
    }

    if (isStudent /* STUDENT CRITERIA */) {
      // Fill in the future with student router
      return (
        <DashboardLayout student>
          <Fragment />
        </DashboardLayout>
      );
    }

    if (isAdmin /* ADMIN CRITERIA */) {
      // Fill in the future with admin router
      return (
        <DashboardLayout admin>
          <Fragment />
        </DashboardLayout>
      );
    }

    return <Authentication />;
  }
}

export default App;
