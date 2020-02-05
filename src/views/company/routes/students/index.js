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
      refState: props.location.state
    };
  }

  setStudent = studentIndex => this.setState({ studentIndex, activeModal: true });

  toggleModal = activeModal => this.setState({ activeModal });

  render() {
    const { activeModal, studentIndex, refState } = this.state;
    let { Usuarios } = this.props;
    if (refState) {
      Usuarios = refState.recommended;
    }
    let action;
    if (Usuarios !== undefined) {
      action = (
        <UserDetailModal
          user={Usuarios[studentIndex]}
          active={activeModal}
          closeButton={() => this.toggleModal(false)}
        />
      );
    } else action = null;
    return (
      <Box pb={30}>
        <FilterBar isRecommendation={!!refState} jobOfferName={refState && refState.jobOfferName} />
        <Container>
          {Usuarios &&
            Usuarios.map((user, index) => {
              return (
                <StudentCard key={user.id} setStudent={() => this.setStudent(index)} user={user} />
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
