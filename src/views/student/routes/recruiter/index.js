import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@common/box';
import UserDetailModal from '@templates/recruiter-detail-modal';
import Messages from './components/messages';
import Container from './elements';
import StudentCard from './components/student-card';

// import FilterBar from './components/filter-bar';

const Recruiter = ({ profile }) => {
  const [state, setState] = useState({
    activeModal: false,
    studentIndex: 0
  });

  const [Recruiters, setRecruiters] = useState([]);

  const setStudent = studentIndex => setState({ studentIndex, activeModal: true });

  // updateMajorFilter = filter => this.setState({ majorFilter: filter });

  const toggleModal = activeModal => setState({ activeModal });

  let action;

  if (Recruiters !== undefined && Recruiters[state.studentIndex] !== undefined) {
    action = (
      <UserDetailModal
        user={Recruiters[state.studentIndex]}
        active={state.activeModal}
        closeButton={() => toggleModal(false)}
      />
    );
  } else action = null;

  useEffect(() => {
    const db = firebase.firestore();

    const query = () => {
      db.collection('Usuarios')
        .where('rol', '==', 'Recruiter')
        // eslint-disable-next-line func-names
        .onSnapshot(function(querySnapshot) {
          const info = [];
          // eslint-disable-next-line func-names
          querySnapshot.forEach(function(doc) {
            info.push(doc.data());
          });
          setRecruiters(info);
        });
    };
    query();
  }, []);
  if (profile.recruiterID == null || profile.recruiterID === '') {
    return (
      <Box pb={30}>
        {/* <FilterBar
          isRecommendation={!!refState}
          jobOfferName={refState && refState.jobOfferName}
          semesterFilterUpdate={this.updateSemesterFilter}
          majorFilterUpdate={this.updateMajorFilter}
          semesterValue={semesterFilter}
          majorValue={majorFilter}
        /> */}
        <Box pb={30}>
          By requesting a student you let them know you are interested in interviewing them.
        </Box>
        <Container>
          {Recruiters &&
            Recruiters.map((user, index) => {
              return <StudentCard key={user.id} setStudent={() => setStudent(index)} user={user} />;
            })}
        </Container>
        {action}
      </Box>
    );
  }
  return <Messages />;
};

Recruiter.defaultProps = {
  profile: undefined
};

Recruiter.propTypes = {
  profile: PropTypes.object
};

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Recruiter);
