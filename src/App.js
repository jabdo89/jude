import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardLayout from '@layouts/dashboard';
import TopBarProgress from 'react-topbar-progress-indicator';
import theme from 'theme';
import Company from './views/company';
import Student from './views/student';
import Authentication from './views/authentication';

TopBarProgress.config({
  barColors: {
    '0': theme.colors.secondary,
    '1.0': theme.colors.secondary
  },
  shadowBlur: 2,
  barThickness: 2,
  shadowColor: theme.colors.default
});

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
