import React, { Component } from 'react';
import { FiX } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createJobOffer } from '@actions/jobOfferActions';
import shortId from 'shortid';
import Modal from '@common/modal';
import Box from '@common/box';
import Input from '@common/input';
import Select from '@common/select';
import Textarea from '@common/textarea';
import Button from '@common/button';
import { Requirement } from './elements';

const initialState = {
  name: '',
  budget: '',
  description: '',
  requirements: [],
  requirement: '',
  studentsNeeded: '',
  majors: [],
  major: '',
  typeOfJob: ''
};

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

const locations = ['Monterrey, Nuevo Leon', 'Tampico, Tamaulipas'];

class NewOfferModal extends Component {
  state = initialState;

  addRequirement = event => {
    const { requirements, requirement } = this.state;
    if (event.key === 'Enter' && requirement) {
      event.preventDefault();
      this.setState({
        requirements: [...requirements, requirement.toUpperCase()],
        requirement: ''
      });
    }
  };

  addMajor = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value }, () => {
      const { majors, major } = this.state;
      if (major !== ' ') {
        this.setState({
          majors: [...majors, major],
          major: ''
        });
      }
    });
  };

  handleNumberChange = event => {
    // Checks for non-negative values
    if (event.target.value >= 0) {
      this.handleInputChange(event);
    }
  };

  handleScheduleDesc = ({ target: { value, name } }) =>
    this.setState(({ scheduleDesc }) => ({ scheduleDesc: { ...scheduleDesc, [name]: value } }));

  handleInputChange = ({ target: { value, name } }) => this.setState({ [name]: value });

  handleSubmit = event => {
    const { closeButton: closeModal } = this.props;
    event.preventDefault();

    this.props.createJobOffer(this.state);

    // Reset initial values
    this.setState(initialState);

    closeModal();
  };

  removeRequirement = idx =>
    this.setState(({ requirements }) => {
      requirements.splice(idx, 1);
      return {
        requirements
      };
    });

  removeMajor = idx =>
    this.setState(({ majors }) => {
      majors.splice(idx, 1);
      return {
        majors
      };
    });

  render() {
    // Add , jobOfferError to this.props
    const { active, closeButton } = this.props;
    const {
      name,
      budget,
      description,
      typeOfJob,
      // scheduleDesc,
      requirement,
      requirements,
      // studentsNeeded,
      major,
      majors,
      location
    } = this.state;

    let budgetPer;
    if (typeOfJob === 'Project') {
      budgetPer = 'Budget for the project (Mexican Pesos)';
    } else {
      budgetPer = 'Monthly budget for the offer (Mexican Pesos)';
    }

    return (
      <Modal size="large" title="Add a new offer" active={active} closeButton={closeButton}>
        <form onSubmit={this.handleSubmit}>
          <Select
            label="Type of Job Offer"
            onChange={this.handleInputChange}
            value={typeOfJob}
            name="typeOfJob"
            mr={5}
          >
            <option value="" hidden></option>
            <option value="Part Time">Part Time</option>
            <option value="Home Office">Home Office</option>
            <option value="Summer Job">Summer Job</option>
            <option value="Project">Project</option>
          </Select>
          <Input
            label="Offer name"
            required
            onChange={this.handleInputChange}
            type="text"
            value={name}
            name="name"
          />
          <Input
            label={budgetPer}
            required
            onChange={this.handleNumberChange}
            type="number"
            value={budget}
            name="budget"
          />
          <Select
            label="Majors required"
            onChange={this.addMajor}
            value={major}
            name="major"
            mr={5}
          >
            <option value="" hidden></option>
            {careers.map(day => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </Select>
          <Box mt={10} flexWrap="wrap" display="flex">
            {majors.map((req, idx) => (
              <Requirement
                key={shortId.generate()}
                mr={1}
                color="secondary"
                variant="outlined"
                mb={1}
              >
                {req}
                <FiX onClick={() => this.removeMajor(idx)} />
              </Requirement>
            ))}
          </Box>
          <Select
            label="Location"
            onChange={this.handleInputChange}
            value={location}
            name="location"
            mr={5}
          >
            <option value="" hidden></option>
            {locations.map(day => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </Select>
          <Textarea
            label="Offer description"
            required
            onChange={this.handleInputChange}
            type="text"
            value={description}
            name="description"
          />
          <Input
            label="Skills that you would prefer students to have (press enter to add each one) "
            onChange={this.handleInputChange}
            onKeyPress={this.addRequirement}
            type="text"
            value={requirement}
            name="requirement"
          />
          <Box mt={10} flexWrap="wrap" display="flex">
            {requirements.map((req, idx) => (
              <Requirement
                key={shortId.generate()}
                mr={5}
                color="secondary"
                variant="outlined"
                mb={5}
              >
                {req}
                <FiX onClick={() => this.removeRequirement(idx)} />
              </Requirement>
            ))}
          </Box>
          <Button mt={20} size="large" color="secondary" ml="auto">
            Create
          </Button>
        </form>
      </Modal>
    );
  }
}

NewOfferModal.propTypes = {
  active: PropTypes.bool.isRequired,
  closeButton: PropTypes.func.isRequired,
  createJobOffer: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    jobOfferError: state.company.jobOfferError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createJobOffer: student => dispatch(createJobOffer(student))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOfferModal);
