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
    );
  }
}

Navbar.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(Navbar);
