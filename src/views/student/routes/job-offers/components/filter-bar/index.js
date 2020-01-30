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
      placeholder="Search by requirement"
    />
    <FilterContainer>
      <Typography variant="muted">Budget higher than:</Typography>
      <Select
        value=""
        onChange={() => {
          /* Replace with handler */
        }}
      >
        <option value="">$0</option>
        <option value="3000">$3000 / month</option>
        <option value="5000">$5000 / month</option>
        <option value="6000">$6000 / month</option>
      </Select>
    </FilterContainer>
  </Container>
);

export default FilterBar;
