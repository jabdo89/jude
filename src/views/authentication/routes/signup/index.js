import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@common/typography';
import Box from '@common/box';
import Button from '@common/button';
import { FaEnvelope, FaKey, FaRegUser } from 'react-icons/fa';
import { Link } from '@reach/router';
import { Form, Input } from './elements';

class Login extends Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  };

  handleChange = ({ target }) => this.setState({ [target.name]: target.value });

  handleSubmit = () => {
    // Handle submit here
  };

  render() {
    const { authError } = this.props;
    const { email, password, confirmPassword, firstName, lastName } = this.state;
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Typography variant="headingTitle" textAlign="center">
            CREATE AN ACCOUNT
          </Typography>
          <Typography mb={30} textAlign="center">
            COMPLETE THE FOLLOWING DATA TO GET ACCESS
          </Typography>
          <Input
            leftIcon={<FaEnvelope />}
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
            name="email"
            mb={10}
          />
          <Input
            leftIcon={<FaRegUser />}
            placeholder="First name"
            value={firstName}
            onChange={this.handleChange}
            name="firstName"
            mb={10}
          />
          <Input
            leftIcon={<FaRegUser />}
            placeholder="Last Name"
            value={lastName}
            onChange={this.handleChange}
            name="lastName"
            mb={10}
          />
          <Input
            leftIcon={<FaKey />}
            type="password"
            placeholder="Enter password here"
            value={password}
            onChange={this.handleChange}
            name="password"
            mb={10}
          />
          <Input
            leftIcon={<FaKey />}
            type="password"
            placeholder="Enter password here"
            value={confirmPassword}
            onChange={this.handleChange}
            name="confirmPassword"
          />
          <Button mt={30} color="gradient" fullWidth>
            Signup
          </Button>
          <Typography mt={20} textAlign="center" color="danger">
            {authError}
          </Typography>
          <Box display="flex" justifyContent="center" mt={20}>
            <Typography textAlign="center" variant="muted">
              Already have an account?
            </Typography>
            <Link to="/login">
              <Typography ml={5} fontSize="0.85rem" color="primary">
                Log in
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
  authError: PropTypes.string
};

export default Login;
