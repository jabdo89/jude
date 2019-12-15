import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from './elements';

const Navbar = ({ children, shrink, color, hideBg, hideNavbar, shadow, ...props }) => (
  <Container color={color} hideBg={hideBg} hideNavbar={hideNavbar} shadow={shadow} {...props}>
    <Content shrink={shrink}>{children}</Content>
  </Container>
);

Navbar.defaultProps = {
  shrink: true,
  color: 'lighter',
  hideBg: false,
  hideNavbar: false,
  shadow: true
};

Navbar.propTypes = {
  children: PropTypes.any.isRequired,
  shrink: PropTypes.bool,
  color: PropTypes.string,
  hideBg: PropTypes.bool,
  hideNavbar: PropTypes.bool,
  shadow: PropTypes.bool
};

export default Navbar;
