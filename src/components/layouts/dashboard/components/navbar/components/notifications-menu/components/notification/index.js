import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@common/typography';
import Box from '@common/box';
import { MdWarning, MdInfo, MdDone, MdThumbUp } from 'react-icons/md';
import { Container, Icon } from './elements';

const getIcon = type => {
  if (type === 'warning') {
    return <MdWarning />;
  }

  if (type === 'info') {
    return <MdInfo />;
  }

  if (type === 'success') {
    return <MdDone />;
  }

  return <MdThumbUp />;
};

const Notification = ({ type, title, description }) => (
  <Container type={type}>
    <Icon type={type}>{getIcon(type)}</Icon>
    <Box>
      <Typography>{title}</Typography>
      <Typography variant="muted">{description}</Typography>
    </Box>
  </Container>
);

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Notification;
