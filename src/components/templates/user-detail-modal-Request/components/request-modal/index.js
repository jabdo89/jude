import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '@common/modal';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { createJobOfferyStudent, clearRequestCompany } from '@actions/jobOfferActions';
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
    const { user, toggleRequestModal, OffersObj } = this.props;
    const { request } = this.state;
    this.props.createJobOfferyStudent(this.state.request, user, OffersObj[request]);
    toggleRequestModal();
  };

  render() {
    const { active, toggleRequestModal, Offers, requestErrorCompany } = this.props;
    const { request } = this.state;
    if (requestErrorCompany === 'REQUESTED_SUCCESFULLY') {
      NotificationManager.success('You will be notified if accepted', 'Requested Succesfully!');
      this.props.clearRequestCompany(request);
    }
    if (requestErrorCompany === 'ALREADY_EXISTS') {
      NotificationManager.warning(
        'You will be notified if accepted',
        'Job Offer Already Requested'
      );
      this.props.clearRequestCompany(request);
    }
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
  Offers: undefined,
  OffersObj: undefined
};

RequestModal.propTypes = {
  Offers: PropTypes.arrayOf(PropTypes.object),
  active: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  toggleRequestModal: PropTypes.func.isRequired,
  createJobOfferyStudent: PropTypes.func.isRequired,
  requestErrorCompany: PropTypes.string.isRequired,
  clearRequestCompany: PropTypes.func.isRequired,
  OffersObj: PropTypes.object
};

const mapStateToProps = state => {
  return {
    Offers: state.firestore.ordered.JobOffers,
    OffersObj: state.firestore.data.JobOffers,
    uid: state.firebase.auth.uid,
    requestErrorCompany: state.student.requestErrorCompany
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createJobOfferyStudent: (jobOfferStudent, user, jobOffer) =>
      dispatch(createJobOfferyStudent(jobOfferStudent, user, jobOffer)),
    clearRequestCompany: activity => dispatch(clearRequestCompany(activity))
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
