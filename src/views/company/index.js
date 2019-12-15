import React from 'react';
import { connect } from 'react-redux';
import DashboardLayout from '@layouts/dashboard';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const Company = () => <DashboardLayout>Hola Mundo</DashboardLayout>;

const mapStateToProps = state => {
  return {
    JobOffers: state.firestore.ordered.JobOffers,
    profile: state.firebase.profile
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'JobOffers' }, { collection: 'Usuarios' }])
)(Company);
