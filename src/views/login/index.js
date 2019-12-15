import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn } from '@actions/authActions';
import Typography from '@common/typography';
import Button from '@common/button';
import { FaRegUserCircle, FaKey } from 'react-icons/fa';
import Input from '@common/input';
import {
  Background,
  TargetIcon,
  ConnectingWord,
  WelcomeWord,
  EnterWord,
  LogoMain,
  LogoBig,
  UDEWord,
  Form,
  LeftContainer,
  LogoContainer
} from './elements';

class Login extends Component {
  state = {
    email: '',
    password: '',
    fireError: '',
    rol: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { signIn: localeSignin } = this.props;

    localeSignin(this.state);
  };

  render() {
    const { authError } = this.props;
    const { email, password } = this.state;
    return (
      <Fragment>
        <LeftContainer>
          <Background src="/static/img/login/jude_homescreen_backgroung.png" alt="logo" />
          <TargetIcon src="/static/img/login/target.png" alt="target" />
          <ConnectingWord color="lighter">Connect Students With Companies</ConnectingWord>
          <WelcomeWord color="lighter">WELCOME BACK!</WelcomeWord>
          <EnterWord color="lighter">Enter your Email and Password to continue</EnterWord>
          <LogoBig src="/static/img/brand/jude_logo.png" alt="logo" />
        </LeftContainer>
        <LogoContainer>
          <LogoMain src="/static/img/brand/jude_logo.png" alt="logo" />
          <UDEWord color="primary">UDE</UDEWord>
        </LogoContainer>
        <Form onSubmit={this.handleSubmit}>
          <Typography variant="headingTitle" textAlign="center">
            SIGN IN
          </Typography>
          <Typography mb={30} textAlign="center">
            TO ACCESS THE PORTAL
          </Typography>
          <Input
            leftIcon={<FaRegUserCircle />}
            placeholder="Enter email here"
            label="Email"
            value={email}
            onChange={this.handleChange}
            name="email"
          />
          <Input
            leftIcon={<FaKey />}
            type="password"
            placeholder="Enter password here"
            label="Password"
            value={password}
            onChange={this.handleChange}
            name="password"
          />
          <Button mt={30} color="gradient" fullWidth>
            Login
          </Button>
          <Typography mt={20} textAlign="center" color="danger">
            {authError}
          </Typography>
        </Form>
      </Fragment>
    );
  }
}

Login.defaultProps = {
  authError: ''
};

Login.propTypes = {
  signIn: PropTypes.func.isRequired,
  authError: PropTypes.string
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: newUser => dispatch(signIn(newUser))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
