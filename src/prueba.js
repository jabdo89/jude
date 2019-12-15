import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { signOut } from './Actions/authActions';

class Prueba extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { signOut: localeSignout } = this.props;
    localeSignout();
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleSubmit}>
          Log Out
        </button>
      </div>
    );
  }
}

Prueba.propTypes = {
  signOut: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    JobOffers: state.firestore.ordered.JobOffers,
    profile: state.firebase.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'JobOffers' }, { collection: 'Usuarios' }])
)(Prueba);
