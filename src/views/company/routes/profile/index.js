import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  User: undefined
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

const mapStateToProps = state => {
  return {
    User: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Profile);
