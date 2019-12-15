import React, { Component, Fragment } from 'react';
import { FiMenu, FiBell } from 'react-icons/fi';
import {
  Container,
  Routes,
  Content,
  MenuButton,
  Route,
  Divider,
  NotificationButton
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
      <Fragment>
        <Container shrink={false}>
          <Content>
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

export default Navbar;
