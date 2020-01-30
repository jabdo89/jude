import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@common/typography';
import Pill from '@common/pill';

const Info = ({ companyName, description }) => (
  <Fragment>
    <Typography mt={5} textAlign="center" variant="muted" fontWeight="bold">
      @{companyName}
    </Typography>
    <Pill mx="auto" my={10} variant="soft" color="secondary">
      Company
    </Pill>
    <Typography mt={20} textAlign="center" variant="muted" fontSize="14px">
      {description}
    </Typography>
  </Fragment>
);

Info.propTypes = {
  companyName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Info;
