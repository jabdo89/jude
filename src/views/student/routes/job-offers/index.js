import React from 'react';
import PropTypes from 'prop-types';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Box from '@common/box';
import Container from './elements';
import FilterBar from './components/filter-bar';
import OfferCard from './components/offer-card';

const JobOffers = ({ Offers }) => (
  <Box pb={30}>
    <NotificationContainer />
    <FilterBar />
    <Container>
      {Offers && Offers.map(offer => <OfferCard key={offer.id} offer={offer} />)}
    </Container>
  </Box>
);

JobOffers.defaultProps = {
  Offers: undefined
};

JobOffers.propTypes = {
  Offers: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => {
  return {
    Offers: state.firestore.ordered.JobOffers,
    profile: state.firebase.profile
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'JobOffers' }])
)(JobOffers);
