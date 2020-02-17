import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@common/card';
import Typography from '@common/typography';
import Box from '@common/box';
import { FiCheck, FiX, FiUser } from 'react-icons/fi';
import Button from '@common/button';
import Avatar from '@common/avatar';
import { Container, Span } from './elements';

const RequestCard = ({ user, jobOffer, acceptRequest, deleteRequest, setUserModal }) => (
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
      <Box display="flex" ml="auto">
        <Button onClick={acceptRequest} variant="soft" mr={5} color="success" size="small">
          Accept
          <FiCheck />
        </Button>
        <Button onClick={deleteRequest} variant="soft" mr={5} color="danger" size="small">
          Delete
          <FiX />
        </Button>
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
  setUserModal: PropTypes.func.isRequired
};

export default RequestCard;
