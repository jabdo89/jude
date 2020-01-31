import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '@common/modal';
import { connect } from 'react-redux';
import { createJobOfferyStudent } from '@actions/jobOfferActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
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

  handleSubmit = () => {
    const { user } = this.props;
    this.props.createJobOfferyStudent(this.state.request, user);
  };

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
          {Offers &&
            Offers.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
        </Select>
        <Button color="secondary" ml="auto" mt={10} onClick={this.handleSubmit}>
          Continue
        </Button>
      </Modal>
    );
  }
}

RequestModal.defaultProps = {
  Offers: undefined
};

RequestModal.propTypes = {
  Offers: PropTypes.arrayOf(PropTypes.object),
  active: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  toggleRequestModal: PropTypes.func.isRequired,
  createJobOfferyStudent: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    Offers: state.firestore.ordered.JobOffers,
    uid: state.firebase.auth.uid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createJobOfferyStudent: (jobOfferStudent, user) =>
      dispatch(createJobOfferyStudent(jobOfferStudent, user))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    if (props.uid === undefined) return [];
    return [
      {
        collection: 'JobOffers',
        where: ['company', '==', props.uid]
      }
    ];
  })
)(RequestModal);
