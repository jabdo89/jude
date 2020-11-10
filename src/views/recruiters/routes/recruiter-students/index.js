import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '@common/box';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import firebase from 'firebase';
import { connect } from 'react-redux';
import Typography from '@common/typography';
import NavbarActionPortal from '@templates/navbar-action-portal';
// import SearchBar from './components/search-bar';
import ConversationCard from './components/conversation-card';
import ChatContent from './components/chat-content';
import { Container, Column, ListContainer } from './elements';

class Messages extends Component {
  state = {
    actualChat: null,
    currentUser: null,
    messages: []
  };

  closeChat = () => {
    this.setState({ actualChat: null });
  };

  getMessages = chat => {
    this.setState(() => ({
      messages: null
    }));
    const messagesRef = firebase
      .database()
      .ref(`/messagesRecruiter/${chat.id}`)
      .limitToLast(100);

    messagesRef.on('value', snapshot => {
      if (snapshot.empty) {
        this.setState(() => ({
          messages: null
        }));
      }
      const messagesObj = snapshot.val();
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
        this.setState(() => ({
          messages
        }));
      }
    });
  };

  setActualChat = (idx, studentID) => {
    this.closeChat();
    const { Students, Conversaciones } = this.props;
    if (idx === -1) {
      this.setState({ actualChat: null });
    } else {
      this.setState({ actualChat: Conversaciones[idx] });
      this.setState({ currentUser: Students[studentID] });
      this.getMessages(Conversaciones[idx]);
    }
  };

  render() {
    const { Students, profile, Conversaciones } = this.props;
    const { actualChat, currentUser, messages } = this.state;
    if (Conversaciones === undefined || Students === undefined) {
      return null;
    }
    return (
      <Container>
        <Column basis="35" pl={20} bg="lighter" hideOnMobileIf={actualChat}>
          <NavbarActionPortal>{/* <SearchBar /> */}</NavbarActionPortal>
          <ListContainer>
            {Conversaciones &&
              Conversaciones.map(({ lastMessage, studentID, recruiterID }, idx) => {
                if (recruiterID !== profile.userID) {
                  return null;
                }
                return (
                  <ConversationCard
                    key={idx.id}
                    openChat={() => this.setActualChat(idx, studentID)}
                    user={Students[studentID]}
                    jobOfferName="Recruiter"
                    lastMessage={lastMessage}
                    seen={true}
                  />
                );
              })}
          </ListContainer>
        </Column>
        <Column basis="65" hideOnMobileIf={!actualChat}>
          {!actualChat ? (
            <Box height="100%" display="flex" alignItems="center" justifyContent="center" p={20}>
              <Typography textAlign="center" variant="leadText">
                Start Chating with your Students
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
}

Messages.defaultProps = {
  profile: undefined,
  Conversaciones: undefined,
  Students: undefined
};

Messages.propTypes = {
  profile: PropTypes.object,
  Conversaciones: PropTypes.arrayOf(PropTypes.object),
  Students: PropTypes.objectOf(PropTypes.object)
};
function mapStateToProps(state) {
  return {
    Conversaciones: state.firestore.ordered.RecruitersyStudents,
    Students: state.firestore.data.Usuarios,
    profile: state.firebase.profile
  };
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    if (props.profile.userID === undefined) return [];

    return [{ collection: 'RecruitersyStudents' }, { collection: 'Usuarios' }];
  })
)(Messages);
