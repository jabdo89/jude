import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import faker from 'faker';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Box from '@common/box';
import UserDetailModal from '@templates/user-detail-modal';
import Container from './elements';
import StudentCard from './components/student-card';
import FilterBar from './components/filter-bar';

faker.locale = 'es_MX';

class Company extends Component {
  state = {
    activeModal: false,
    studentIndex: 0
  };

  setStudent = studentIndex => this.setState({ studentIndex, activeModal: true });

  toggleModal = activeModal => this.setState({ activeModal });

  render() {
    const { activeModal, studentIndex } = this.state;
    const { Usuarios } = this.props;

    return (
      <Box pb={30}>
        <FilterBar />
        <Container>
          {Usuarios &&
            Usuarios.map((user, index) => (
              <StudentCard key={user.id} setStudent={() => this.setStudent(index)} user={user} />
            ))}
        </Container>
        <UserDetailModal
          user={Usuarios[studentIndex]}
          active={activeModal}
          closeButton={() => this.toggleModal(false)}
        />
      </Box>
    );
  }
}

Company.defaultProps = {
  Usuarios: new Array(10).fill().map(() => ({
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    profileImg: faker.image.avatar(),
    semester: Math.round(Math.random() * 9) + 1,
    description: faker.lorem.paragraph(),
    major: Math.random() > 0.5 ? 'ITC' : 'INT',
    resume: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }))
};

Company.propTypes = {
  Usuarios: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => {
  return {
    // Usuarios: state.firestore.ordered.Usuarios,
    Usuarios: undefined,
    profile: state.firebase.profile
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'Usuarios' }])
)(Company);
