import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { editProfile } from '@actions/recruiterActions';
import { connect } from 'react-redux';
import shortId from 'shortid';
import Typography from '@common/typography';
import Select from '@common/select';
import Box from '@common/box';
import Button from '@common/button';
import { FiX } from 'react-icons/fi';
import Textarea from '@common/textarea';
import { FaEnvelope, FaBars, FaRegUser } from 'react-icons/fa';
import Input from '@common/input';
import Skill from './elements';

class DataForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      email: props.user.email,
      description: props.user.description,
      areas: props.user.areas,
      major: ''
    };
  }

  handleInputChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  editProfile = () => {
    this.props.editProfile(this.state);
  };

  addMajor = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value }, () => {
      const { areas, major } = this.state;
      if (major !== ' ') {
        if (!areas.includes(major)) {
          this.setState({
            areas: [...areas, major],
            major: ''
          });
        } else {
          this.setState({
            major: ''
          });
        }
      }
    });
  };

  removeMajor = idx =>
    this.setState(({ areas }) => {
      areas.splice(idx, 1);
      return {
        areas
      };
    });

  render() {
    const { firstName, lastName, email, description, areas, major } = this.state;
    const careers = [
      'Accounting',
      'Business & Technology',
      'Business Administration',
      'Computer Science',
      'Chemical Engineer',
      'Economics',
      'Finance',
      'Graphic Designer',
      'Lawyer',
      'Marketing',
      'Mechanical Engineer',
      'Mechatronic Engineer',
      'Demo'
    ];
    return (
      <Box mt={20} px={20}>
        <Typography mb={30} variant="leadText">
          Edit your data
        </Typography>
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
          disabled
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
        <Select
          label="Add major of students you can help place"
          onChange={this.addMajor}
          value={major}
          name="major"
        >
          <option value="" hidden></option>
          {careers.map(day => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </Select>
        <Box mt={10} flexWrap="wrap" display="flex">
          {areas &&
            areas.map((req, idx) => (
              <Skill key={shortId.generate()} mr={5} color="secondary" variant="outlined" mb={5}>
                {req}
                <FiX onClick={() => this.removeMajor(idx)} />
              </Skill>
            ))}
        </Box>
        <Box mt={20} display="flex" justifyContent="flex-end">
          <Button ml={10} variant="soft" color="primary" onClick={this.editProfile}>
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
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    semester: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    areas: PropTypes.array.isRequired
  }).isRequired,
  editProfile: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    editProfile: profile => dispatch(editProfile(profile))
  };
};

export default connect(null, mapDispatchToProps)(DataForm);
