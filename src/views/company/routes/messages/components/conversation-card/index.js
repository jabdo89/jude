import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@common/typography';
import Avatar from '@common/avatar';
import { Container, Divider, Dot, MessageContainer, DataContainer } from './elements';

const ConversationCard = ({ openChat, user, lastMessage, jobOfferName, seen }) => (
  <Fragment>
    <Container onClick={openChat}>
      <Avatar
        borderWidth={!seen ? 3 : 0}
        borderColor={!seen ? 'secondary' : ''}
        mr={10}
        size={50}
        src={user.profileImg || '/static/img/general/avatar.png'}
      />
      <DataContainer>
        <Typography color="lightDark">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography mb={5} color="primary" fontSize="0.65rem">
          {/* Fallback is just for visualization, remove the OR when jobOfferName is set */}
          {jobOfferName.name}
        </Typography>
        <MessageContainer>
          <Typography color="lightGrey" fontSize="0.7rem">
            {lastMessage}
          </Typography>
        </MessageContainer>
        {!seen && <Dot />}
      </DataContainer>
    </Container>
    <Divider />
  </Fragment>
);

ConversationCard.propTypes = {
  openChat: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  lastMessage: PropTypes.string.isRequired,
  jobOfferName: PropTypes.string.isRequired,
  seen: PropTypes.bool.isRequired
};

export default ConversationCard;
