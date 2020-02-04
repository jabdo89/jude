import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Box from '@common/box';
import confirmation from '@templates/confirmation';
import FilterBar from './components/filter-bar';
import RequestCard from './components/request-card';
import Container from './elements';

class RequestsView extends Component {
  acceptRequest = async () => {
    if (
      await confirmation('Are you sure?', 'The company will be notified about your confirmation', {
        text: 'CONFIRM',
        description: "Please, type 'CONFIRM' to confirm"
      })
    ) {
      /*
        Handle request acceptance here
      */
    }
  };

  deleteRequest = async () => {
    if (
      await confirmation('Are you sure?', 'This will totally discard the selected offer', {
        text: 'DELETE',
        description: "Please, type 'DELETE' to confirm"
      })
    ) {
      /*
        Handle request deletion here
      */
    }
  };

  render() {
    const { Requests, JobOffers } = this.props;
    return (
      <Box pb={30}>
        <FilterBar />
        <Container>
          {Requests &&
            Requests.map(request => (
              <RequestCard
                key={request.id}
                request={JobOffers[request.jobOfferID]}
                acceptRequest={this.acceptRequest}
                deleteRequest={this.deleteRequest}
              />
            ))}
        </Container>
      </Box>
    );
  }
}

RequestsView.defaultProps = {
  Requests: undefined,
  JobOffers: undefined
};

RequestsView.propTypes = {
  Requests: PropTypes.arrayOf(PropTypes.object),
  JobOffers: PropTypes.arrayOf(PropTypes.object)
};
const mapStateToProps = state => {
  return {
    Usuarios: state.firestore.data.Usuarios,
    JobOffers: state.firestore.data.JobOffers,
    Requests: state.firestore.ordered.JobOffersyStudents,
    profile: state.firebase.profile
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'JobOffersyStudents' },
    { collection: 'Usuarios' },
    { collection: 'JobOffers' }
  ])
)(RequestsView);
