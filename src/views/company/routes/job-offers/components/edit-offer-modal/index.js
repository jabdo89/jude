import React, { Component } from 'react';
import { FiX } from 'react-icons/fi';
import PropTypes from 'prop-types';
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
      name: props.offerToEdit.name,
      budget: props.offerToEdit.budget,
      description: props.offerToEdit.description,
      scheduleDesc: props.offerToEdit.scheduleDesc,
      requirements: props.offerToEdit.requirements,
      requirement: ''
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

  handleBudgetChange = event => {
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

    /*
     Handle job offer creation here
    */

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
    const { name, budget, description, scheduleDesc, requirement, requirements } = this.state;
    return (
      <Modal size="large" title="Edit offer" active={active} closeButton={closeButton}>
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
            onChange={this.handleBudgetChange}
            type="number"
            value={budget}
            name="budget"
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
              label="Week starts at"
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
            required
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
  offerToEdit: PropTypes.shape({
    name: PropTypes.string,
    budget: PropTypes.string,
    description: PropTypes.string,
    scheduleDesc: PropTypes.object,
    requirements: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default NewOfferModal;
