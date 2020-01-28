import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from '@common/modal';
import Button from '@common/button';
import Avatar from '@common/avatar';
import Typography from '@common/typography';
import { Row, Column, ActionsContainer, DownloadIcon, RightIcon } from './elements';
import Chart from './components/chart';
import RequestModal from './components/request-modal/index';

class DetailModal extends Component {
  state = {
    isRequestModalOpen: false
  };

  toggleRequestModal = () =>
    this.setState(({ isRequestModalOpen }) => ({ isRequestModalOpen: !isRequestModalOpen }));

  render() {
    const { user, active, closeButton } = this.props;
    const { isRequestModalOpen } = this.state;
    return (
      <Fragment>
        <Modal size="large" title="Student detail" active={active} closeButton={closeButton}>
          <Row>
            <Column basis="40">
              <Avatar ml="auto" mr="auto" size="120" src={user.profileImg} />
              <Typography mt={20} variant="headingTitle" textAlign="center">
                {`${user.firstName} ${user.lastName}`}
              </Typography>
              <Typography fontSize="13px" color="secondary" textAlign="center">
                {user.semester}º semester
              </Typography>
              <Typography my={20} variant="leadText" color="primary">
                About
              </Typography>
              <Typography fontSize="14px" mb={20}>
                {user.description}
              </Typography>
              <ActionsContainer>
                <a href={user.resume} target="_blank" rel="noopener noreferrer">
                  <Button mr={10} variant="soft" color="primary">
                    View resume
                    <DownloadIcon />
                  </Button>
                </a>
                <Button variant="soft" onClick={this.toggleRequestModal} color="secondary">
                  Request
                  <RightIcon />
                </Button>
              </ActionsContainer>
            </Column>
            <Column basis="60">
              <Chart />
            </Column>
          </Row>
        </Modal>
        <RequestModal active={isRequestModalOpen} toggleRequestModal={this.toggleRequestModal} />
      </Fragment>
    );
  }
}

DetailModal.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    profileImg: PropTypes.string,
    semester: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    resume: PropTypes.string.isRequired
  }).isRequired,
  active: PropTypes.bool.isRequired,
  closeButton: PropTypes.func.isRequired
};

export default DetailModal;
