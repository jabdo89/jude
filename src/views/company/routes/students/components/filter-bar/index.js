import React from 'react';
import { FiSearch } from 'react-icons/fi';
import Box from '@common/box';
import Typography from '@common/typography';
import { Container, Input, Select, Divider } from './elements';

const FilterBar = () => (
  <Container>
    <Input
      value=""
      onChange={() => {
        /* Replace with handler */
      }}
      leftIcon={<FiSearch />}
      placeholder="Buscar"
    />
    <Box display="flex" alignItems="center">
      <Typography variant="muted">Semester</Typography>
      <Select
        value=""
        onChange={() => {
          /* Replace with handler */
        }}
      >
        <option value="">any</option>
        <option value="1">1º</option>
        <option value="2">2º</option>
        <option value="3">3º</option>
        <option value="4">4º</option>
        <option value="5">5º</option>
        <option value="6">6º</option>
        <option value="7">7º</option>
        <option value="8">8º</option>
        <option value="9">9º</option>
        <option value="10">10º</option>
      </Select>
    </Box>
    <Divider />
    <Box display="flex" alignItems="center">
      <Typography variant="muted">Major</Typography>
      <Select
        value=""
        onChange={() => {
          /* Replace with handler */
        }}
      >
        <option value="">any</option>
        <option value="ITC">ITC</option>
        <option value="INT">INT</option>
      </Select>
    </Box>
  </Container>
);

export default FilterBar;