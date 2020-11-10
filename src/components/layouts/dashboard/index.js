import React from 'react';
import PropTypes from 'prop-types';
import Box from '@common/box';
import Container from './elements';
import Aside from './components/aside';
import Navbar from './components/navbar';

const DashboardLayout = ({ children, admin, student, company, recruiter }) => (
  <Container>
    <Aside admin={admin} student={student} company={company} recruiter={recruiter} />
    <Box pt={66}>
      <Navbar />
      {children}
    </Box>
  </Container>
);

DashboardLayout.defaultProps = {
  admin: false,
  student: false,
  company: false,
  recruiter: false
};

DashboardLayout.propTypes = {
  children: PropTypes.any.isRequired,
  admin: PropTypes.bool,
  student: PropTypes.bool,
  company: PropTypes.bool,
  recruiter: PropTypes.bool
};

export default DashboardLayout;
