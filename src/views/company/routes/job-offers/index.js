import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';
import Container from './elements';
import FilterBar from './components/filter-bar';
import OfferCard from './components/offer-card';
import NewOfferModal from './components/new-offer-modal';

faker.locale = 'es_MX';

const createSchedule = () => {
  const startHour = Math.round(Math.random() * 16);

  return {
    weekStart: 'Monday',
    weekEnd: 'Friday',
    startHour,
    endHour: startHour + 8
  };
};

class JobOffers extends Component {
  state = {
    isNewOfferOpen: false
  };

  toggleNewOfferModal = () =>
    this.setState(({ isNewOfferOpen }) => ({ isNewOfferOpen: !isNewOfferOpen }));

  render() {
    const { Offers } = this.props;
    const { isNewOfferOpen } = this.state;
    return (
      <Fragment>
        <FilterBar toggleNewOfferModal={this.toggleNewOfferModal} />
        <Container>
          {Offers.map((offer, index) => (
            <OfferCard key={offer.id} offer={offer} index={index} />
          ))}
        </Container>
        <NewOfferModal active={isNewOfferOpen} closeButton={this.toggleNewOfferModal} />
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
