import React, { Component, Fragment } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader, { LoaderContainer } from '@common/loader';
import DashboardLayout from '@layouts/dashboard';
import Company from './views/company';
import Student from './views/student';
import Authentication from './views/authentication';

class App extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  render() {
    const { loading } = this.state;
    const { profile } = this.props;
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
      return (
        <DashboardLayout student>
          <Student />
        </DashboardLayout>
      );
    }

    if (profile.rol === 'Admin') {
      return (
        <DashboardLayout admin>
          <Fragment />
        </DashboardLayout>
      );
    }

    return <Authentication />;
  }
}

App.defaultProps = {
  profile: undefined
};

App.propTypes = {
  profile: PropTypes.object
};

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(App);
