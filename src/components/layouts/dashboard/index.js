import React from 'react';
import PropTypes from 'prop-types';
import Box from '@common/box';
import Container from './elements';
import Aside from './components/aside';
import Navbar from './components/navbar';

const DashboardLayout = ({ children }) => (
  <Container>
    <Aside />
    <Box pt={66}>
      <Navbar />
      {children}
    </Box>
  </Container>
);

DashboardLayout.propTypes = {
  children: PropTypes.any.isRequired
};

export default DashboardLayout;
