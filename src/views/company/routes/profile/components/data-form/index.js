import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@common/typography';
import Box from '@common/box';
import Button from '@common/button';
import Textarea from '@common/textarea';
import { FaUser, FaEnvelope, FaBars, FaRegUser } from 'react-icons/fa';
import Input from '@common/input';

class DataForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.user.username,
      firstName: props.user.firstName,
      email: props.user.email,
      lastName: props.user.lastName,
      description: props.user.description
    };
  }

  handleInputChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  render() {
    const { username, firstName, lastName, email, description } = this.state;
    return (
      <Box mt={20} px={20}>
        <Typography mb={30} variant="leadText">
          Edit your data
        </Typography>
        <Input
          label="Username"
          name="username"
          onChange={this.handleInputChange}
          value={username}
          leftIcon={<FaUser />}
        />
        <Box display="flex">
          <Input
            label="First name"
            name="firstName"
            onChange={this.handleInputChange}
            value={firstName}
            leftIcon={<FaRegUser />}
            mr={10}
          />
          <Input
            label="Last name"
            name="lastName"
            onChange={this.handleInputChange}
            value={lastName}
            leftIcon={<FaRegUser />}
          />
        </Box>
        <Input
          label="Email"
          name="email"
          onChange={this.handleInputChange}
          value={email}
          leftIcon={<FaEnvelope />}
        />
        <Textarea
          label="Description"
          value={description}
          onChange={this.handleInputChange}
          name="description"
          rows="5"
          leftIcon={<FaBars />}
        />
        <Box mt={20} display="flex" justifyContent="flex-end">
          <Button ml={10} variant="soft" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    );
  }
}

DataForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    semester: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    resume: PropTypes.string.isRequired
  }).isRequired
};

export default DataForm;
