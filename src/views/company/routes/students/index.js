import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import faker from 'faker';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Box from '@common/box';
import UserDetailModal from '@templates/user-detail-modal';
import Container from './elements';
import StudentCard from './components/student-card';
import FilterBar from './components/filter-bar';

faker.locale = 'es_MX';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: false,
      studentIndex: 0,
      refState: props.location.state,
      semesterFilter: 'any',
      majorFilter: 'any'
    };
  }

  setStudent = studentIndex => this.setState({ studentIndex, activeModal: true });

  updateMajorFilter = filter => this.setState({ majorFilter: filter });

  toggleModal = activeModal => this.setState({ activeModal });

  updateSemesterFilter = filter => {
    this.setState({ semesterFilter: filter });
  };

  checkRecomended = (usuario, recommendedArray) => {
    for (let i = 0; i < 5; i++) {
      // console.log(recommendedArray[i].userID.userID);
      if (usuario.userID === recommendedArray[i].userID.userID) {
        return true;
      }
    }
    return false;
  };

  render() {
    const { activeModal, studentIndex, refState, semesterFilter, majorFilter } = this.state;
    let { Usuarios } = this.props;
    // let recommendedArray;
    if (refState) {
      // console.log(refState.recommended);
      // recommendedArray = refState.recommended;
      Usuarios = refState.recommended.data.slice(0, 5);
    }
    let action;
    if (Usuarios !== undefined && Usuarios[studentIndex] !== undefined) {
      action = (
        <UserDetailModal
          user={Usuarios[studentIndex]}
          active={activeModal}
          closeButton={() => this.toggleModal(false)}
        />
      );
    } else action = null;
    // console.log(semesterFilter);
    return (
      <Box pb={30}>
        <FilterBar
          isRecommendation={!!refState}
          jobOfferName={refState && refState.jobOfferName}
          semesterFilterUpdate={this.updateSemesterFilter}
          majorFilterUpdate={this.updateMajorFilter}
          semesterValue={semesterFilter}
          majorValue={majorFilter}
        />
        <Box pb={30}>
          By requesting a student you let them know you are interested in interviewing them.
        </Box>
        <Container>
          {Usuarios &&
            Usuarios.map((user, index) => {
              if (!refState) {
                if (semesterFilter === 'any' && majorFilter === 'any' && user.rol === 'Student') {
                  return (
                    <StudentCard
                      key={user.id}
                      setStudent={() => this.setStudent(index)}
                      user={user}
                    />
                  );
                }
                if (semesterFilter !== 'any' && majorFilter === 'any' && user.rol === 'Student') {
                  if (user.semester === semesterFilter) {
                    return (
                      <StudentCard
                        key={user.id}
                        setStudent={() => this.setStudent(index)}
                        user={user}
                      />
                    );
                  }
                  return null;
                }
                if (semesterFilter === 'any' && majorFilter !== 'any') {
                  if (user.major === majorFilter && user.rol === 'Student') {
                    return (
                      <StudentCard
                        key={user.id}
                        setStudent={() => this.setStudent(index)}
                        user={user}
                      />
                    );
                  }
                  return null;
                }
                if (semesterFilter !== 'any' && majorFilter !== 'any') {
                  if (
                    user.major === majorFilter &&
                    user.semester === semesterFilter &&
                    user.rol === 'Student'
                  ) {
                    return (
                      <StudentCard
                        key={user.id}
                        setStudent={() => this.setStudent(index)}
                        user={user}
                      />
                    );
                  }
                  return null;
                }
                return null;
              }
              // if (this.checkRecomended(user.id, recommendedArray.data)) {
              //   console.log(user);
              //   return (
              //     <StudentCard
              //       key={user.id}
              //       setStudent={() => this.setStudent(index)}
              //       user={user}
              //     />
              //   );
              // }
              // return null;
              return (
                <StudentCard
                  key={user.id}
                  setStudent={() => this.setStudent(index)}
                  user={user.userID}
                />
              );
            })}
        </Container>
        {action}
      </Box>
    );
  }
}

Company.defaultProps = {
  Usuarios: undefined
};

Company.propTypes = {
  Usuarios: PropTypes.arrayOf(PropTypes.object),
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    Usuarios: state.firestore.ordered.Usuarios,
    profile: state.firebase.profile
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: 'Usuarios', where: ['rol', '==', 'Student'] }])
  )(Company)
);
