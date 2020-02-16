import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@common/typography';
import Box from '@common/box';
import { MdDone, MdBlock, MdMail } from 'react-icons/md';
import { Container, Icon, Clear } from './elements';

const getIcon = type => {
  if (type === 'New Request') {
    return <MdMail />;
  }

  if (type === 'Request Denied') {
    return <MdBlock />;
  }

  if (type === 'Confirmed Request') {
    return <MdDone />;
  }

  return null;
};

const getType = type => {
  if (type === 'Request Denied') {
    return 'warning';
  }

  if (type === 'New Request') {
    return 'success';
  }

  if (type === 'Confirmed Request') {
    return 'success';
  }

  return null;
};

const getDesc = (jobOffer, type) => {
  if (type === 'Request Denied') {
    return `Request for ${jobOffer} denied`;
  }

  if (type === 'New Request') {
    return `Look for ${jobOffer} in requests `;
  }

  if (type === 'Confirmed Request') {
    return `Look for ${jobOffer} in messages `;
  }

  return null;
};

const Notification = ({ type, title, JobOffer }) => (
  <Container type={type}>
    <Icon type={getType(type)}>{getIcon(type)}</Icon>
    <Box>
      <Typography>{title}</Typography>
      <Typography variant="muted">{getDesc(JobOffer, type)}</Typography>
    </Box>
    <Clear className="clear" />
  </Container>
);

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  JobOffer: PropTypes.string.isRequired
};

export default Notification;
