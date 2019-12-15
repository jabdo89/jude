import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FiX } from 'react-icons/fi';
import { Container, CloseButton, Route } from './elements';

const ResponsiveMenu = ({ active, closeModal }) => (
  <Fragment>
    {active && (
      <Container>
        <CloseButton role="button" onClick={closeModal}>
          <FiX />
        </CloseButton>
        <Route onClick={closeModal}>Home</Route>
      </Container>
    )}
  </Fragment>
);

ResponsiveMenu.propTypes = {
  active: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default ResponsiveMenu;
