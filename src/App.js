import React, { Component, Fragment } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import Loader, { LoaderContainer } from '@common/loader';
import DashboardLayout from '@layouts/dashboard';
import Company from './views/company';
import Student from './views/student';
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
    const { profile } = this.props;
    // REQUIRED: Define a criteria to show company, admin or student layout
    const isStudent = Boolean(user);
    const isCompany = false;
    const isAdmin = false;
    console.log(profile);

    // @Ernesto Remove Loading (App Does not render until user is logged in)
    // @Abdo Can't remove Loading (Routes bounce to students because of redirect before load authentication)
    if (loading) {
      return (
        <LoaderContainer>
          <Loader my="45vh" />
        </LoaderContainer>
      );
    }

    if (profile.rol === 'Company') {
      return (
        <DashboardLayout company>
          <Company />
        </DashboardLayout>
      );
    }

    if (profile.rol === 'Student') {
      // Fill in the future with student router
      return (
        <DashboardLayout student>
          <Student />
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

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(App);
