import React from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';
import Typography from '@common/typography';
import { Container, Input, Select, FilterContainer } from './elements';

const FilterBar = ({
  budgetFilterUpdate,
  budgetValue,
  requirementFilterUpdate,
  requirementValue
}) => (
  <Container>
    <Input
      value={requirementValue}
      onChange={event => {
        requirementFilterUpdate(event.target.value.toUpperCase());
      }}
      leftIcon={<FiSearch />}
      placeholder="Search by requirement"
    />
    <FilterContainer>
      <Typography variant="muted">Budget higher than:</Typography>
      <Select
        value={budgetValue}
        onChange={event => {
          budgetFilterUpdate(event.target.value);
        }}
      >
        <option value="0">$0</option>
        <option value="3000">$3000 / month</option>
        <option value="5000">$5000 / month</option>
        <option value="6000">$6000 / month</option>
      </Select>
    </FilterContainer>
  </Container>
);

FilterBar.propTypes = {
  budgetFilterUpdate: PropTypes.func.isRequired,
  budgetValue: PropTypes.string.isRequired,
  requirementFilterUpdate: PropTypes.func.isRequired,
  requirementValue: PropTypes.string.isRequired
};

export default FilterBar;
