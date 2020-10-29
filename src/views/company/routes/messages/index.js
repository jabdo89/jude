import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import Box from '@common/box';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Typography from '@common/typography';
import NavbarActionPortal from '@templates/navbar-action-portal';
import SearchBar from './components/search-bar';
import ConversationCard from './components/conversation-card';
import ChatContent from './components/chat-content';
import { Container, Column, ListContainer } from './elements';

class Messages extends Component {
  state = {
    actualChat: null,
    currentUser: null,
    jobOfferFilter: '',
    messages: []
  };

  getMessages = chat => {
    this.setState(prevState => ({
      messages: null
    }))

    const messagesRef = firebase
      .database()
      .ref(`/messages/${chat.id}`)
      .limitToLast(100);

    messagesRef.on('value', snapshot => {
      if (snapshot.empty) {
        this.setState(prevState => ({
          messages: null
        }));
      }
      let messagesObj = snapshot.val();
      let messages = [];
      if (messagesObj !== null) {
        Object.keys(messagesObj).forEach(key => messages.push(messagesObj[key]));
        messages = messages.map(message => {
          return {
            message: message.message,
            sender: message.sender,
            id: message.id,
            timestamp: message.timestamp
          };
        });
        this.setState(prevState => ({
          messages: messages
        }));
      }
    });
  };

  closeChat = () => {
    this.setState({ actualChat: null });
  };

  setActualChat = (idx, studentID) => {
    this.closeChat();
    const { Conversations } = this.props;
    const { Usuarios } = this.props;
    if (idx === -1) {
      this.setState({ actualChat: null });
    } else {
      this.setState({ actualChat: Conversations[idx] });
      this.setState({ currentUser: Usuarios[studentID] });
      this.getMessages(Conversations[idx]);
    }
  };

  updatejobOfferFilter = filter => {
    this.setState({ jobOfferFilter: filter });
  };

  render() {
    let { Conversations } = this.props;
    const { Usuarios, JobOffers, JobOffersArray, profile } = this.props;
    if (Conversations !== undefined) {
      Conversations = Conversations.sort((a, b) => b.lMessageTime - a.lMessageTime);
    }

    let chatsCounter = 0;
    const { actualChat, currentUser, jobOfferFilter, messages } = this.state;
    if (Conversations !== undefined && Usuarios !== undefined) {
      return (
        <Container>
          <Column basis="35" pl={20} bg="lighter" hideOnMobileIf={actualChat}>
            <NavbarActionPortal>
              <SearchBar
                jobOffers={JobOffersArray}
                updateJobOfferFilter={this.updatejobOfferFilter}
                jobOfferFilter={jobOfferFilter}
              />
            </NavbarActionPortal>
            <ListContainer>
              {Conversations &&
                Conversations.map(
                  ({ studentID, seen, lastMessage, jobOfferID, status, companyID }, idx) => {
                    if (
                      (status === 'Interviewing' || status === 'Hired') &&
                      profile.userID === companyID
                    ) {
                      if (jobOfferFilter === '') {
                        chatsCounter += 1;
                        return (
                          <ConversationCard
                            key={idx.id}
                            openChat={() => this.setActualChat(idx, studentID)}
                            user={Usuarios[studentID]}
                            jobOfferName={JobOffers[jobOfferID]}
                            lastMessage={lastMessage}
                            seen={seen}
                          />
                        );
                      }
                      if (jobOfferFilter === jobOfferID) {
                        chatsCounter += 1;
                        return (
                          <ConversationCard
                            key={idx.id}
                            openChat={() => this.setActualChat(idx, studentID)}
                            user={Usuarios[studentID]}
                            jobOfferName={JobOffers[jobOfferID]}
                            lastMessage={lastMessage}
                            seen={seen}
                          />
                        );
                      }
                      return null;
                    }
                    return null;
                  }
                )}
            </ListContainer>
          </Column>
          <Column basis="65" hideOnMobileIf={!actualChat}>
            {!actualChat ? (
              <Box height="100%" display="flex" alignItems="center" justifyContent="center" p={20}>
                <Typography textAlign="center" variant="leadText">
                  {chatsCounter > 0
                    ? 'Select a conversation'
                    : 'No interviews started, check your request to start interviewing students!'}
                </Typography>
              </Box>
            ) : (
              <ChatContent
                closeChat={() => this.setActualChat(-1)}
                chat={actualChat}
                user={currentUser}
                messages={messages}
              />
            )}
          </Column>
        </Container>
      );
    }
    return null;
  }
}

Messages.defaultProps = {
  Conversations: undefined,
  Usuarios: undefined,
  JobOffers: undefined,
  JobOffersArray: undefined,
  profile: undefined
};

Messages.propTypes = {
  Conversations: PropTypes.arrayOf(PropTypes.object),
  Usuarios: PropTypes.arrayOf(PropTypes.object),
  JobOffers: PropTypes.arrayOf(PropTypes.object),
  JobOffersArray: PropTypes.arrayOf(PropTypes.object),
  profile: PropTypes.object
};
function mapStateToProps(state) {
  return {
    Conversations: state.firestore.ordered.JobOffersyStudents,
    Usuarios: state.firestore.data.Usuarios,
    JobOffers: state.firestore.data.JobOffers,
    JobOffersArray: state.firestore.ordered.JobOffers,
    profile: state.firebase.profile
  };
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: 'JobOffers',
        where: ['company', '==', props.profile.userID]
      },
      { collection: 'Usuarios', where: ['rol', '==', 'Student'] },
      {
        collection: 'JobOffersyStudents'
      }
    ];
  })
)(Messages);
