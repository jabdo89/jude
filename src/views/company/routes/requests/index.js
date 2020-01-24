import React, { Component } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';
import Box from '@common/box';
import UserDetailModal from '@templates/user-detail-modal';
import confirmation from '@templates/confirmation';
import FilterBar from './components/filter-bar';
import RequestCard from './components/request-card';
import Container from './elements';

faker.locale = 'es_MX';

class RequestsView extends Component {
  state = {
    activeModal: false,
    selectedUser: {}
  };

  setUserModal = idx => {
    const { activeModal } = this.state;
    const { Requests } = this.props;
    if (activeModal) {
      this.setState({
        activeModal: false,
        selectedUser: {}
      });
    } else {
      const {
        studentFirstName,
        studentLastName,
        studentProfileImg,
        studentDesc,
        semester,
        major,
        curriculumPdf
      } = Requests[idx];

      this.setState({
        activeModal: true,
        selectedUser: {
          firstName: studentFirstName,
          lastName: studentLastName,
          profileImg: studentProfileImg,
          semester,
          description: studentDesc,
          major,
          resume: curriculumPdf
        }
      });
    }
  };

  acceptRequest = async () => {
    if (
      await confirmation(
        'Are you sure?',
        'The applicant will be notified after accepting its request',
        { text: 'CONFIRM', description: "Please, type 'CONFIRM' to confirm" }
      )
    ) {
      /*
        Handle request acceptance here
      */
    }
  };

  deleteRequest = async () => {
    if (
      await confirmation('Are you sure?', 'This will totally discard the selected student', {
        text: 'DELETE',
        description: "Please, type 'DELETE' to confirm"
      })
    ) {
      /*
        Handle request deletion here
      */
    }
  };

  render() {
    const { selectedUser, activeModal } = this.state;
    const { Requests } = this.props;
    return (
      <Box pb={30}>
        <FilterBar />
        <Container>
          {Requests.map((request, idx) => (
            <RequestCard
              key={request.id}
              request={request}
              acceptRequest={this.acceptRequest}
              deleteRequest={this.deleteRequest}
              setUserModal={() => this.setUserModal(idx)}
            />
          ))}
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
  Requests: new Array(30).fill().map(() => ({
    id: faker.random.uuid(),
    jobOfferName: faker.name.jobTitle(),
    companyLogoUrl: faker.image.business(),
    budget: faker.random.number().toLocaleString(),
    jobOfferDescription: faker.lorem.paragraph(),
    studentFirstName: faker.name.firstName(),
    studentLastName: faker.name.lastName(),
    major: Math.random() > 0.5 ? 'ITC' : 'INT',
    semester: Math.round(Math.random() * 9) + 1,
    studentDesc: faker.lorem.paragraph(),
    curriculumPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    capacity: Math.round(Math.random() * 5) + 5,
    numOfHires: Math.round(Math.random() * 5),
    companyAddress: faker.address.streetAddress(),
    scheduleDesc: faker.lorem.paragraph(),
    requirements: new Array(Math.ceil(Math.random() * 4))
      .fill()
      .map(() => faker.name.jobDescriptor()),
    status: Math.random() > 0.5 ? 'ACTIVE' : 'DISABLED',
    studentProfileImg: faker.image.avatar()
  }))
};

RequestsView.propTypes = {
  Requests: PropTypes.arrayOf(PropTypes.object)
};

export default RequestsView;
