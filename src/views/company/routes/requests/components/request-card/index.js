import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@common/card';
import Typography from '@common/typography';
import Box from '@common/box';
import { FiCheck, FiX, FiUser } from 'react-icons/fi';
import Button from '@common/button';
import Avatar from '@common/avatar';
import { Container, Span, StagePill } from './elements';

function getColor(status) {
  if (status === 'Interviewing') return 'warning';
  if (status === 'requestedByStudent') return 'warning';
  if (status === 'requestedByCompany') return 'success';
  return null;
}

function getMessage(status) {
  if (status === 'Interviewing') return 'Interviewing';
  if (status === 'requestedByStudent') return 'Confirmation Pending';
  if (status === 'requestedByCompany') return 'Requested by You';
  return null;
}

const RequestCard = ({ user, jobOffer, acceptRequest, deleteRequest, setUserModal, status }) => (
  <Card scaleOnHover scale={1.011}>
    <Container>
      <Box display="flex" alignItems="center" mr="auto">
        <Avatar mr={15} size={42} src={user.profileImg || '/static/img/general/avatar.png'} />
        <Box>
          <Box display="flex" alignItems="center">
            <Typography>
              {user.firstName} {user.lastName}
            </Typography>
            <Button ml={10} onClick={setUserModal} variant="soft" color="primary" size="small">
              Detail
              <FiUser />
            </Button>
          </Box>
          <Typography mt={5} variant="muted">
            {user.major} | {user.semester}º semester
          </Typography>
          <Typography mt={5} fontSize="0.85rem">
            Applied for <Span color="primary">{jobOffer.name}</Span>
          </Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        {status === 'requestedByStudent' ? (
          <div>
            <Box ml="auto" display="flex">
              <Button onClick={acceptRequest} variant="soft" mr={5} color="success" size="small">
                Interview
                <FiCheck />
              </Button>
              <Button onClick={deleteRequest} variant="soft" color="danger" size="small">
                Delete
                <FiX />
              </Button>
            </Box>
            <Box display="flex" flexDirection="column" mt={10} alignItems="center">
              <Typography fontSize="10px">Status with student</Typography>
              <StagePill size="small" variant="outlined" color={getColor(status)}>
                {getMessage(status)}
              </StagePill>
            </Box>
          </div>
        ) : (
          <Box display="flex" flexDirection="column" mt={10} alignItems="center">
            <StagePill size="small" variant="outlined" color={getColor(status)}>
              {getMessage(status)}
            </StagePill>
          </Box>
        )}
      </Box>
    </Container>
  </Card>
);
RequestCard.defaultProps = {
  user: undefined,
  jobOffer: undefined
};
RequestCard.propTypes = {
  user: PropTypes.object,
  jobOffer: PropTypes.object,
  acceptRequest: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired,
  setUserModal: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired
};

export default RequestCard;
