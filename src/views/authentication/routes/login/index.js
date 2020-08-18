import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn } from '@actions/authActions';
import Typography from '@common/typography';
import Box from '@common/box';
import Button from '@common/button';
import { FaRegUserCircle, FaKey } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Form, Input } from './elements';

class Login extends Component {
  state = {
    email: '',
    password: '',
    fireError: '',
    rol: ''
  };

  handleChange = ({ target }) => this.setState({ [target.name]: target.value });

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
            value={email}
            onChange={this.handleChange}
            name="email"
            mb={10}
          />
          <Input
            leftIcon={<FaKey />}
            type="password"
            placeholder="Enter password here"
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
          <Link to="/forgotPassword">
            <Typography ml={5} textAlign="center" fontSize="0.85rem" color="primary">
              Forgot Password
            </Typography>
          </Link>
          <Box display="flex" justifyContent="center" mt={20}>
            <Typography textAlign="center" variant="muted">
              Don&apos;t have an account yet?
            </Typography>
            <Link to="/signup">
              <Typography ml={5} fontSize="0.85rem" color="primary">
                Create one
              </Typography>
            </Link>
          </Box>
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
