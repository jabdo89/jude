import React from 'react';
import PropTypes from 'prop-types';
import { CardBody } from '@common/card';
import shortId from 'shortid';
import Avatar from '@common/avatar';
import Pill from '@common/pill';
import Box from '@common/box';
import Typography from '@common/typography';
import { Card, BookIcon, CardTop, Divider, DescriptionContainer } from './elements';

const trimText = text => `${text.slice(0, 200)}...`;

const StudentCard = ({ user, setStudent }) => (
  <Card onClick={setStudent} scaleOnHover>
    <CardTop>
      <CardBody>
        <Box alignItems="center" display="flex">
          <BookIcon />
          <Typography ml={10} variant="heading" color="lighter">
            Recruiter
          </Typography>
        </Box>
      </CardBody>
    </CardTop>
    <CardBody>
      <Box display="flex">
        <Avatar mr={10} size={60} src={user.profileImg || '/static/img/general/avatar.png'} />
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography variant="heading">{`${user.firstName} ${user.lastName}`}</Typography>
          <Typography variant="muted">{user.company}</Typography>
          <Typography fontSize="0.875rem" color="secondary">
            {user.school}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <DescriptionContainer>
        <Typography variant="muted">{trimText(user.description)}</Typography>
        <Typography color="primary" mt={20} mb={5} fontWeight="bold">
          Areas
        </Typography>
        <Box flexWrap="wrap" display="flex">
          {user.areas &&
            user.areas.map(skill => (
              <Pill
                key={shortId.generate()}
                mr={5}
                color="secondary"
                variant="outlined"
                size="small"
                mb={5}
              >
                {skill}
              </Pill>
            ))}
        </Box>
      </DescriptionContainer>
    </CardBody>
  </Card>
);

StudentCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
    profileImg: PropTypes.string,
    comapany: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    areas: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  setStudent: PropTypes.func.isRequired
};

export default StudentCard;
