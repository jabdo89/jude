import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { Container, Input } from './elements';

const FilterBar = () => (
  <Container>
    <Input
      value=""
      onChange={() => {
        /* Replace with handler */
      }}
      leftIcon={<FiSearch />}
      placeholder="Filter by job offer"
    />
  </Container>
);

export default FilterBar;
