import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import faker from 'faker';
import DashboardLayout from '@layouts/dashboard';
import Modal from '@common/modal';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Container from './elements';
import StudentCard from './components/student-card/index';

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
      <DashboardLayout>
        <Container>
          {Usuarios &&
            Usuarios.map((usuario, index) => (
              <StudentCard setStudent={this.setStudent} index={index} usuario={usuario} />
            ))}
        </Container>
        <Modal
          size="large"
          title={`${Usuarios[studentIndex].firstsName} ${Usuarios[studentIndex].lastName}`}
          active={activeModal}
          closeButton={() => this.toggleModal(false)}
        >
          {studentIndex}
        </Modal>
      </DashboardLayout>
    );
  }
}

Company.defaultProps = {
  // eslint-disable-next-line no-array-constructor
  Usuarios: new Array(10, '').map(() => ({
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    profileImg: faker.image.avatar(),
    semester: Math.round(Math.random() * 9) + 1,
    description: faker.lorem.paragraph(),
    major: Math.random() > 0.5 ? 'ITC' : 'INT',
    resume: 'https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf'
  }))
};

Company.propTypes = {
  Usuarios: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => {
  return {
    Usuarios: state.firestore.ordered.Usuarios,
    profile: state.firebase.profile
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'JobOffers' }, { collection: 'Usuarios' }])
)(Company);
