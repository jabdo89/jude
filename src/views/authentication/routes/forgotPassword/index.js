import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { forgotPassword } from '@actions/authActions';
import Typography from '@common/typography';
import Box from '@common/box';
import Button from '@common/button';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Form, Input } from './elements';

class Login extends Component {
  state = {
    email: ''
  };

  handleChange = ({ target }) => this.setState({ [target.name]: target.value });

  handleSubmit = e => {
    e.preventDefault();
    const { forgotPassword: localeForgotPassword } = this.props;

    localeForgotPassword(this.state.email);
  };

  render() {
    const { forgotPasswordError } = this.props;
    const { email } = this.state;

    let errorColor;
    if (forgotPasswordError === 'Change Password Email Sent Succesfully!') {
      errorColor = 'success';
    } else {
      errorColor = 'danger';
    }
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Typography variant="headingTitle" textAlign="center">
            Forgot Password?
          </Typography>
          <Typography mb={30} textAlign="center">
            Enter your account email to change your password
          </Typography>
          <Input
            leftIcon={<FaRegUserCircle />}
            placeholder="Enter email here"
            value={email}
            onChange={this.handleChange}
            name="email"
            mb={10}
          />
          <Button mt={30} color="gradient" fullWidth>
            Send Forgot Password Email
          </Button>
          <Typography mt={20} textAlign="center" color={errorColor}>
            {forgotPasswordError}
          </Typography>
          <Link to="/login">
            <Typography ml={5} textAlign="center" fontSize="0.85rem" color="primary">
              Back to Log In
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
  forgotPasswordError: ''
};

Login.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  forgotPasswordError: PropTypes.string
};

const mapStateToProps = state => {
  return {
    forgotPasswordError: state.auth.forgotPasswordError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    forgotPassword: newUser => dispatch(forgotPassword(newUser))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
