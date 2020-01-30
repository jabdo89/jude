import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '@common/modal';
import faker from 'faker';
import Select from '@common/select';
import Button from '@common/button';

class RequestModal extends Component {
  state = {
    request: ''
  };

  handleInputChange = ({ target: { name, value } }) =>
    this.setState({
      [name]: value
    });

  render() {
    const { active, toggleRequestModal, Offers } = this.props;
    const { request } = this.state;
    return (
      <Modal active={active} closeButton={toggleRequestModal}>
        <Select
          label="Select a job offer to request this student"
          value={request}
          name="request"
          onChange={this.handleInputChange}
        >
          <option value="" hidden>
            Select a job offer
          </option>
          {Offers.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Select>
        <Button color="secondary" ml="auto" mt={10}>
          Continue
        </Button>
      </Modal>
    );
  }
}

RequestModal.defaultProps = {
  Offers: new Array(10).fill().map(() => ({
    id: faker.random.uuid(),
    name: faker.name.jobTitle()
  }))
};

RequestModal.propTypes = {
  Offers: PropTypes.arrayOf(PropTypes.object),
  active: PropTypes.bool.isRequired,
  toggleRequestModal: PropTypes.func.isRequired
};

export default RequestModal;
