import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@common/typography';
import { Link, withRouter } from 'react-router-dom';
import { FiUsers, FiLayers, FiMessageCircle, FiStar, FiSettings } from 'react-icons/fi';
import ProfileData from './components/profile-data';
import {
  Container,
  Option,
  AsideLine,
  Icon,
  LogoContainer,
  Logo,
  OptionsContainer
} from './elements';

const Aside = ({ location: { pathname } }) => (
  <Container>
    <LogoContainer>
      <Logo alt="Jude" src="/static/img/brand/jude_logo.png" />
      <Typography ml={5} fontSize={24} color="primary">
        UDE
      </Typography>
    </LogoContainer>
    <OptionsContainer>
      <Link to="/students">
        <Option active={pathname.includes('students')}>
          <Icon>
            <FiUsers />
          </Icon>
          <p>Students</p>
          <AsideLine />
        </Option>
      </Link>
      <Link to="/requests">
        <Option active={pathname.includes('requests')}>
          <Icon>
            <FiLayers />
          </Icon>
          <p>Requests</p>
          <AsideLine />
        </Option>
      </Link>
      <Link to="/messages">
        <Option active={pathname.includes('messages')}>
          <Icon>
            <FiMessageCircle />
          </Icon>
          <p>Messages</p>
          <AsideLine />
        </Option>
      </Link>
      <Link to="/job-offers">
        <Option active={pathname.includes('job-offers')}>
          <Icon>
            <FiStar />
          </Icon>
          <p>Job Offers</p>
          <AsideLine />
        </Option>
      </Link>
      <Link to="/settings">
        <Option active={pathname.includes('settings')}>
          <Icon>
            <FiSettings />
          </Icon>
          <p>Settings</p>
          <AsideLine />
        </Option>
      </Link>
    </OptionsContainer>
    <ProfileData />
  </Container>
);

Aside.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(Aside);
