import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { Container, Select } from './elements';

const FilterBar = jobOffers => (
  <Container>
    <Select value="" leftIcon={<FiSearch />} onChange={() => {}}>
      <option value="">Filter by Job Offer</option>
      {jobOffers.jobOffers &&
        jobOffers.jobOffers.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
    </Select>
  </Container>
);

export default FilterBar;
