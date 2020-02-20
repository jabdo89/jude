import React, { Component } from 'react';
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

class JobOffers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budgetFilter: '0',
      requirementFilter: ''
    };
  }

  updateBudgetFilter = filter => {
    this.setState({ budgetFilter: filter });
  };

  updateRequirementFilter = filter => {
    this.setState({ requirementFilter: filter });
  };

  checkRequirement = offer => {
    const { requirementFilter } = this.state;
    let i;
    if (requirementFilter === '') {
      return true;
    }
    for (i = 0; i < offer.length; i++) {
      if (offer[i] === requirementFilter) {
        return true;
      }
    }
    return false;
  };

  checkMajor = offer => {
    const { profile } = this.props;
    let i;
    if (offer === undefined) {
      return true;
    }
    for (i = 0; i < offer.length; i++) {
      if (offer[i] === profile.major) {
        return true;
      }
    }
    return false;
  };

  render() {
    const { Offers } = this.props;
    const { budgetFilter, requirementFilter } = this.state;
    return (
      <Box pb={30}>
        <NotificationContainer />
        <FilterBar
          budgetFilterUpdate={this.updateBudgetFilter}
          budgetValue={budgetFilter}
          requirementFilterUpdate={this.updateRequirementFilter}
          requirementValue={requirementFilter}
        />
        <Container>
          {Offers &&
            Offers.map(offer => {
              if (
                offer.budget >= parseInt(budgetFilter, 10) &&
                this.checkRequirement(offer.requirements) &&
                this.checkMajor(offer.major)
              ) {
                return <OfferCard key={offer.id} offer={offer} />;
              }
              return null;
            })}
        </Container>
      </Box>
    );
  }
}

JobOffers.defaultProps = {
  Offers: undefined,
  profile: undefined
};

JobOffers.propTypes = {
  Offers: PropTypes.arrayOf(PropTypes.object),
  profile: PropTypes.object
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
