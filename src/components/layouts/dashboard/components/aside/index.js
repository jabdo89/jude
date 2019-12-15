import React from 'react';
import Typography from '@common/typography';
import { FiUsers, FiMessageCircle, FiStar, FiSettings } from 'react-icons/fi';
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

const Aside = () => (
  <Container>
    <LogoContainer>
      <Logo alt="Jude" src="/static/img/brand/jude_logo.png" />
      <Typography ml={5} fontSize={24} color="primary">
        UDE
      </Typography>
    </LogoContainer>
    <OptionsContainer>
      <Option active>
        <Icon>
          <FiUsers />
        </Icon>
        <p>Students</p>
        <AsideLine />
      </Option>
      <Option active={false}>
        <Icon>
          <FiMessageCircle />
        </Icon>
        <p>Messages</p>
        <AsideLine />
      </Option>
      <Option active={false}>
        <Icon>
          <FiStar />
        </Icon>
        <p>Job Offer</p>
        <AsideLine />
      </Option>
      <Option active={false}>
        <Icon>
          <FiSettings />
        </Icon>
        <p>Settings</p>
        <AsideLine />
      </Option>
    </OptionsContainer>
    <ProfileData />
  </Container>
);

export default Aside;
