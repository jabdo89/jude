import React from 'react';
import PropTypes from 'prop-types';
import Button from '@common/button';
import NavbarActionPortal from '@templates/navbar-action-portal';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { Container, Input, NewContainer } from './elements';

const FilterBar = ({ toggleNewOfferModal }) => (
  <Container>
    <Input
      value=""
      onChange={() => {
        /* Replace with handler */
      }}
      leftIcon={<FiSearch />}
      placeholder="Buscar"
    />
    <NavbarActionPortal>
      <NewContainer>
        <Button onClick={toggleNewOfferModal} color="secondary" variant="soft">
          New offer <FiPlus />
        </Button>
      </NewContainer>
    </NavbarActionPortal>
  </Container>
);

FilterBar.propTypes = {
  toggleNewOfferModal: PropTypes.func.isRequired
};

export default FilterBar;
