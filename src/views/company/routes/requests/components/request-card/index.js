import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@common/card';
import Typography from '@common/typography';
import Box from '@common/box';
import { FiCheck, FiX, FiUser } from 'react-icons/fi';
import Button from '@common/button';
import Avatar from '@common/avatar';
import { Container, Span } from './elements';

const RequestCard = ({ request, acceptRequest, deleteRequest }) => (
  <Card scaleOnHover scale={1.011}>
    <Container>
      <Box display="flex" alignItems="center" mr="auto">
        <Avatar mr={15} size={42} src={request.studentProfileImg} />
        <Box>
          <Typography>{request.studentName}</Typography>
          <Typography mt={5} variant="muted">
            {request.major} | {request.semester}º semester
          </Typography>
          <Typography mt={5} fontSize="0.85rem">
            Applied for <Span color="primary">{request.jobOfferName}</Span>
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
        <Button variant="soft" color="primary" size="small">
          Profile
          <FiUser />
        </Button>
      </Box>
    </Container>
  </Card>
);

RequestCard.propTypes = {
  request: PropTypes.shape({
    id: PropTypes.string,
    jobOfferName: PropTypes.string,
    companyLogoUrl: PropTypes.string,
    budget: PropTypes.string,
    jobOfferDescription: PropTypes.string,
    studentName: PropTypes.string,
    major: PropTypes.string,
    semester: PropTypes.number,
    studentDesc: PropTypes.string,
    curriculumPdf: PropTypes.string,
    capacity: PropTypes.number,
    numOfHires: PropTypes.number,
    companyAddress: PropTypes.string,
    scheduleDesc: PropTypes.string,
    requirements: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
    studentProfileImg: PropTypes.string
  }).isRequired,
  acceptRequest: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired
};

export default RequestCard;
