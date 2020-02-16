import React from 'react';
// import { FiSearch } from 'react-icons/fi';
import Typography from '@common/typography';
import { Container, /* Input, */ Select, FilterContainer } from './elements';

const FilterBar = jobOffers => (
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
        value=""
        onChange={() => {
          /* Replace with handler */
        }}
      >
        <option value="any">Any offer</option>
        {jobOffers.jobOffers &&
          jobOffers.jobOffers.map(({ id, name }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
      </Select>
    </FilterContainer>
  </Container>
);

export default FilterBar;
