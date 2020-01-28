import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@common/card';
import Typography from '@common/typography';
import Box from '@common/box';
import Pill from '@common/pill';
import Avatar from '@common/avatar';
import { Container, Span, StagePill } from './elements';

const getColor = stage => {
  if (stage === 'interviewing') {
    return 'secondary';
  }

  if (stage === 'wating for interview') {
    return 'warning';
  }

  return 'primary';
};

const RequestCard = ({ request }) => (
  <Card scaleOnHover scale={1.011}>
    <Container>
      <Box display="flex" alignItems="center" mr="auto">
        <Avatar mr={15} size={42} src={request.companyLogoUrl} />
        <Box>
          <Typography fontWeight="bold">{request.jobOfferName}</Typography>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Pill color="secondary" variant="soft" size="small" mt={5}>
              ${request.budget} / month
            </Pill>
          </Box>
          <Typography mt={5} pr="10" fontSize="0.85rem">
            Company <Span color="primary">{request.companyName}</Span>
          </Typography>
          <Typography mt={5} variant="muted">
            {request.jobOfferDescription}
          </Typography>
        </Box>
      </Box>
      <Box minWidth={200} display="flex" justifyContent="center">
        <StagePill variant="outlined" color={getColor(request.stage)}>
          {request.stage}
        </StagePill>
      </Box>
    </Container>
  </Card>
);

RequestCard.propTypes = {
  request: PropTypes.shape({
    id: PropTypes.string,
    stage: PropTypes.string,
    jobOfferName: PropTypes.string,
    companyLogoUrl: PropTypes.string,
    companyName: PropTypes.string,
    school: PropTypes.string,
    budget: PropTypes.string,
    jobOfferDescription: PropTypes.string,
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
  }).isRequired
};

export default RequestCard;
