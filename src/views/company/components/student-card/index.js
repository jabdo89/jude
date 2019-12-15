import React from 'react';
import PropTypes from 'prop-types';
import { CardBody } from '@common/card';
import Avatar from '@common/avatar';
import Box from '@common/box';
import Typography from '@common/typography';
import { Card, BookIcon, CardTop, Divider } from './elements';

const trimText = text => `${text.slice(0, 200)}...`;

const StudentCard = ({ usuario }) => (
  // <Card onClick={() => setStudent(index)}>
  <Card>
    <CardTop>
      <CardBody>
        <Box alignItems="center" display="flex">
          <BookIcon />
          <Typography ml={10} variant="heading" color="lighter">
            {usuario.major}
          </Typography>
        </Box>
      </CardBody>
    </CardTop>
    <CardBody>
      <Box display="flex">
        <Avatar mr={10} size={60} src={usuario.profileImg} />
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography variant="heading">{`${usuario.firstName} ${usuario.lastName}`}</Typography>
          <Typography variant="muted">{usuario.semester}º semester</Typography>
        </Box>
      </Box>
      <Divider />
      <Typography variant="muted">{trimText(usuario.description)}</Typography>
      {/* <Typography variant="muted">{usuario.description}</Typography> */}
    </CardBody>
  </Card>
);

// StudentCard.propTypes = {
//   index: PropTypes.number.isRequired,
//   firstName: PropTypes.string.isRequired,
//   lastName: PropTypes.string.isRequired,
//   profileImg: PropTypes.string.isRequired,
//   semester: PropTypes.number.isRequired,
//   description: PropTypes.string.isRequired,
//   major: PropTypes.string.isRequired,
//   setStudent: PropTypes.func.isRequired
// };

export default StudentCard;
