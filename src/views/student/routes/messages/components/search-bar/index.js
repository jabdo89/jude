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
      placeholder="Search messages"
    />
  </Container>
);

export default FilterBar;
