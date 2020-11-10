import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@common/typography';
import Button from '@common/button';
import Pill from '@common/pill';

const Info = ({ companyName, description, changePassword }) => (
  <Fragment>
    <Typography mt={5} textAlign="center" variant="muted" fontWeight="bold">
      @{companyName}
    </Typography>
    <Pill mx="auto" my={10} variant="soft" color="secondary">
      Recruiter
    </Pill>
    <Typography mt={20} textAlign="center" variant="muted" fontSize="14px">
      {description}
    </Typography>
    <Button fullWidth mt={20} color="secondary" onClick={changePassword}>
      Change Password
    </Button>
  </Fragment>
);

Info.propTypes = {
  companyName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  changePassword: PropTypes.func.isRequired
};

export default Info;
