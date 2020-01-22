import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '@common/box';
import faker from 'faker';
import Typography from '@common/typography';
import NavbarActionPortal from '@templates/navbar-action-portal';
import SearchBar from './components/search-bar';
import ConversationCard from './components/conversation-card';
import ChatContent from './components/chat-content';
import { Container, Column, ListContainer } from './elements';

class Messages extends Component {
  state = {
    actualChat: null
  };

  setActualChat = idx => {
    const { Conversations } = this.props;
    this.setState({ actualChat: Conversations[idx] });
  };

  render() {
    const { Conversations } = this.props;
    const { actualChat } = this.state;
    return (
      <Container>
        <Column basis="35" pl={20} bg="lighter" hideOnMobileIf={actualChat}>
          <NavbarActionPortal>
            <SearchBar />
          </NavbarActionPortal>
          <ListContainer>
            {Conversations.map(({ user, messages, seen }, idx) => (
              <ConversationCard
                key={user.id}
                openChat={() => this.setActualChat(idx)}
                user={user}
                lastMessage={messages[0].message}
                seen={seen}
              />
            ))}
          </ListContainer>
        </Column>
        <Column basis="65" hideOnMobileIf={!actualChat}>
          {!actualChat ? (
            <Box height="100%" display="flex" alignItems="center" justifyContent="center" p={20}>
              <Typography textAlign="center" variant="leadText">
                Selecciona una conversación
              </Typography>
            </Box>
          ) : (
            <ChatContent closeChat={() => this.setActualChat(-1)} chat={actualChat} />
          )}
        </Column>
      </Container>
    );
  }
}

Messages.defaultProps = {
  Conversations: new Array(20).fill().map(() => ({
    user: {
      id: faker.random.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      profileImg: faker.image.avatar()
    },
    seen: Math.random() > 0.5,
    messages: new Array(30).fill().map((_, index) => {
      // Messages sent every 2 minutes
      const sentAt = Date.now() + index * 1000 * 60 * 2;
      return {
        id: faker.random.uuid(),
        message: faker.lorem.sentence(),
        sentAt,
        // Messages seen a minute before sent
        seenAt: sentAt + 1000 * 60
      };
    })
  }))
};

Messages.propTypes = {
  Conversations: PropTypes.arrayOf(PropTypes.object)
};

export default Messages;
