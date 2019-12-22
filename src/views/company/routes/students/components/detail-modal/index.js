import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@common/modal';
import Button from '@common/button';
import Avatar from '@common/avatar';
import Typography from '@common/typography';
import { Row, Column, ActionsContainer, DownloadIcon, ContactIcon } from './elements';

const DetailModal = ({ user, active, closeButton }) => (
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
      </Column>
      <Column basis="60">
        <Typography my={10} variant="leadText" color="primary">
          About
        </Typography>
        <Typography fontSize="14px" mb={50}>
          {user.description}
        </Typography>
        <ActionsContainer>
          <a href={user.resume} download={`${user.firstName}-${user.lastName}-resume.pdf`}>
            <Button target="_blank" mr={10} variant="soft" color="secondary">
              Download resume
              <DownloadIcon />
            </Button>
          </a>
          <Button variant="soft" color="primary">
            Contact
            <ContactIcon />
          </Button>
        </ActionsContainer>
      </Column>
    </Row>
  </Modal>
);

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
