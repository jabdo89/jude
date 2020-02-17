import React, { Component } from 'react';
import { FiX } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editJobOffer } from '@actions/jobOfferActions';
import shortId from 'shortid';
import Modal from '@common/modal';
import Box from '@common/box';
import Input from '@common/input';
import Select from '@common/select';
import Textarea from '@common/textarea';
import Button from '@common/button';
import { Row, Requirement } from './elements';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

class NewOfferModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.offerToEdit.id,
      name: props.offerToEdit.name,
      budget: props.offerToEdit.budget.replace(',', ''),
      description: props.offerToEdit.description,
      scheduleDesc: props.offerToEdit.scheduleDesc,
      requirements: props.offerToEdit.requirements,
      requirement: '',
      studentsNeeded: ''
    };
  }

  addRequirement = event => {
    const { requirements, requirement } = this.state;
    if (event.key === 'Enter' && requirement) {
      event.preventDefault();
      this.setState({
        requirements: [...requirements, requirement],
        requirement: ''
      });
    }
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

    this.props.editJobOffer(this.state);

    closeModal();
  };

  removeRequirement = idx =>
    this.setState(({ requirements }) => {
      requirements.splice(idx, 1);
      return {
        requirements
      };
    });

  render() {
    const { active, closeButton } = this.props;
    const {
      name,
      budget,
      description,
      scheduleDesc,
      requirement,
      requirements,
      studentsNeeded,
      major
    } = this.state;
    return (
      <Modal size="large" title="Edit offer" active={active} closeButton={closeButton}>
        <form onSubmit={this.handleSubmit}>
          <Input
            label="Offer name"
            required
            onChange={this.handleInputChange}
            type="text"
            value={name}
            disabled
            name="name"
          />
          <Input
            label="Monthly budget for the offer"
            required
            onChange={this.handleNumberChange}
            type="number"
            value={budget}
            disabled
            name="budget"
          />
          <Input
            label="Major required"
            required
            disabled
            onChange={this.handleInputChange}
            type="text"
            value={major}
            name="major"
          />
          <Input
            label="Students needed to cover the offer"
            required
            onChange={this.handleNumberChange}
            type="number"
            value={studentsNeeded}
            disabled
            name="studentsNeeded"
          />
          <Textarea
            label="Offer description"
            required
            onChange={this.handleInputChange}
            type="text"
            value={description}
            disabled
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
            Edit
          </Button>
        </form>
      </Modal>
    );
  }
}

NewOfferModal.propTypes = {
  active: PropTypes.bool.isRequired,
  closeButton: PropTypes.func.isRequired,
  editJobOffer: PropTypes.func.isRequired,
  offerToEdit: PropTypes.shape({
    name: PropTypes.string,
    budget: PropTypes.string,
    description: PropTypes.string,
    scheduleDesc: PropTypes.object,
    id: PropTypes.string,
    requirements: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    editJobOffer: newJobOffer => dispatch(editJobOffer(newJobOffer))
  };
};

export default connect(null, mapDispatchToProps)(NewOfferModal);
