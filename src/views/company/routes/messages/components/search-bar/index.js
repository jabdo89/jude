import React from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';
import { Container, Select } from './elements';

const FilterBar = ({ jobOffers, updateJobOfferFilter, jobOfferFilter }) => (
  <Container>
    <Select
      value={jobOfferFilter}
      leftIcon={<FiSearch />}
      onChange={event => {
        updateJobOfferFilter(event.target.value);
      }}
    >
      <option value="">Filter by Job Offer</option>
      {jobOffers &&
        jobOffers.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
    </Select>
  </Container>
);

FilterBar.propTypes = {
  updateJobOfferFilter: PropTypes.func.isRequired,
  jobOfferFilter: PropTypes.string.isRequired,
  jobOffers: PropTypes.array.isRequired
};

export default FilterBar;
