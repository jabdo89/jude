import React from 'react';
import faker from 'faker';
import PropTypes from 'prop-types';
import ProfileCard from './components/profile-card';
import { Container, Column } from './elements';
import DataForm from './components/data-form';

const Profile = ({ User }) => (
  <Container>
    <Column basis="60">
      <DataForm user={User} />
    </Column>
    <Column basis="40">
      <ProfileCard user={User} />
    </Column>
  </Container>
);

Profile.defaultProps = {
  User: {
    id: faker.random.uuid(),
    companyName: faker.company.companyName(),
    email: faker.internet.email(),
    website: faker.internet.url(),
    profileImg: faker.image.avatar(),
    semester: Math.round(Math.random() * 9) + 1,
    description: faker.lorem.paragraph(),
    major: Math.random() > 0.5 ? 'ITC' : 'INT',
    resume: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
};

Profile.propTypes = {
  User: PropTypes.shape({
    id: PropTypes.string,
    companyName: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profileImg: PropTypes.string,
    semester: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    resume: PropTypes.string.isRequired
  })
};

export default Profile;
