import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@common/typography';
import { withRouter } from 'react-router-dom';
import ProfileData from './components/profile-data';
import CompanyRoutes from './components/company-routes';
import StudentRoutes from './components/student-routes';
import AdminRoutes from './components/admin-routes';
import RecruiterRoutes from './components/recruiter-routes';
import { Container, LogoContainer, Logo, OptionsContainer } from './elements';

const Aside = ({ admin, student, company, recruiter }) => (
  <Container>
    <LogoContainer>
      <Logo alt="Jude" src="/static/img/brand/jude_logo.png" />
      <Typography ml={5} fontSize={24} color="primary">
        UDE
      </Typography>
    </LogoContainer>
    <OptionsContainer>
      {company && <CompanyRoutes />}
      {student && <StudentRoutes />}
      {admin && <AdminRoutes />}
      {recruiter && <RecruiterRoutes />}
    </OptionsContainer>
    <ProfileData />
  </Container>
);

Aside.defaultProps = {
  admin: false,
  student: false,
  company: false,
  recruiter: false
};

Aside.propTypes = {
  admin: PropTypes.bool,
  student: PropTypes.bool,
  company: PropTypes.bool,
  recruiter: PropTypes.bool
};

export default withRouter(Aside);
