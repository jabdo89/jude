import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '@common/box';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
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
    currentUser: null
  };

  setActualChat = (idx, companyID) => {
    const { Conversations } = this.props;
    const { Usuarios } = this.props;
    this.setState({ actualChat: Conversations[idx] });
    this.setState({ currentUser: Usuarios[companyID] });
  };

  render() {
    let { Conversations } = this.props;
    const { Usuarios, profile } = this.props;
    if (Conversations !== undefined) {
      Conversations = Conversations.sort((a, b) => b.lMessageTime - a.lMessageTime);
    }
    const { actualChat, currentUser } = this.state;
    if (Conversations !== undefined) {
      return (
        <Container>
          <Column basis="35" pl={20} bg="lighter" hideOnMobileIf={actualChat}>
            <NavbarActionPortal>{/* <SearchBar /> */}</NavbarActionPortal>
            <ListContainer>
              {Conversations &&
                Conversations.map(
                  ({ companyID, studentID, status, seen, lastMessage, jobOfferName }, idx) => {
                    if (status === 'Interviewing' && studentID === profile.userID) {
                      return (
                        <ConversationCard
                          key={idx.id}
                          openChat={() => this.setActualChat(idx, companyID)}
                          user={Usuarios[companyID]}
                          jobOfferName={jobOfferName}
                          lastMessage={lastMessage}
                          seen={seen}
                        />
                      );
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
                  Selecciona una conversación
                </Typography>
              </Box>
            ) : (
              <ChatContent
                closeChat={() => this.setActualChat(-1)}
                chat={actualChat}
                user={currentUser}
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
  profile: undefined
};

Messages.propTypes = {
  Conversations: PropTypes.arrayOf(PropTypes.object),
  Usuarios: PropTypes.arrayOf(PropTypes.object),
  profile: PropTypes.arrayOf(PropTypes.object)
};
function mapStateToProps(state) {
  return {
    Conversations: state.firestore.ordered.JobOffersyStudents,
    Usuarios: state.firestore.data.Usuarios,
    profile: state.firebase.profile
  };
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    if (props.profile.userID === undefined) return [];

    return [
      { collection: 'Usuarios', where: ['rol', '==', 'Company'] },
      {
        collection: 'JobOffersyStudents',
        where: [
          ['status', '==', 'Interviewing'],
          ['studentID', '==', props.profile.userID]
        ]
      }
    ];
  })
)(Messages);
