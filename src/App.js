import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardLayout from '@layouts/dashboard';
import Company from './views/company';
import Student from './views/student';
import Authentication from './views/authentication';

const App = ({ profile }) => {
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
};

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
