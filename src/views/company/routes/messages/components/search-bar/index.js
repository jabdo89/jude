import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { Container, Select } from './elements';

const FilterBar = () => (
  <Container>
    <Select value="" leftIcon={<FiSearch />} onChange={() => {}}>
      <option value="">Select a conversation</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </Select>
  </Container>
);

export default FilterBar;
