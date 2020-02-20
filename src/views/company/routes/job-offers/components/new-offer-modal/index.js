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
import { Row, Requirement } from './elements';

const initialState = {
  name: '',
  budget: '',
  description: '',
  scheduleDesc: {
    weekStart: '',
    weekEnd: '',
    startHour: '',
    endHour: ''
  },
  requirements: [],
  requirement: '',
  studentsNeeded: '',
  majors: [],
  major: ''
};

const weekDays = [
  'Flexible',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const careers = ['Computer Science', 'Business & Technology'];
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
      scheduleDesc,
      requirement,
      requirements,
      studentsNeeded,
      major,
      majors
    } = this.state;
    return (
      <Modal size="large" title="Add a new offer" active={active} closeButton={closeButton}>
        <form onSubmit={this.handleSubmit}>
          <Input
            label="Offer name"
            required
            onChange={this.handleInputChange}
            type="text"
            value={name}
            name="name"
          />
          <Input
            label="Monthly budget for the offer"
            required
            onChange={this.handleNumberChange}
            type="number"
            value={budget}
            name="budget"
          />
          <Select
            label="Majors required (Press enter to add)"
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
          <Input
            label="Students needed to cover the offer"
            required
            onChange={this.handleNumberChange}
            type="number"
            value={studentsNeeded}
            name="studentsNeeded"
          />
          <Textarea
            label="Offer description"
            required
            onChange={this.handleInputChange}
            type="text"
            value={description}
            name="description"
          />
          <Row>
            <Select
              label="Week starts at"
              required
              onChange={this.handleScheduleDesc}
              value={scheduleDesc.weekStart}
              name="weekStart"
              mr={5}
            >
              <option value="" hidden></option>
              {weekDays.map(day => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </Select>
            <Select
              label="Week ends at"
              required
              onChange={this.handleScheduleDesc}
              value={scheduleDesc.weekEnd}
              name="weekEnd"
            >
              <option value="" hidden></option>
              {weekDays.map(day => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </Select>
          </Row>
          <Row>
            <Input
              label="From"
              required
              onChange={this.handleScheduleDesc}
              value={scheduleDesc.startHour}
              name="startHour"
              type="time"
              mr={5}
            />
            <Input
              label="To"
              required
              onChange={this.handleScheduleDesc}
              value={scheduleDesc.endHour}
              type="time"
              name="endHour"
            />
          </Row>
          <Input
            label="Requirements (press enter to add)"
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
