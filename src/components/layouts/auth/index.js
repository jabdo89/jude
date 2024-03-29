import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Background,
  TargetIcon,
  ConnectingWord,
  WelcomeWord,
  EnterWord,
  LogoMain,
  LogoBig,
  UDEWord,
  LeftContainer,
  LogoContainer
} from './elements';

const AuthLayout = ({ children, isMobile }) => (
  <Fragment>
    <LeftContainer>
      <Background src="/static/img/login/jude_homescreen_backgroung.png" alt="logo" />
      <TargetIcon src="/static/img/login/target.png" alt="target" />
      <ConnectingWord color="lighter">Connecting Students With Companies</ConnectingWord>
      <WelcomeWord color="lighter">WELCOME BACK!</WelcomeWord>
      <EnterWord color="lighter">Authenticate yourself to continue</EnterWord>
      <LogoBig src="/static/img/brand/jude_logo.png" alt="logo" />
    </LeftContainer>
    {isMobile ? null : (
      <LogoContainer>
        <LogoMain src="/static/img/brand/jude_logo.png" alt="logo" />
        <UDEWord color="primary">UDE</UDEWord>
      </LogoContainer>
    )}
    {children}
  </Fragment>
);

AuthLayout.propTypes = {
  children: PropTypes.any.isRequired,
  isMobile: PropTypes.bool.isRequired
};

export default AuthLayout;
