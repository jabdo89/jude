import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@common/typography';
import Box from '@common/box';
import Button from '@common/button';
import { Container, PseudoContainer, Content, TitleSection, Clear } from './elements';
import Notification from './components/notification';

const NotificationsMenu = ({ active, toggleNotifications, notifications }) => (
  <Container show={active}>
    <PseudoContainer onClick={toggleNotifications}>
      <Content>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <TitleSection>
            <Typography fontWeight="bold">Activity</Typography>
          </TitleSection>
          <Button color="secondary" size="small" variant="link">
            Clear all <Clear />
          </Button>
        </Box>
        {notifications &&
          notifications.map(notification => (
            <Notification
              type={notification.type}
              title={notification.type}
              JobOffer={notification.JobOffer}
            />
          ))}
      </Content>
    </PseudoContainer>
  </Container>
);

NotificationsMenu.defaultProps = {
  notifications: undefined
};

NotificationsMenu.propTypes = {
  active: PropTypes.bool.isRequired,
  toggleNotifications: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.object)
};

export default NotificationsMenu;
