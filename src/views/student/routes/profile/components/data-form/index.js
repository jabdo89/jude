import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { updateCurriculum } from '@actions/authActions';
import { editProfile } from '@actions/jobOfferActions';
import shortId from 'shortid';
import Modal from '@common/modal';
import Typography from '@common/typography';
import Box from '@common/box';
import Button from '@common/button';
import Textarea from '@common/textarea';
import Dropzone from '@templates/dropzone';
import { FaEnvelope, FaBars, FaRegUser, FaGraduationCap, FaHashtag } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import Input from '@common/input';
import Skill from './elements';

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
      showResumeModal: false,
      skills: props.user.skills,
      skill: '',
      resume: '',
      url: ''
    };
  }

  updateResume = () => {
    const { user } = this.props;
    const { resume } = this.state;
    const storage = firebase.storage();
    const uploadTaskPDF = storage.ref(`curriculums/${user.email}`).put(resume);
    uploadTaskPDF.on(
      'state_changed',
      snapshot => {
        // progress function ...
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // eslint-disable-next-line react/no-unused-state
        this.setState({ progress });
      },
      error => {
        // Error function ...
        console.error(error);
      },
      () => {
        // complete function ...
        storage
          .ref('curriculums')
          .child(user.email)
          .getDownloadURL()
          .then(url => {
            // eslint-disable-next-line react/no-unused-state
            this.setState({ url });
            this.props.updateCurriculum(url, user.userID);
            this.setState({
              resume: '',
              showResumeModal: false
            });
          });
      }
    );
  };

  toggleResumeModal = () =>
    this.setState(({ showResumeModal }) => ({ showResumeModal: !showResumeModal }));

  // eslint-disable-next-line no-unused-vars
  setFile = file => {
    this.setState({
      resume: file
    });
  };

  handleInputChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  addSkill = event => {
    const { skills, skill } = this.state;
    if (event.key === 'Enter' && skill) {
      event.preventDefault();
      this.setState({
        skills: [...skills, skill.toUpperCase()],
        skill: ''
      });
    }
  };

  removeSkill = idx =>
    this.setState(({ skills }) => {
      skills.splice(idx, 1);
      return {
        skills
      };
    });

  editProfile = () => {
    this.props.editProfile(this.state);
  };

  render() {
    const {
      // username,
      firstName,
      lastName,
      email,
      semester,
      description,
      major,
      showResumeModal,
      skills,
      skill,
      resume
    } = this.state;
    return (
      <Box mt={20} px={20}>
        <Typography mb={30} variant="leadText">
          Edit your data
        </Typography>
        {/* <Input
          label="Username"
          name="username"
          onChange={this.handleInputChange}
          value={username}
          leftIcon={<FaUser />}
        /> */}
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
        <Box display="flex">
          <Input
            label="Major"
            name="major"
            onChange={this.handleInputChange}
            value={major}
            disabled
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
        <Input
          label="Skills (press enter to add)"
          onChange={this.handleInputChange}
          onKeyPress={this.addSkill}
          type="text"
          value={skill}
          name="skill"
        />
        <Box mt={10} flexWrap="wrap" display="flex">
          {skills &&
            skills.map((req, idx) => (
              <Skill key={shortId.generate()} mr={5} color="secondary" variant="outlined" mb={5}>
                {req}
                <FiX onClick={() => this.removeSkill(idx)} />
              </Skill>
            ))}
        </Box>
        <Box mt={20} display="flex" justifyContent="flex-end">
          <Button onClick={this.toggleResumeModal} variant="soft" color="secondary">
            Change resume
          </Button>
          <Button ml={10} variant="soft" color="primary" onClick={this.editProfile}>
            Save
          </Button>
        </Box>
        <Modal
          active={showResumeModal}
          title="Change Curriculum"
          closeButton={this.toggleResumeModal}
          primaryColor="primary"
        >
          <Dropzone
            accept="application/pdf"
            defaultMessage="Drop your resume here"
            acceptMessage="Drop here"
            rejectMessage="Only PDF is supported"
            setFile={this.setFile}
            file={resume}
            maxSize={5000000}
          />
          <Button onClick={this.updateResume} variant="hard" color="primary">
            Change resume
          </Button>
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
    userID: PropTypes.string,
    email: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    semester: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    resume: PropTypes.string.isRequired,
    skills: PropTypes.array.isRequired
  }).isRequired,
  editProfile: PropTypes.func.isRequired,
  updateCurriculum: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    editProfile: profile => dispatch(editProfile(profile)),
    updateCurriculum: (url, user) => dispatch(updateCurriculum(url, user))
  };
};

export default connect(null, mapDispatchToProps)(DataForm);
