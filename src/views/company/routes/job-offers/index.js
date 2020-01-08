import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';
import Container from './elements';
import FilterBar from './components/filter-bar';
import OfferCard from './components/offer-card';
import NewOfferModal from './components/new-offer-modal';
import EditOfferModal from './components/edit-offer-modal';

faker.locale = 'es_MX';

const createSchedule = () => {
  const startHour = Math.round(Math.random() * 16);

  return {
    weekStart: 'Monday',
    weekEnd: 'Friday',
    startHour: `${String(startHour).padStart(2, '0')}:00`,
    endHour: `${String(startHour + 8).padStart(2, '0')}:00`
  };
};

class JobOffers extends Component {
  state = {
    isNewOfferOpen: false,
    isEditOfferOpen: false,
    offerToEdit: null
  };

  toggleNewOfferModal = () =>
    this.setState(({ isNewOfferOpen }) => ({ isNewOfferOpen: !isNewOfferOpen }));

  toggleEditOfferModal = idx => {
    const { isEditOfferOpen } = this.state;
    const { Offers } = this.props;
    if (isEditOfferOpen) {
      this.setState({ isEditOfferOpen: false, offerToEdit: null });
    } else {
      this.setState({ isEditOfferOpen: true, offerToEdit: Offers[idx] });
    }
  };

  render() {
    const { Offers } = this.props;
    const { isNewOfferOpen, isEditOfferOpen, offerToEdit } = this.state;
    return (
      <Fragment>
        <FilterBar toggleNewOfferModal={this.toggleNewOfferModal} />
        <Container>
          {Offers.map((offer, idx) => (
            <OfferCard
              key={offer.id}
              setEditOffer={() => this.toggleEditOfferModal(idx)}
              offer={offer}
            />
          ))}
        </Container>
        <NewOfferModal active={isNewOfferOpen} closeButton={this.toggleNewOfferModal} />
        {isEditOfferOpen && (
          <EditOfferModal
            active={isEditOfferOpen}
            offerToEdit={offerToEdit}
            closeButton={this.toggleEditOfferModal}
          />
        )}
      </Fragment>
    );
  }
}

JobOffers.defaultProps = {
  Offers: new Array(10).fill().map(() => ({
    id: faker.random.uuid(),
    companyLogoUrl: faker.image.business(),
    name: faker.name.jobTitle(),
    budget: faker.random.number().toLocaleString(),
    description: faker.lorem.paragraph(),
    scheduleDesc: createSchedule(),
    requirements: new Array(Math.ceil(Math.random() * 4))
      .fill()
      .map(() => faker.name.jobDescriptor())
  }))
};

JobOffers.propTypes = {
  Offers: PropTypes.arrayOf(PropTypes.object)
};

export default JobOffers;
