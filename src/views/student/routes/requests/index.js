import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { acceptStudentInterview, rejectStudentInterview } from '@actions/jobOfferActions';
import Box from '@common/box';
import confirmation from '@templates/confirmation';
// import FilterBar from './components/filter-bar';
import RequestCard from './components/request-card';
import Container from './elements';

class RequestsView extends Component {
  acceptRequest = async (sJID, request) => {
    if (
      await confirmation(
        'Are you sure?',
        'Accepting this offer, will begin the interviewing process',
        {
          text: 'CONFIRM',
          description: "Please, type 'CONFIRM' to confirm"
        }
      )
    ) {
      this.props.acceptStudentInterview(sJID, request);
    }
  };

  deleteRequest = async (jobOfferID, request) => {
    if (
      await confirmation('Are you sure?', 'This will totally discard the selected offer', {
        text: 'DELETE',
        description: "Please, type 'DELETE' to confirm"
      })
    ) {
      this.props.rejectStudentInterview(jobOfferID, request);
    }
  };

  render() {
    const { Requests, JobOffers, profile, Usuarios } = this.props;
    return (
      <Box pb={30}>
        {/* <FilterBar /> */}
        <Container>
          {Requests &&
            Requests.map(request => {
              if (request.status === 'requestedByCompany' && request.studentID === profile.userID) {
                return (
                  <RequestCard
                    key={request.id}
                    request={JobOffers[request.jobOfferID]}
                    acceptRequest={() => this.acceptRequest(request.id, request)}
                    deleteRequest={() => this.deleteRequest(request.id, request)}
                    company={Usuarios[request.companyID]}
                  />
                );
              }
              return null;
            })}
        </Container>
      </Box>
    );
  }
}

RequestsView.defaultProps = {
  Requests: undefined,
  JobOffers: undefined,
  profile: undefined,
  Usuarios: undefined
};

RequestsView.propTypes = {
  Requests: PropTypes.arrayOf(PropTypes.object),
  JobOffers: PropTypes.arrayOf(PropTypes.object),
  profile: PropTypes.arrayOf(PropTypes.object),
  acceptStudentInterview: PropTypes.func.isRequired,
  rejectStudentInterview: PropTypes.func.isRequired,
  Usuarios: PropTypes.objectOf(PropTypes.object)
};
const mapStateToProps = state => {
  return {
    Usuarios: state.firestore.data.Usuarios,
    JobOffers: state.firestore.data.JobOffers,
    Requests: state.firestore.ordered.JobOffersyStudents,
    profile: state.firebase.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    acceptStudentInterview: (sJID, jobOfferID) =>
      dispatch(acceptStudentInterview(sJID, jobOfferID)),
    rejectStudentInterview: (jobOfferID, request) =>
      dispatch(rejectStudentInterview(jobOfferID, request))
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: 'JobOffers'
      },
      { collection: 'Usuarios' },
      {
        collection: 'JobOffersyStudents',
        where: [
          ['status', '==', 'requestedByCompany'],
          ['studentID', '==', props.profile.userID]
        ]
      }
    ];
  })
)(RequestsView);
