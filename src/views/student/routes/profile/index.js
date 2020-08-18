import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import ProfileCard from './components/profile-card';
import { Container, Column } from './elements';
import DataForm from './components/data-form';

// const script = document.createElement('script');
// script.src =
//   'https://cdn2.hubspot.net/hubfs/1716276/embeddable_assessments/disc/disc_assessment_v1.1.0.js';
// script.async = true;
// document.body.appendChild(script);

const Profile = ({ User }) => (
  <Container>
    <NotificationContainer />
    <Column basis="60">
      <DataForm user={User} />
      {/* <div id="disc_assessment_root" data-api-token="d81a03d1163f14098a3d897db7b80dbe"></div> */}
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
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
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

export default connect(mapStateToProps, null)(Profile);
