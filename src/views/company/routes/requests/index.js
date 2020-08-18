import React, { Component } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';
import Box from '@common/box';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { acceptStudentInterview, rejectStudentInterview } from '@actions/jobOfferActions';
import { firestoreConnect } from 'react-redux-firebase';
import UserDetailModal from '@templates/user-detail-modal-Request';
import confirmation from '@templates/confirmation';
import FilterBar from './components/filter-bar';
import RequestCard from './components/request-card';
import Container from './elements';

faker.locale = 'es_MX';

class RequestsView extends Component {
  state = {
    activeModal: false,
    selectedUser: {},
    selectedJobOffer: {},
    jobOfferFilter: 'any'
  };

  setUserModal = (id, sJID, request) => {
    const { activeModal } = this.state;
    const { Usuarios } = this.props;
    const usuario = Usuarios ? Usuarios[id] : null;
    if (activeModal) {
      this.setState({
        activeModal: false,
        selectedUser: {}
      });
    } else {
      this.setState({
        activeModal: true,
        selectedUser: {
          firstName: usuario.firstName,
          lastName: usuario.lastName,
          profileImg: usuario.profileImg,
          semester: usuario.semester,
          description: usuario.description,
          major: usuario.major,
          resume: usuario.resume
        },
        selectedJobOffer: {
          id: sJID,
          request
        }
      });
    }
  };

  acceptRequest = async (sJID, request) => {
    if (
      await confirmation(
        'Are you sure?',
        'Accepting this student, will begin the interviewing process',
        { text: 'CONFIRM', description: "Please, type 'CONFIRM' to confirm" }
      )
    ) {
      this.props.acceptStudentInterview(sJID, request);
    }
  };

  deleteRequest = async (jobOfferID, request) => {
    if (
      await confirmation('Are you sure?', 'This will totally discard the selected student', {
        text: 'DELETE',
        description: "Please, type 'DELETE' to confirm"
      })
    ) {
      this.props.rejectStudentInterview(jobOfferID, request);
    }
  };

  updateJobOfferFilter = filter => {
    this.setState({ jobOfferFilter: filter });
  };

  render() {
    const { selectedUser, activeModal, jobOfferFilter, selectedJobOffer } = this.state;
    const { Requests, Usuarios, JobOffers, profile, JobOffersArray } = this.props;
    return (
      <Box pb={30}>
        <FilterBar
          jobOffers={JobOffersArray}
          jobOfferFilter={jobOfferFilter}
          updateJobOfferFilter={this.updateJobOfferFilter}
        />
        <Box pb={30}>
          These are the students that are interested in your job offers and the request you sent.
          Click on interview to start chatting with them.
        </Box>
        <Container>
          {Requests &&
            Requests.map(request => {
              if (
                profile.userID === request.companyID
                // (request.status === 'requestedByStudent' || request.status === 'Interviewing')
              ) {
                if (jobOfferFilter === 'any') {
                  return (
                    <RequestCard
                      key={request.id}
                      user={Usuarios[request.studentID]}
                      jobOffer={JobOffers[request.jobOfferID]}
                      acceptRequest={() => this.acceptRequest(request.id, request)}
                      deleteRequest={() => this.deleteRequest(request.id, request)}
                      setUserModal={() => this.setUserModal(request.studentID, request.id, request)}
                      status={request.status}
                    />
                  );
                }
              }
              if (jobOfferFilter === request.jobOfferID) {
                return (
                  <RequestCard
                    key={request.id}
                    user={Usuarios[request.studentID]}
                    jobOffer={JobOffers[request.jobOfferID]}
                    acceptRequest={() => this.acceptRequest(request.id, request)}
                    deleteRequest={() => this.deleteRequest(request.id)}
                    setUserModal={() => this.setUserModal(request.studentID, request.id, request)}
                    status={request.status}
                  />
                );
              }
              return null;
            })}
          {activeModal && (
            <UserDetailModal
              user={selectedUser}
              active={activeModal}
              closeButton={this.setUserModal}
              sJID={selectedJobOffer.id}
              request={selectedJobOffer.request}
            />
          )}
        </Container>
      </Box>
    );
  }
}

RequestsView.defaultProps = {
  Requests: undefined,
  Usuarios: undefined,
  JobOffers: undefined,
  profile: undefined,
  JobOffersArray: null
};

RequestsView.propTypes = {
  Requests: PropTypes.arrayOf(PropTypes.object),
  Usuarios: PropTypes.arrayOf(PropTypes.object),
  JobOffers: PropTypes.arrayOf(PropTypes.object),
  acceptStudentInterview: PropTypes.func.isRequired,
  rejectStudentInterview: PropTypes.func.isRequired,
  profile: PropTypes.object,
  JobOffersArray: PropTypes.object
};

const mapStateToProps = state => {
  return {
    Usuarios: state.firestore.data.Usuarios,
    JobOffers: state.firestore.data.JobOffers,
    JobOffersArray: state.firestore.ordered.JobOffers,
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
        collection: 'JobOffers',
        where: ['company', '==', props.profile.userID]
      },
      { collection: 'Usuarios', where: ['rol', '==', 'Student'] },
      {
        collection: 'JobOffersyStudents'
      }
    ];
  })
)(RequestsView);
