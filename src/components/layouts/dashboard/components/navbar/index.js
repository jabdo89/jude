import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FiMenu, FiBell } from 'react-icons/fi';
import { withRouter } from 'react-router-dom';
import Typography from '@common/typography';
import Box from '@common/box';
import {
  Container,
  Routes,
  Content,
  MenuButton,
  Route,
  Divider,
  NotificationButton,
  Action,
  Qty
} from './elements';
import ResponsiveMenu from './components/responsive-menu';
import NotificationsMenu from './components/notifications-menu';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      isNotificationsOpen: false
    };
  }

  toggleNotifications = () =>
    this.setState(({ isNotificationsOpen }) => ({ isNotificationsOpen: !isNotificationsOpen }));

  toggleMenu = () => this.setState(({ isMenuOpen }) => ({ isMenuOpen: !isMenuOpen }));

  render() {
    const { isMenuOpen, isNotificationsOpen } = this.state;
    const {
      location: { pathname }
    } = this.props;
    return (
      <Fragment>
        <Container shrink={false}>
          <Content>
            <Box width="100%" display="flex" alignItems="center">
              <Typography
                mr={10}
                as="h1"
                fontWeight="300"
                capitalize
                variant="leadText"
                color="primary"
              >
                {pathname.includes('@') ? 'My profile' : pathname.split('/')[1].replace('-', ' ')}
              </Typography>
              {/* This div will be used as a portal for specific action views */}
              {/* DO NOT REMOVE */}
              <Action id="action"></Action>
            </Box>
            <Routes>
              <Route active fontSize="11px">
                Home
              </Route>
            </Routes>
            <Divider />
            <NotificationButton onClick={this.toggleNotifications}>
              <FiBell />
              <Qty>2</Qty>
            </NotificationButton>
            <MenuButton onClick={this.toggleMenu}>
              <FiMenu />
            </MenuButton>
          </Content>
        </Container>
        <ResponsiveMenu active={isMenuOpen} closeModal={this.toggleMenu} />
        <NotificationsMenu
          active={isNotificationsOpen}
          toggleNotifications={this.toggleNotifications}
        />
      </Fragment>
    );
  }
}

Navbar.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(Navbar);
