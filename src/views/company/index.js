import React, { Component } from 'react';
import { connect } from 'react-redux';
import faker from 'faker';
import DashboardLayout from '@layouts/dashboard';
import Modal from '@common/modal';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Container from './elements';
import StudentCard from './components/student-card/index';

faker.locale = 'es_MX';

// This should be populated with the students real model
const students = [];
for (let i = 0; i < 10; i++) {
  students.push({
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    profileImg: faker.image.avatar(),
    semester: Math.round(Math.random() * 9) + 1,
    description: faker.lorem.paragraph(),
    major: Math.random() > 0.5 ? 'ITC' : 'INT',
    resume: 'https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf'
  });
}

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
          {/* {students.map(
            ({ id, firstName, lastName, profileImg, semester, description, major }, index) => (
              <StudentCard
                index={index}
                setStudent={this.setStudent}
                key={id}
                firstName={firstName}
                lastName={lastName}
                profileImg={profileImg}
                semester={semester}
                description={description}
                major={major}
              />
            )
          )} */}
          {Usuarios &&
            Usuarios.map(usuario => {
              return <StudentCard usuario={usuario} key={usuario.id} />;
            })}
        </Container>
        <Modal
          size="large"
          title={`${students[studentIndex].firstName} ${students[studentIndex].lastName}`}
          active={activeModal}
          closeButton={() => this.toggleModal(false)}
        >
          {studentIndex}
        </Modal>
      </DashboardLayout>
    );
  }
}

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
