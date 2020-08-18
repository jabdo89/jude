import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@common/card';
import Typography from '@common/typography';
import Box from '@common/box';
import Pill from '@common/pill';
import Button from '@common/button';
import { FiCheck, FiX } from 'react-icons/fi';
import Avatar from '@common/avatar';
import { Container, Span, StagePill } from './elements';

function getColor(status) {
  if (status === 'Interviewing') return 'warning';
  if (status === 'requestedByCompany') return 'warning';
  if (status === 'requestedByStudent') return 'success';
  return null;
}

function getMessage(status) {
  if (status === 'Interviewing') return 'Interviewing';
  if (status === 'requestedByCompany') return 'Confirmation Pending';
  if (status === 'requestedByStudent') return 'Requested by You';
  return null;
}

const RequestCard = ({ request, acceptRequest, deleteRequest, company, status }) => (
  <Card scaleOnHover scale={1.011}>
    <Container>
      <Box display="flex" alignItems="center" mr="auto">
        <Avatar mr={15} size={42} src={company.profileImg || '/static/img/general/avatar.png'} />
        <Box>
          <Typography fontWeight="bold">{request.name}</Typography>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Pill color="secondary" variant="soft" size="small" mt={5}>
              ${request.budget} / month
            </Pill>
          </Box>
          <Typography mt={5} pr="10" fontSize="0.85rem">
            Company <Span color="primary">{request.companyName}</Span>
          </Typography>
          <Typography mt={5} pr="10" fontSize="0.85rem">
            Website <Span color="primary">{request.website}</Span>
          </Typography>
          <Typography mt={5} variant="muted">
            {request.description}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        {status === 'requestedByCompany' ? (
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
              <Typography fontSize="10px">Status with company</Typography>
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

RequestCard.propTypes = {
  request: PropTypes.shape({
    id: PropTypes.string,
    stage: PropTypes.string,
    name: PropTypes.string,
    companyLogoUrl: PropTypes.string,
    companyName: PropTypes.string,
    website: PropTypes.string,
    school: PropTypes.string,
    budget: PropTypes.string,
    description: PropTypes.string,
    studentFirstName: PropTypes.string,
    studentLastName: PropTypes.string,
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
  deleteRequest: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired
};

export default RequestCard;
