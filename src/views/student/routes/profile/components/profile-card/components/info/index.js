import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import Button from '@common/button';
import Typography from '@common/typography';
import Pill from '@common/pill';

const Info = ({ firstName, lastName, username, description, major, semester }) => (
  <Fragment>
    <Typography mt={20} textAlign="center" variant="headingTitle" color="default">
      {firstName} {lastName}
    </Typography>
    <Typography mt={5} textAlign="center" variant="muted" fontWeight="bold">
      @{username}
    </Typography>
    <Pill mx="auto" my={10} variant="soft" color="primary">
      Student
    </Pill>
    <Typography mt={20} textAlign="center" color="lightDark">
      {major}
    </Typography>
    {semester && (
      <Typography mt={5} textAlign="center" variant="muted">
        at {semester}º semester
      </Typography>
    )}
    <Typography mt={20} textAlign="center" variant="muted" fontSize="14px">
      {description}
    </Typography>
    {/* <Link to="/personalityTest">
      <Button fullWidth mt={20} color="secondary">
        Take Personality Test
      </Button>
    </Link> */}
  </Fragment>
);
Info.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  major: PropTypes.string.isRequired,
  semester: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired
};

export default Info;
