import React from 'react';
import { FiSearch } from 'react-icons/fi';
import Box from '@common/box';
import Typography from '@common/typography';
import { Container, Input, Select, Divider } from './elements';

const FilterBar = () => (
  <Container>
    <Input leftIcon={<FiSearch />} placeholder="Buscar" />
    <Box display="flex" alignItems="center">
      <Typography variant="muted">Semester</Typography>
      <Select>
        <option value="">any</option>
        <option value="">1º</option>
        <option value="">2º</option>
        <option value="">3º</option>
        <option value="">4º</option>
        <option value="">5º</option>
        <option value="">6º</option>
        <option value="">7º</option>
        <option value="">8º</option>
        <option value="">9º</option>
        <option value="">10º</option>
      </Select>
    </Box>
    <Divider />
    <Box display="flex" alignItems="center">
      <Typography variant="muted">Major</Typography>
      <Select>
        <option value="">any</option>
        <option value="">ITC</option>
        <option value="">INT</option>
      </Select>
    </Box>
  </Container>
);

export default FilterBar;
