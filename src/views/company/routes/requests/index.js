import React, { Component } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';
import Box from '@common/box';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { acceptStudentInterview, rejectStudentInterview } from '@actions/jobOfferActions';
import { firestoreConnect } from 'react-redux-firebase';
import UserDetailModal from '@templates/user-detail-modal';
import confirmation from '@templates/confirmation';
import FilterBar from './components/filter-bar';
import RequestCard from './components/request-card';
import Container from './elements';

faker.locale = 'es_MX';

class RequestsView extends Component {
  state = {
    activeModal: false,
    selectedUser: {},
    jobOfferFilter: 'any'
  };

  setUserModal = id => {
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
          resume: usuario.curriculumPDF
        }
      });
    }
  };

  acceptRequest = async (sJID, jobOfferID) => {
    if (
      await confirmation(
        'Are you sure?',
        'Accepting this student, will begin the interviewing process',
        { text: 'CONFIRM', description: "Please, type 'CONFIRM' to confirm" }
      )
    ) {
      this.props.acceptStudentInterview(sJID, jobOfferID);
    }
  };

  deleteRequest = async jobOfferID => {
    if (
      await confirmation('Are you sure?', 'This will totally discard the selected student', {
        text: 'DELETE',
        description: "Please, type 'DELETE' to confirm"
      })
    ) {
      this.props.rejectStudentInterview(jobOfferID);
    }
  };

  updateJobOfferFilter = filter => {
    this.setState({ jobOfferFilter: filter });
  };

  render() {
    const { selectedUser, activeModal, jobOfferFilter } = this.state;
    const { Requests, Usuarios, JobOffers, profile, JobOffersArray } = this.props;
    return (
      <Box pb={30}>
        <FilterBar
          jobOffers={JobOffersArray}
          jobOfferFilter={jobOfferFilter}
          updateJobOfferFilter={this.updateJobOfferFilter}
        />
        <Container>
          {Requests &&
            Requests.map(request => {
              if (profile.userID === request.companyID && request.status === 'requestedByStudent') {
                if (jobOfferFilter === 'any') {
                  return (
                    <RequestCard
                      key={request.id}
                      user={Usuarios[request.studentID]}
                      jobOffer={JobOffers[request.jobOfferID]}
                      acceptRequest={() => this.acceptRequest(request.id, request.jobOfferID)}
                      deleteRequest={() => this.deleteRequest(request.id)}
                      setUserModal={() => this.setUserModal(request.studentID)}
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
                    acceptRequest={() => this.acceptRequest(request.id, request.jobOfferID)}
                    deleteRequest={() => this.deleteRequest(request.id)}
                    setUserModal={() => this.setUserModal(request.studentID)}
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
    rejectStudentInterview: jobOfferID => dispatch(rejectStudentInterview(jobOfferID))
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
        collection: 'JobOffersyStudents',
        where: ['status', '==', 'requestedByStudent']
      }
    ];
  })
)(RequestsView);
