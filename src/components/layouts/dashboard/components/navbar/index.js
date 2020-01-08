import React, { Component, Fragment } from 'react';
import { FiMenu, FiBell } from 'react-icons/fi';
import { Location } from '@reach/router';
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
  Action
} from './elements';
import ResponsiveMenu from './components/responsive-menu';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
  }

  toggleMenu = () => this.setState(({ isMenuOpen }) => ({ isMenuOpen: !isMenuOpen }));

  render() {
    const { isMenuOpen } = this.state;
    return (
      <Location>
        {({ location: { pathname } }) => (
          <Fragment>
            <Container shrink={false}>
              <Content>
                <Box marginRight="auto" display="flex" alignItems="center">
                  <Typography mr={5} capitalize variant="leadText" color="primary">
                    {pathname.split('/')[1].replace('-', ' ')}
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
                <NotificationButton>
                  <FiBell />
                </NotificationButton>
                <MenuButton onClick={this.toggleMenu}>
                  <FiMenu />
                </MenuButton>
              </Content>
            </Container>
            <ResponsiveMenu active={isMenuOpen} closeModal={this.toggleMenu} />
          </Fragment>
        )}
      </Location>
    );
  }
}

export default Navbar;
