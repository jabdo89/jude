import React from 'react';
import PropTypes from 'prop-types';
// import { FiSearch } from 'react-icons/fi';
import Typography from '@common/typography';
import { Container, /* Input, */ Select, FilterContainer } from './elements';

const FilterBar = ({ jobOffers, jobOfferFilter, updateJobOfferFilter }) => (
  <Container>
    {/* <Input
      value=""
      onChange={() => {

      }}
      leftIcon={<FiSearch />}
      placeholder="Search"
    /> */}
    <FilterContainer>
      <Typography variant="muted">Offer</Typography>
      <Select
        value={jobOfferFilter}
        onChange={event => {
          updateJobOfferFilter(event.target.value);
        }}
      >
        <option value="any">Any offer</option>
        {jobOffers &&
          jobOffers.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
      </Select>
    </FilterContainer>
  </Container>
);

FilterBar.propTypes = {
  updateJobOfferFilter: PropTypes.func.isRequired,
  jobOfferFilter: PropTypes.string.isRequired,
  jobOffers: PropTypes.array.isRequired
};

export default FilterBar;
