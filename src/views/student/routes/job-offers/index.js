import React from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';
import Box from '@common/box';
import Container from './elements';
import FilterBar from './components/filter-bar';
import OfferCard from './components/offer-card';

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

const JobOffers = ({ Offers }) => (
  <Box pb={30}>
    <FilterBar />
    <Container>
      {Offers.map(offer => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </Container>
  </Box>
);

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
