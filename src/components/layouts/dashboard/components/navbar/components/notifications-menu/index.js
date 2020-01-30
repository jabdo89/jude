import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@common/typography';
import { Container, PseudoContainer, Content, TitleSection } from './elements';
import Notification from './components/notification';

const getType = () => {
  const rand = Math.random();

  if (rand < 0.25) {
    return 'warning';
  }

  if (rand < 0.5) {
    return 'info';
  }

  if (rand < 0.75) {
    return 'success';
  }

  return 'primary';
};

const NotificationsMenu = ({ active, toggleNotifications }) => (
  <Container show={active}>
    <PseudoContainer onClick={toggleNotifications}>
      <Content>
        <TitleSection>
          <Typography fontWeight="bold">Activity</Typography>
        </TitleSection>
        <Notification
          type={getType()}
          title="Notification 1"
          description="This is a notification"
        />
        <Notification
          type={getType()}
          title="Notification 2"
          description="This is a notification"
        />
        <Notification
          type={getType()}
          title="Notification 3"
          description="This is a notification"
        />
        <Notification
          type={getType()}
          title="Notification 4"
          description="This is a notification"
        />
        <Notification
          type={getType()}
          title="Notification 5"
          description="This is a notification"
        />
        <Notification
          type={getType()}
          title="Notification 6"
          description="This is a notification"
        />
        <Notification
          type={getType()}
          title="Notification 7"
          description="This is a notification"
        />
        <Notification
          type={getType()}
          title="Notification 8"
          description="This is a notification"
        />
        <Notification
          type={getType()}
          title="Notification 9"
          description="This is a notification"
        />
        <Notification
          type={getType()}
          title="Notification 10"
          description="This is a notification"
        />
      </Content>
    </PseudoContainer>
  </Container>
);

NotificationsMenu.propTypes = {
  active: PropTypes.bool.isRequired,
  toggleNotifications: PropTypes.func.isRequired
};

export default NotificationsMenu;
