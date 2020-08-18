import React from 'react';
import { FiSearch } from 'react-icons/fi';
import Typography from '@common/typography';
import { Container, Input, Select, FilterContainer } from './elements';

const FilterBar = () => (
  <Container>
    <Input
      value=""
      onChange={() => {
        /* Replace with handler */
      }}
      leftIcon={<FiSearch />}
      placeholder="Search"
    />
    <FilterContainer>
      <Typography variant="muted">Offer</Typography>
      <Select
        value=""
        onChange={() => {
          /* Replace with handler */
        }}
      >
        <option value="">Any offer</option>
        <option value="1">Offer 1</option>
        <option value="2">Offer 2</option>
        <option value="3">Offer 3</option>
      </Select>
    </FilterContainer>
    <FilterContainer>
      <Typography ml={5} variant="muted">
        Stage
      </Typography>
      <Select
        value=""
        onChange={() => {
          /* Replace with handler */
        }}
      >
        <option value="">Any stage</option>
        <option value="1">Interviewing</option>
        <option value="2">Accepted</option>
        <option value="3">Waiting</option>
      </Select>
    </FilterContainer>
  </Container>
);

export default FilterBar;
