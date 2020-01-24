import React from 'react';
import PropTypes from 'prop-types';
import { CardBody } from '@common/card';
import Avatar from '@common/avatar';
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
            {user.major}
          </Typography>
        </Box>
      </CardBody>
    </CardTop>
    <CardBody>
      <Box display="flex">
        <Avatar mr={10} size={60} src={user.profileImg} />
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography variant="heading">{`${user.firstName} ${user.lastName}`}</Typography>
          <Typography variant="muted">{user.semester}º semester</Typography>
        </Box>
      </Box>
      <Divider />
      <DescriptionContainer>
        <Typography variant="muted">{trimText(user.description)}</Typography>
      </DescriptionContainer>
    </CardBody>
  </Card>
);

StudentCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    profileImg: PropTypes.string,
    semester: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired
  }).isRequired,
  setStudent: PropTypes.func.isRequired
};

export default StudentCard;
