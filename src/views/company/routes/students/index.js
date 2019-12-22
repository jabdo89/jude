import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import faker from 'faker';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Container from './elements';
import StudentCard from './components/student-card';
import FilterBar from './components/filter-bar';
import DetailModal from './components/detail-modal';

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
      <Fragment>
        <FilterBar />
        <Container>
          {Usuarios &&
            Usuarios.map((user, index) => (
              <StudentCard key={user.id} setStudent={this.setStudent} index={index} user={user} />
            ))}
        </Container>
        <DetailModal
          user={Usuarios[studentIndex]}
          active={activeModal}
          closeButton={() => this.toggleModal(false)}
        />
      </Fragment>
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
    resume:
      'https://blockdemy-certs-dev.s3.amazonaws.com/certificates/5d8a8d6f019dfe7f4a2b4bec/1569361263350.pdf'
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
  firestoreConnect([{ collection: 'JobOffers' }, { collection: 'Usuarios' }])
)(Company);
