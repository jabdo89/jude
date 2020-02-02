import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '@common/modal';
import Typography from '@common/typography';
import Box from '@common/box';
import Button from '@common/button';
import Textarea from '@common/textarea';
import Dropzone from '@templates/dropzone';
import { FaUser, FaEnvelope, FaBars, FaRegUser, FaGraduationCap, FaHashtag } from 'react-icons/fa';
import Input from '@common/input';

class DataForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.user.username,
      firstName: props.user.firstName,
      email: props.user.email,
      lastName: props.user.lastName,
      semester: props.user.semester.toString(),
      description: props.user.description,
      major: props.user.major,
      showResumeModal: false
    };
  }

  toggleResumeModal = () =>
    this.setState(({ showResumeModal }) => ({ showResumeModal: !showResumeModal }));

  // eslint-disable-next-line no-unused-vars
  setFile = file => {
    // handleFile
  };

  handleInputChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  render() {
    const {
      username,
      firstName,
      lastName,
      email,
      semester,
      description,
      major,
      showResumeModal
    } = this.state;
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
        <Box display="flex">
          <Input
            label="Major"
            name="major"
            onChange={this.handleInputChange}
            value={major}
            leftIcon={<FaGraduationCap />}
            mr={10}
          />
          <Input
            label="Semester"
            name="semester"
            type="number"
            onChange={this.handleInputChange}
            value={semester}
            leftIcon={<FaHashtag />}
          />
        </Box>
        <Textarea
          label="Description"
          value={description}
          onChange={this.handleInputChange}
          name="description"
          rows="5"
          leftIcon={<FaBars />}
        />
        <Box mt={20} display="flex" justifyContent="flex-end">
          <Button onClick={this.toggleResumeModal} variant="soft" color="secondary">
            Change resume
          </Button>
          <Button ml={10} variant="soft" color="primary">
            Save
          </Button>
        </Box>
        <Modal
          active={showResumeModal}
          title="Cambiar foto de perfil"
          closeButton={this.toggleResumeModal}
          primaryColor="primary"
        >
          <Dropzone
            accept="application/pdf"
            defaultMessage="Drop your resume here"
            acceptMessage="Drop here"
            rejectMessage="Only PDF is supported"
            setFile={this.setFile}
            maxSize={5000000}
          />
        </Modal>
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